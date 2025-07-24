// Custom React hook to fetch and process news from RSS feeds
import { decode } from 'html-entities';
import { useState, useEffect } from 'react';

function processNewsItems(items) {
  return items.map((item) => {
    const description2 = decode(item.content) || decode(item.description);
    const parser = new DOMParser();
    const doc = parser.parseFromString(description2, 'text/html');
    const image = item.thumbnail || doc.querySelector('img')?.getAttribute('src') || '/image-not-found.png';
        doc.querySelectorAll('img').forEach((img) => img.remove());
        const paragraphs = Array.from(doc.querySelectorAll('p')).map((p) =>
          p.textContent.trim()
      );
      // console.log(description);
      const description = paragraphs.join('\n\n');
    const hostname = new URL(item.link).hostname;
    const parts = hostname.split('.');
    return {
      ...item,
      processedDescription: description,
      image,
      hostname,
      websiteName: parts.length >= 2 ? parts[parts.length - 2] : hostname,
    };
  });
}

export function useFetchNews(rssUrls, intervalMs) {
  const [items, setItems] = useState([]);
  const [processedItems, setProcessedItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const urls = Array.isArray(rssUrls) ? rssUrls : [rssUrls];
  const interval = typeof intervalMs === 'number' ? intervalMs : 0;

  useEffect(() => {
    if (urls.length === 0) {
      setError('No URLs provided');
      setLoading(false);
      return;
    }
    let mounted = true;
    setError(null); // Reset error before fetch

    const fetchAll = () => {
      if (!mounted) return;
      setLoading(true);
      Promise.all(
        urls.map((url) =>
          fetch(`/api?url=${encodeURIComponent(url)}`)
            .then((res) => {
              if (!res.ok) throw new Error(`Status ${res.status} for ${url}`);
              return res.json();
            })
            .then((data) => (Array.isArray(data) ? data : []))
        )
      )
        .then((results) => {
          if (!mounted) return;
          setItems(results.flat());
        })
        .catch((err) => {
          if (mounted) setError(err.message);
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    };

    fetchAll();
    let timer;
    if (interval > 0) timer = setInterval(fetchAll, interval);

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, [JSON.stringify(urls), interval]);

  useEffect(() => {
    setProcessedItems(processNewsItems(items));
  }, [items]);

  return { items: processedItems, error, loading };
}
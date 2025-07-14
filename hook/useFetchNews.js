'use client'
import { decode } from 'html-entities';
import { useState, useEffect } from 'react';

/**
 * useFetchNews
 * @param {string|string[]} rssUrls عنوان أو مجموعة عناوين RSS
 * @param {number} [intervalMs] فترة التحديث بالألف ميللي ثانية (اختياري)
 */
export function useFetchNews(rssUrls, intervalMs) {
  const [items, setItems] = useState([]);
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
          setError(null);
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
    const processedItems = items.map((item, index) => {
      const description2 = decode(item.description);
      const parser = new DOMParser();
      const doc = parser.parseFromString(description2, 'text/html');
      const imgEl = doc.querySelector('img');
      const image = imgEl 
        ? { 
            src: imgEl.getAttribute('src') || '/image-not-found.png', 
            alt: imgEl.getAttribute('alt') || 'No Alt available' 
          } 
        : { 
            src: '/image-not-found.png', 
            alt: 'No Alt available' 
          };
      // console.log(image.src);
      doc.querySelectorAll('img').forEach(img => img.remove());
      const paragraphs = Array.from(doc.querySelectorAll('p'))
        .map(p => p.textContent.trim())
      // .filter(text => text.length > 0);
      const description = paragraphs.join('\n\n');
            
      // console.log(description);
      // get the website name from the link
      const hostname = new URL(item.link).hostname;
      const parts = hostname.split('.');
      // console.log(parts);
      
      return {
        ...item,
        processedDescription: description,
        image: image,
        hostname: hostname,
        websiteName: parts.length >= 2 ? parts[parts.length - 2] : hostname
      };
    });
    
    setItems(processedItems);
  }, [items.length > 0 ? items[0]?.link : null]); // Only run when items change, not on every render
  // console.log(items);

  return { items, error, loading };
}
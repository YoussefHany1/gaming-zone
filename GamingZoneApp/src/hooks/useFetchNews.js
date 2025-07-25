import { useState, useEffect } from 'react';

// Note: You'll need to update this URL to point to your deployed Next.js API
const API_BASE_URL = 'http://localhost:3000'; // Change this to your deployed URL

function processNewsItems(items) {
  return items.map((item) => {
    // Basic HTML entity decoding for mobile
    const description = item.description?.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'") || '';
    
    // Extract image from description or use thumbnail
    let image = item.thumbnail;
    if (!image) {
      const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
      image = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/300x200?text=No+Image';
    }
    
    // Clean description of HTML tags
    const cleanDescription = description.replace(/<[^>]*>/g, '').trim();
    
    // Extract website name from URL
    const hostname = new URL(item.link).hostname;
    const parts = hostname.split('.');
    const websiteName = parts.length >= 2 ? parts[parts.length - 2] : hostname;
    
    return {
      ...item,
      processedDescription: cleanDescription,
      image,
      hostname,
      websiteName,
    };
  });
}

export function useFetchNews(rssUrls, intervalMs = 0) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const urls = Array.isArray(rssUrls) ? rssUrls : [rssUrls];

  useEffect(() => {
    if (urls.length === 0) {
      setError('No URLs provided');
      setLoading(false);
      return;
    }

    let mounted = true;
    setError(null);

    const fetchAll = async () => {
      if (!mounted) return;
      setLoading(true);
      
      try {
        const results = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(`${API_BASE_URL}/api?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
              throw new Error(`Status ${response.status} for ${url}`);
            }
            const data = await response.json();
            return Array.isArray(data) ? data : [];
          })
        );
        
        if (mounted) {
          const allItems = results.flat();
          setItems(processNewsItems(allItems));
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAll();
    
    let timer;
    if (intervalMs > 0) {
      timer = setInterval(fetchAll, intervalMs);
    }

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, [JSON.stringify(urls), intervalMs]);

  return { items, error, loading };
}
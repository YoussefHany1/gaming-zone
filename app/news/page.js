'use client';
import {useFetchNews} from "@/hook/useFetchNews";
// https://www.vg247.com/feed/news
// https://www.gameinformer.com/rss.xml
export default function LatestNews() {

  const { items, error, loading } = useFetchNews(['https://www.vg247.com/feed/news', 'https://www.gameinformer.com/rss.xml']);
  if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(items);
  return (
    <>
            <ul>
      {items.map((item) => (
        <li key={item.link}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
          <br />
          <small>{new Date(item.pubDate).toLocaleString()}</small>
          {/* <p>{item.description}</p> */}
        </li>
      ))}
    </ul>
    </>
  );
}
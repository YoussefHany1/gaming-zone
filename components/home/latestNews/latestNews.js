'use client'
import Image from "next/image";
import {useState} from 'react';
import { decode } from 'html-entities';
import { useFetchNews } from "@/hook/useFetchNews";
import notFound from '@/public/image-not-found.png';

export default function LatestNews() {
    const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };
  
  const { items, error, loading } = useFetchNews(['https://www.gameinformer.com/rss.xml']);
  // console.log(items);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
        <section className="flex flex-col justify-center items-center"> 
              <h2 className="p-5 px-10 bg-(--secondary) w-fit text-center rounded-2xl text-3xl font-bold">Latest News</h2>
        <div className="container py-10 flex flex-col items-center">
      {items.slice(0, visibleCount).map((item, index) => {
        const image = item.image?.src || '/image-not-found.png'
            return (
            <div className={`news-item py-5 border-b-1 border-gray-600 hover:bg-(--secondary) duration-300 rounded-xl px-5 mr-5 ${index}`} key={index}>
              <a href={item.link} target="_blank" className="news-link flex items-center justify-between w-4xl">
                <div className="text">
                  <h3 className="news-title text-2xl font-semibold">{item.title}</h3>
                    <p className="news-description text-gray-400">{ item.processedDescription ? item.processedDescription.substring(0, 90) : 'No description available' }..</p>
                  </div>
                  {/* <div className="w-fit"> */}
                  <Image src={image} width={200} height={200} alt="srftjkg" className="news-image rounded-md w-50" />
                    {/* <div>{parts[1].toLocaleUpperCase()}</div> */}
                    {/* </div> */}
              </a>
            </div>
            )
      })}      
          {visibleCount < items.length && (
        <button onClick={handleLoadMore} className="text-center mt-10 text-2xl font-bold bg-(--secondary) px-5 py-2 cursor-pointer rounded-xl">Load More</button>
      )}
              </div>
      </section>
    </>
  );
}

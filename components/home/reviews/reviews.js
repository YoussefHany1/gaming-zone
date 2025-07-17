'use client';
import { useFetchNews } from "@/hook/useFetchNews";
import Image from "next/image";
import Link from "next/link";
// import styles from "./reviews.module.css";

export default function Reviews() {
  
  const { items, error, loading } = useFetchNews(['https://www.vg247.com/feed/reviews']);
  // console.log(items);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      <section className="flex-col items-center bg-(--primary) p-10 rounded-4xl h-fit hidden xl:flex ml-30">
        <Link href='/reviews' className="p-5 px-10 bg-(--secondary) w-fit text-center rounded-2xl text-3xl font-bold">Reviews</Link>
        <div className={`reviews-container mt-5 w-100`}>
          {items.slice(0, 5).map((item, index) => {
            const image = item.image?.src || '/image-not-found.png'  
            return (
              <div className={`reviews-item container flex pt-5 ${index}`} key={index}>
                <Image src={image} width={200} height={100} className={`reviews-image rounded-tl-2xl rounded-br-2xl flex-none basis-[110px] hover:basis-[150px] object-cover h-23 duration-300`} alt={ item.title } />
                <a href="#" target="_blank" className="reviews-link pl-10">
                  <h2 className="reviews-title text-md font-semibold">{item.title ? item.title.substring(0, 70) : 'not available'}..</h2>
                  <p className="source text-sm text-gray-500">VG247</p>
                </a>
              </div>
            )
          })} 
        </div>
      </section>

    </>
  );
}

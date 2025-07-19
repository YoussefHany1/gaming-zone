'use client';
import Image from "next/image";
import Link from "next/link";
import { useFetchNews } from "@/hook/useFetchNews";

export default function Reviews() {
    const visibleCount = 10;
  const { items, error, loading } = useFetchNews(['https://www.vg247.com/feed/reviews']);
  // console.log(items);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      <section className="flex-col items-center bg-(--primary) p-10 rounded-4xl h-fit hidden xl:flex ml-30">
        <Link href='/latest/reviews' className="p-5 px-10 bg-(--secondary) w-fit text-center rounded-2xl text-3xl font-bold">Reviews</Link>
        <div className={`reviews-container mt-5 w-100 flex flex-col`}>
          {items.slice(0, 5).map((item, index) => {
            return (
              <div className={`reviews-item container flex pt-5 ${index}`} key={index}>
                <Image src={item.image} width={200} height={100} className={`reviews-image rounded-tl-2xl rounded-br-2xl flex-none basis-[110px] hover:basis-[150px] object-cover h-23 duration-300`} alt={ item.title } />
                <Link href="/latest/reviews" target="_blank" className="reviews-link pl-10">
                  <h2 className="reviews-title text-md font-semibold">{item.title ? item.title.substring(0, 70) : 'not available'}..</h2>
                  <p className="source text-sm text-gray-500">VG247</p>
                </Link>
              </div>
            )
          })} 
          {visibleCount < items.length && (
            <Link href='/latest/reviews' className="text-center mt-10 text-2xl font-bold bg-(--secondary) px-10 py-2 cursor-pointer rounded-xl w-fit self-center hover:bg-(--primary) duration-300">See More</Link>
          )}
        </div>
      </section>

    </>
  );
}

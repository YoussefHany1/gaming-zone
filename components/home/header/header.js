'use client'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';
import Image from "next/image";
import { useFetchNews } from "@/hook/useFetchNews";
import '@splidejs/splide/css';
import './header.css';

export default function Header() {
  
  const { items, error, loading } = useFetchNews(['https://www.destructoid.com/feed/']);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(items);
  return (
    <header className="pt-10">
      <Splide options={{ rewind: true, type: 'slide', gap: 50, pagination: false,  breakpoints: {1024: { perPage: 2,},768: {perPage: 1,}},}}>
        {items.slice(0, 10).map((item, index) => {
          return (
            <SplideSlide key={index} className={`${index}`}>
              <Link href="/" className="rounded-md">
                <Image src={item.image} width={700} height={400} className="rounded-md w-full h-auto" alt={`${item.title}`} />
                <h2 className='absolute text-center p-5 pb-7 bottom-0 rounded-md bg-linear-to-t from-black to-transparent h-full w-full flex items-end justify-center font-bold text-xl'>{item.title}</h2>
              </Link>
            </SplideSlide>
          )
        })}
      </Splide>
    </header>
  );
}

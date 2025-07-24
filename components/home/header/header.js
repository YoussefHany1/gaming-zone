"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import Image from "next/image";
import "@splidejs/splide/css";
import "./header.css";

export default function Header({ items }) {
  return (
    <header className="pt-10">
      <Splide
        options={{
          rewind: true,
          type: "slide",
          gap: 50,
          pagination: false,
          breakpoints: { 1024: { perPage: 2 }, 768: { perPage: 1 } },
        }}
      >
        {items.slice(0, 20).map((item, index) => {
          return (
            <SplideSlide
              key={index}
              className={`slide-${index} rounded-md overflow-hidden max-w-[700px] max-h-[400px]`}
            >
              <Link href="/" className="group">
                <h2 className="header-title absolute text-center text-white p-5 pb-7 bottom-0 bg-gradient-to-t from-black to-transparent h-full w-full flex items-end justify-center font-bold text-xl z-10 pointer-events-none">
                  {item.title}
                </h2>
                <Image
                  src={item.image}
                  width={700}
                  height={400}
                  className="header-image object-cover size-full duration-300 md:group-hover:scale-125"
                  alt={item.title}
                />
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </header>
  );
}

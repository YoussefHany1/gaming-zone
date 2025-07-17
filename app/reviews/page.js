'use client'
import Image from "next/image";
import {useState} from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useFetchNews } from "@/hook/useFetchNews";

const websites = [
  { id: 1, name: 'Game Informer', url: 'https://www.gameinformer.com/reviews.xml', image: 'https://pbs.twimg.com/profile_images/1904604082377023488/AKr_ZNdi_400x400.jpg' },
//   { id: 2, name: 'Destructoid', url: 'https://www.destructoid.com/feed/', image: 'https://yt3.googleusercontent.com/ytc/AIdro_kUVzsRJ8L0VYXFXS-d1XMbHc25NLfF-YTWGkQGEW4sG4bB=s900-c-k-c0x00ffffff-no-rj' },
  { id: 3, name: 'VG247', url: 'https://www.vg247.com/feed/reviews', image: 'https://pbs.twimg.com/profile_images/1428030281081135108/lzZ5QRai_400x400.jpg' },
//   { id: 4, name: 'IGN', url: 'https://feeds.feedburner.com/ign/news', image: 'https://pbs.twimg.com/profile_images/1942272360851333120/5odpCMrs_400x400.jpg' },
  { id: 5, name: 'GameSpot', url: 'https://www.gamespot.com/feeds/reviews', image: 'https://pbs.twimg.com/profile_images/1828825064914997248/2rurCf2y_400x400.jpg' },
  { id: 6, name: 'Eurogamer', url: 'https://www.eurogamer.net/feed/reviews', image: 'https://pbs.twimg.com/profile_images/1835625788462280704/zf4FsLft_400x400.png' },
  { id: 7, name: 'Game Rant', url: 'https://gamerant.com/feed/gaming/', image: 'https://pbs.twimg.com/profile_images/1288445622542929923/05FNH9O5_400x400.png' },
//   { id: 8, name: 'Saudi Gamer', url: 'https://www.saudigamer.com/feed/', image: 'https://pbs.twimg.com/profile_images/459163761220149249/wGTgLbCY_400x400.jpeg' },
]

export default function Reviews() {
  const [visibleCount, setVisibleCount] = useState(10);
  
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };
  const [selected, setSelected] = useState(websites[0])
  
  const { items, error, loading } = useFetchNews([selected.url]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // console.log(items);
  return (
    <>
      <section className="flex flex-col justify-center items-center mt-20"> 
        <h2 className="p-5 px-10 bg-(--secondary) w-fit text-center rounded-2xl text-3xl font-bold">Latest Reviews</h2>

<div className="mx-auto w-52 pt-10 pb-20">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
        >
          {selected.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-(--button-width) rounded-xl border border-white/5 bg-(--primary) p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0'
          )}
        >
          {websites.map((site) => (
            <ListboxOption
              key={site.name}
              value={site}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
              <div className="text-sm/6 text-white flex"><Image width={20} height={20} src={site.image} alt={`${site.name}`} className="rounded-full mr-3 h-fit" />{site.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
          
        <div className="container py-10 flex flex-col">
          {items.slice(0, visibleCount).map((item, index) => {
            const image = item.image?.src || '/image-not-found.png'
            return (
              <div className={`news-item ${index} py-5 border-b-1 border-gray-600 hover:bg-(--secondary) duration-300 rounded-xl px-5 mx30`} key={index}>
                <a href={item.link} target="_blank" className="news-link flex items-center justify-between sm:flex-row flex-col-reverse">
                  <div className="text text-center sm:text-left mt-5 sm:mt-0">
                    <h3 className="news-title text-2xl font-semibold mr-0 sm:mr-20">{item.title}</h3>
                    <p className="news-description text-gray-400 mt-3 mr-0 sm:mr-20">{item.processedDescription ? item.processedDescription.substring(0, 150) : 'No description available'}..</p>
                  </div>
                  {/* <div className="w-fit"> */}
                  <Image src={image} width={400} height={400} alt={item.title} className="news-image rounded-md mr-5 w-full sm:w-60" />
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

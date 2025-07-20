'use client'
import Image from "next/image";
import {useState} from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useFetchNews } from "@/hook/useFetchNews";
import { useParams } from 'next/navigation';
import rssUrl from "@/app/rssUrl.json"; // Assuming you have a file that exports the websites array
import LoadingPage from "@/app/loading";

function LatestNews() {
  const params = useParams();
  const category = params.category;
  const websites = rssUrl[category] || []; // Access the websites based on the category from the URL params
  const [visibleCount, setVisibleCount] = useState(10);
  
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };
  const [selected, setSelected] = useState(websites[0])
  
  const { items, error, loading } = useFetchNews([selected.url]);
  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error}</p>;
  console.log(items);
  return (
    <>
      <section className="flex flex-col justify-center items-center mt-20"> 
        <h2 className="text-white p-5 px-10 bg-(--secondary) w-fit text-center rounded-2xl text-3xl font-bold">Latest {category}</h2>

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
              <div className="text-sm/6 text-white flex"><Image width={20} height={20} src={site.image} alt={site.name} className="rounded-full mr-3 h-fit" />{site.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
          
        <div className={`container py-10 flex flex-col`} dir={selected.language === 'ar' ? 'rtl' : 'ltr'}>
          {items.slice(0, visibleCount).map((item, index) => {
            return (
              <div className={`news-item ${index} py-5 border-b-1 border-gray-600 hover:bg-(--secondary) duration-300 rounded-xl px-5 flex items-center`} key={index}>
                <a href={item.link} target="_blank" className={`news-link flex items-center justify-between w-full`}>
                  <div className={`text mt-5 sm:mt-0`}>
                    <h3 className={`news-title text-white text-lg sm:text-2xl font-semibold ${selected.language == 'ar' ? 'mr-0' : 'mr-0 sm:mr-20'}`}>{item.title}</h3>
                    <p className={`news-description text-gray-400 sm:text-md text-sm sm:mt-3 mt-1 ${selected.language == 'ar' ? 'mr-0' : 'mr-0 sm:mr-20'}`}>{item.processedDescription ? item.processedDescription.substring(0, 100) : 'No description available'}..</p>
                  </div>
                  <div className="">
                    <Image src={item.image} width={300} height={300} alt={item.title} className="news-image rounded-md sm:max-w-none min-w-[160px]" objectFit="cover" />
                    {/* <span>VG248</span> */}
                  </div>
                </a>
              </div>
            )
          })}    
          {visibleCount < items.length && (
            <button onClick={handleLoadMore} className="text-center mt-10 text-2xl font-bold bg-(--secondary) px-10 py-2 cursor-pointer rounded-xl w-fit self-center hover:bg-(--primary) duration-300">Load More</button>
          )}
        </div>
      </section>
    </>
  );
}
export default LatestNews;
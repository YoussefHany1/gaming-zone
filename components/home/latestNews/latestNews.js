import Image from "next/image";
import Link from "next/link";

export default function LatestNews({ items }) {
  const visibleCount = 10;
  return (
    <>
      <section className="flex flex-col justify-center items-center"> 
        <Link href='/latest/news' className="p-5 px-10 bg-(--secondary) w-fit text-center rounded-2xl text-3xl font-bold">Latest News</Link>
        <div className="container py-10 flex flex-col">
          {items.slice(0, visibleCount).map((item, index) => {
            return (
              <div className={`news-item ${index} py-5 border-b-1 border-gray-600 hover:bg-(--secondary) duration-300 rounded-xl px-5 mx30`} key={index}>
                <a href={item.link} target="_blank" className="news-link flex items-center justify-between sm:flex-row flex-col-reverse">
                  <div className="text text-center sm:text-left mt-5 sm:mt-0">
                    <h3 className="news-title text-2xl font-semibold mr-0 sm:mr-20">{item.title}</h3>
                    <p className="news-description text-gray-400 mt-3 mr-0 sm:mr-20">{item.processedDescription ? item.processedDescription.substring(0, 150) : 'No description available'}..</p>
                  </div>
                  {/* <div className="w-fit"> */}
                  <Image src={item.image} width={400} height={400} alt={item.title} className="news-image rounded-md w-full sm:w-60" />
                  {/* <div>{parts[1].toLocaleUpperCase()}</div> */}
                  {/* </div> */}
                </a>
              </div>
            )
          })}    
          {visibleCount < items.length && (
            <Link href='/latest/news' className="text-center mt-10 text-2xl font-bold bg-(--secondary) px-10 py-2 cursor-pointer rounded-xl w-fit self-center hover:bg-(--primary) duration-300">See More</Link>
          )}
        </div>
      </section>
    </>
  );
}

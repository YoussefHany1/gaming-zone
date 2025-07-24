import Image from "next/image";
import Link from "next/link";

export default function Reviews({ items }) {
  const visibleCount = 10;

  return (
    <>
      <section className="flex-col items-center bg-(--primary) p-10 rounded-4xl h-fit hidden xl:flex ml-30">
        <Link
          href="/latest/reviews"
          className="p-5 px-10 bg-(--secondary) w-fit text-center rounded-2xl text-3xl font-bold"
        >
          Reviews
        </Link>
        <div className={`reviews-container mt-5 w-100 flex flex-col`}>
          {items.slice(0, 5).map((item, index) => {
            return (
              <div
                className={`review-item ${index} container flex mt-5`}
                key={index}
              >
                <Image
                  src={item.image}
                  width={200}
                  height={100}
                  className={`review-image rounded-tl-2xl rounded-br-2xl flex-none w-30 hover:w-40 object-cover h-23 duration-300`}
                  alt={item.title}
                />
                <Link
                  href="/latest/reviews"
                  target="_blank"
                  className="review-link pl-10"
                >
                  <h2 className="review-title text-md font-semibold">
                    {item.title ? item.title.substring(0, 70) : "Not Available"}
                    ..
                  </h2>
                  <p className="source text-sm text-gray-500">
                    {item.websiteName}
                  </p>
                </Link>
              </div>
            );
          })}
          {visibleCount < items.length && (
            <Link
              href="/latest/reviews"
              className="text-center mt-10 text-2xl font-bold bg-(--secondary) px-10 py-2 cursor-pointer rounded-xl w-fit self-center hover:bg-(--primary) duration-300"
            >
              See More
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

'use client';
import Header from "@/components/home/header/header";
import LatestNews from "@/components/home/latestNews/latestNews";
import Reviews from "@/components/home/reviews/reviews";
import { useFetchNews } from "@/hook/useFetchNews";
import LoadingPage from "@/app/loading";
import ErrorPage from "@/app/not-found";

export default function Home() {
    const {
    items: headerItems,
    loading: headerLoading,
    error: headerError
  } = useFetchNews(['https://www.destructoid.com/feed/']);
  const {
    items: newsItems,
    loading: newsLoading,
    error: newsError
  } = useFetchNews(['https://www.gameinformer.com/rss.xml']);

  const {
    items: reviewsItems,
    loading: reviewsLoading,
    error: reviewsError
  } = useFetchNews(['https://www.vg247.com/feed/reviews']);

  if (newsLoading || reviewsLoading || headerLoading) {
    return <LoadingPage />;
  }
  if (newsError || reviewsError || headerError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Header items={headerItems} />
      <div className="flex justify-between" style={{padding: '5%'}}>
        <LatestNews items={newsItems} />
        <Reviews items={reviewsItems} />
      </div>
    </>
  );
}

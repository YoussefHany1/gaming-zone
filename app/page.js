import Header from "@/components/home/header/header";
import LatestNews from "@/components/home/latestNews/latestNews";
import Reviews from "@/components/home/reviews/reviews";
export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-between" style={{padding: '5%'}}>
        <LatestNews />
        <Reviews />
      </div>
      
    </>
  );
}

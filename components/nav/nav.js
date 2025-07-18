import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className={`w-full flex items-center justify-between py-3 bg-dark-100 bg-(--primary) pl-[5%] pr-[5%]`}>
        <Link href="/" className="left flex items-center">
            <Image src={"/logo.png"} alt="Logo" width={70} height={70} className="rounded-full" />
            <h1 className="text-3xl font-bold ml-4">Gaming Zone</h1>
          </Link>
        <div className="right ml-auto">
            <ul className="flex space-x-5 text-2xl font-medium">
                <li><Link href="/latest/news" className="text-white hover:text-gray-300">News</Link></li>
                <li><Link href="/latest/reviews" className="text-white hover:text-gray-300">Reviews</Link></li>
                <li><Link href="/latest/hardware" className="text-white hover:text-gray-300">Hardware</Link></li>
                <li><Link href="/latest/contact" className="text-white hover:text-gray-300">Contact Us</Link></li>
            </ul>
        </div>
    </nav>
  );
}
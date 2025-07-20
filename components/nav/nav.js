'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className={`w-full flex items-center justify-between py-3 bg-dark-100 bg-(--primary) pl-[5%] pr-[5%]`}>
      <Link href="/" className="left flex items-center">
        <Image src="/logo.png" alt="Logo" width={70} height={70} className="rounded-full" />
        <h1 className="text-3xl font-bold ml-4 text-white">Gaming Zone</h1>
      </Link>
      <div className="right ml-auto">
        <ul className="hidden lg:flex space-x-5 text-2xl font-medium">
          <li><Link href="/latest/news" className="text-white hover:text-(--secondary) duration-300">News</Link></li>
          <li><Link href="/latest/reviews" className="text-white hover:text-(--secondary) duration-300">Reviews</Link></li>
          <li><Link href="/latest/hardware" className="text-white hover:text-(--secondary) duration-300">Hardware</Link></li>
          <li><Link href="/latest/contact" className="text-white hover:text-(--secondary) duration-300">Contact Us</Link></li>
        </ul>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-(--secondary) focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {isOpen && (
          <div className="lg:hidden px-4 pb-4 fixed bg-(--primary) size-full left-0 z-10 text-center">
            <Link href="/" className="block text-2xl text-white font-bold py-5 hover:text-(--secondary) border-b-1 border-gray-600">Home</Link>
            <Link href="/latest/news" className="block text-2xl text-white font-bold py-5 hover:text-(--secondary) border-b-1 border-gray-600">News</Link>
            <Link href="/latest/reviews" className="block text-2xl text-white font-bold py-5 hover:text-(--secondary) border-b-1 border-gray-600">Reviews</Link>
            <Link href="/latest/hardware" className="block text-2xl text-white font-bold py-5 hover:text-(--secondary) border-b-1 border-gray-600">Hardware</Link>
            <Link href="/latest/contact" className="block text-2xl text-white font-bold py-5 hover:text-(--secondary) border-b-1 border-gray-600">Contact Us</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
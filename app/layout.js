// import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/nav/nav";
import Footer from "@/components/footer/footer";
import Script from 'next/script';
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Gaming Zone",
  description: "Get the latest gaming news, reviews, and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="beforeInteractive"></Script>
        </head>
      <body
        className='overflow-x-hidden'
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

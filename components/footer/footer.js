import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Footer() {
  return (
    <footer className="bg-(--primary) flex items-center flex-col">
      <div className="container flex justify-between items-center py-30 px-0 lg:px-30">
        <div className="left flex items-center">
          <Image
            src={logo}
            className="logo"
            width={150}
            height={150}
            alt="Gaming Zone Logo"
          />
          <div className="text ml-5">
            <p className="font-bold text-white text-2xl w-fit lg:w-2xl pr-2 lg:pr-10">
              The perfect place for the latest news, articles,and reviews of
              video games
            </p>
            <ul className="flex items-center mt-5 gap-2">
              <li>
                <a
                  href="https://www.instagram.com/gaming_news.gz/"
                  className="instagram-icon"
                  target="_blank"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/tgyvxauj.json"
                    trigger="morph"
                    state="morph-circle"
                    colors="primary:#fff,secondary:#fff"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/GZ.News1"
                  className="facebook-icon"
                  target="_blank"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/gnqwqcgx.json"
                    trigger="morph"
                    state="morph-circle"
                    colors="primary:#fff,secondary:#0c1a33,tertiary:#0c1a33"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                </a>
              </li>
              <li>
                <a href="" className="youtube-icon" target="_blank">
                  <lord-icon
                    src="https://cdn.lordicon.com/lyjuidpq.json"
                    trigger="morph"
                    state="morph-circle"
                    colors="primary:#fff,secondary:#fff"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@GZ_News"
                  className="x-icon"
                  target="_blank"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/yizwahhw.json"
                    trigger="morph"
                    state="morph-circle"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="right hidden lg:block">
          <ul>
            <li className="mb-3 hover:text-(--secondary) duration-200">
              <Link href="/" className="text-2xl font-bold">
                About Us
              </Link>
            </li>
            <li className="mb-3 hover:text-(--secondary) duration-200">
              <Link href="/" className="text-2xl font-bold">
                FAQ
              </Link>
            </li>
            <li className="mb-3 hover:text-(--secondary) duration-200">
              <Link href="/" className="text-2xl font-bold">
                Contact Us
              </Link>
            </li>
            <li className="mb-3 hover:text-(--secondary) duration-200">
              <Link href="/" className="text-2xl font-bold">
                Privacy Statement
              </Link>
            </li>
            <li className="mb-3 hover:text-(--secondary) duration-200">
              <Link href="/" className="text-2xl font-bold">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-(--secondary) pb-5">
        &copy; 2025 All rights reserved. Reliance Retail Ltd.
      </p>
    </footer>
  );
}

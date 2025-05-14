"use client";

import { UseScrollToTop } from "@/hooks/UseScrollToTop";
import { useLocale } from "next-intl";
import Image from "next/legacy/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  const [hoveredPageId, sethoveredPageId] = useState(0);
  const currentYear = new Date().getFullYear();

  const locale = useLocale();
  const pathname = usePathname();

  const nav = [
    {
      id: 1,
      title: "მთავარი",
      link: `/${locale}`,
    },
    {
      id: 2,
      title: "ჩვენ შესახებ",
      link: `/${locale}/about-us`,
    },
    {
      id: 3,
      title: "პროექტები",
      link: `/${locale}/projects`,
    },
    {
      id: 4,
      title: "სიახლეები",
      link: `/${locale}/news`,
    },
    {
      id: 5,
      title: "გალერეა",
      link: `/${locale}/gallery`,
    },
  ];

  const nav1 = [
    {
      id: 7,
      title: "წესები და პირობები",
    },
    {
      id: 8,
      title: "კონფიდენციალურობა",
    },
  ];

  const socIcons = [
    {
      id: 1,
      icon: <FaFacebookF className="text-[14px] text-white" />,
      link: "https://www.facebook.com/apexd.ge",
    },
    {
      id: 2,
      icon: <RiInstagramFill className="text-[15px] text-white" />,
      link: "https://www.instagram.com/apexd.ge/",
    },
    {
      id: 3,
      icon: <FaLinkedinIn className="text-[14px] text-white" />,
      link: "https://www.linkedin.com/company/apex-development-%E1%83%90%E1%83%9E%E1%83%94%E1%83%A5%E1%83%A1-%E1%83%93%E1%83%94%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%9E%E1%83%9B%E1%83%94%E1%83%9C%E1%83%A2%E1%83%98/",
    },
  ];

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {!pathname.includes(`/${locale}/admin`) && (
        <footer className="w-full bg-blue relative">
          <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:flex items-start justify-between pt-[60px] pb-10 grid grid-cols-2 gap-10">
            <div className="w-[130px] h-[150px] relative col-span-2">
              <Image src={"/images/logo.png"} alt="logo-image" layout="fill" />
            </div>
            <div className="flex flex-col gap-6 w-[1/2] sm:w-auto">
              <h1 className="text-white font-medium text-[14px]">ბმულები</h1>
              <div className="flex flex-col gap-3">
                {nav.map((item) => (
                  <div key={item.id} className="w-fit">
                    <span className="w-fit flex flex-col cursor-pointer">
                      <p
                        className="text-[12px] text-white font-light"
                        onMouseOver={() => sethoveredPageId(item.id)}
                        onMouseLeave={() => sethoveredPageId(0)}
                      >
                        {item.title}
                      </p>
                      <div
                        className={`h-[1px] mt-[2px] bg-white transition-all duration-500`}
                        style={{
                          width: hoveredPageId === item.id ? "100%" : "0%",
                        }}
                      ></div>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 w-[1/2] sm:w-auto">
              <h1 className="text-white font-medium text-[14px]">ინფორმაცია</h1>
              <div className="flex flex-col gap-3">
                {nav1.map((item) => (
                  <div key={item.id} className="w-fit">
                    <span className="w-fit flex flex-col cursor-pointer">
                      <p
                        className="text-[12px] text-white font-light"
                        onMouseOver={() => sethoveredPageId(item.id)}
                        onMouseLeave={() => sethoveredPageId(0)}
                      >
                        {item.title}
                      </p>
                      <div
                        className={`h-[1px] mt-[2px] bg-white transition-all duration-500`}
                        style={{
                          width: hoveredPageId === item.id ? "100%" : "0%",
                        }}
                      ></div>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full sm:w-auto">
              <h1 className="text-white font-medium text-[14px]">
                გამოგვიწერეთ
              </h1>
              <div className="flex items-center gap-3">
                {socIcons.map((item) => (
                  <a
                    key={item.id}
                    className="w-8 h-8 rounded-[50%] flex items-center justify-center hover:border hover:border-white duration-300 cursor-pointer"
                    href={item.link}
                    target="_blank"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full py-4 flex items-center justify-center border-t border-[rgba(97,94,94,1)]">
            <p className="text-grey text-[14px]">
              © {currentYear} Apex Development. All rights reserved.
            </p>
          </div>
          <div
            className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-white absolute right-10 bottom-[100px] cursor-pointer bounce"
            onClick={handleScroll}
          >
            <BsArrowDown className="text-white mt-[20px] text-[26px] rotate-180" />
          </div>
        </footer>
      )}
    </>
  );
}

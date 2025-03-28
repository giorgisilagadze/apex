"use client";

import { SwiperSlide, Swiper } from "swiper/react";
import { useEffect, useRef, useState } from "react";

import { Navigation, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/legacy/image";
import ScreenSize from "@/hooks/ScreenSize";
import { BsArrowDown } from "react-icons/bs";

export default function Projects() {
  const dimension = ScreenSize();

  const projects = [
    {
      id: 1,
      title: "აპექს ნუცუბიძე I, II, III",
      src: "/images/swiper1.jpeg",
    },
    {
      id: 2,
      title: "აპექს დიდი დიღომი",
      src: "/images/swiper2.jpeg",
    },
    {
      id: 3,
      title: "აპექს ნუცუბიძე ბლოკი IV",
      src: "/images/swiper3.jpeg",
    },
    {
      id: 4,
      title: "აპექს დიდი დიღომი",
      src: "/images/swiper3.jpeg",
    },
    {
      id: 5,
      title: "აპექს ნუცუბიძე ბლოკი IV",
      src: "/images/swiper3.jpeg",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[1px] bg-blue"></div>
            <p className="text-[14px] text-blue font-light">პროექტები</p>
          </div>
          <h1 className="sm:text-[30px] text-[24px] font-semibold">
            მიმდინარე პროექტები
          </h1>
        </div>
        <div className="md500:flex items-center gap-7 hidden">
          <div className="prevv flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-black cursor-pointer">
            <BsArrowDown className="mr-[-26px] text-[26px] rotate-90" />
          </div>
          <div className="nextt flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-black cursor-pointer">
            <BsArrowDown className="ml-[-26px] text-[26px] -rotate-90" />
          </div>
        </div>
      </div>
      <div className="w-full lg1350:h-[670px] lg:h-[570px] md500:h-[470px] h-[400px] relative ">
        <Swiper
          loop={true}
          centeredSlides={true} // Centers active slide
          navigation={{
            nextEl: ".nextt",
            prevEl: ".prevv",
          }}
          modules={[FreeMode, Navigation, Pagination]}
          spaceBetween={30} // Negative space to overlap slides
          pagination={{
            clickable: true,
          }}
          className="w-full h-full mySwiper"
          slidesPerView={dimension[0] > 950 ? 2.5 : 1.5}
        >
          {projects.map((item) => (
            <SwiperSlide
              key={item.id}
              className="w-[600px] lg1350:!h-[600px] lg:!h-[500px] md500:!h-[400px] !h-[330px]"
            >
              <div className="w-full h-full relative">
                <Image
                  src={item.src}
                  alt="project-image"
                  layout="fill"
                  objectFit="cover"
                  className="z-[1] rounded-[10px]"
                />
                <div className="w-full h-full rounded-[10px] absolute left-0 top-0 bg-gradient-to-t from-[rgba(3,44,95,0.5)] via-[rgba(255,255,255,0.1)] to-[rgba(0,0,0,0)] z-[2]"></div>
                <div className="absolute left-[50%] translate-x-[-50%] md500:bottom-[80px] bottom-6 z-[3]">
                  <p className="lg1250:text-[32px] md500:text-[26px] text-[20px] text-white font-bold md500:whitespace-nowrap text-center">
                    {item.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

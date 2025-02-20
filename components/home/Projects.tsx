"use client";

import { SwiperSlide, Swiper } from "swiper/react";
import { useEffect, useRef, useState } from "react";

import { Navigation, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function Projects() {
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
      <div className="w-full px-[330px] flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-[50px] h-[1px] bg-blue"></div>
          <p className="text-[14px] text-blue font-light">პროექტები</p>
        </div>
        <h1 className="text-[30px] font-semibold">მიმდინარე პროექტები</h1>
      </div>
      <div className="w-full h-[670px] relative ">
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
          slidesPerView={2.5}
        >
          {projects.map((item) => (
            <SwiperSlide key={item.id} className="w-[600px] !h-[600px]">
              <div className="w-full h-full relative">
                <Image
                  src={item.src}
                  alt="project-image"
                  layout="fill"
                  objectFit="cover"
                  className="z-[1] rounded-[10px]"
                />
                <div className="w-full h-full rounded-[10px] absolute left-0 top-0 bg-gradient-to-t from-[rgba(3,44,95,0.5)] via-[rgba(255,255,255,0.1)] to-[rgba(0,0,0,0)] z-[2]"></div>
                <div className="absolute left-[50%] translate-x-[-50%] bottom-[80px] z-[3]">
                  <p className="text-[32px] text-white font-bold whitespace-nowrap">
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

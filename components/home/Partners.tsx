"use client";

import { SwiperSlide, Swiper } from "swiper/react";

import { Navigation, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/legacy/image";
import ScreenSize from "@/hooks/ScreenSize";

export default function Partners() {
  const dimension = ScreenSize();

  const data = [
    {
      id: 1,
      title: "ბაზის ბანკი",
      img: "/images/basis.png",
    },
    {
      id: 2,
      title: "იშ ბანკი",
      img: "/images/ish.png",
    },
    {
      id: 3,
      title: "ტერა ბანკი",
      img: "/images/tera.png",
    },
    {
      id: 4,
      title: "თიბისი ლიზინგი",
      img: "/images/tbcc.png",
    },
    {
      id: 5,
      title: "ბაზის ბანკი",
      img: "/images/basis.png",
    },
    {
      id: 6,
      title: "იშ ბანკი",
      img: "/images/ish.png",
    },
  ];

  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex flex-col gap-6">
      <h1 className="sm:text-[30px] text-[24px] font-semibold">
        {"პარტნიორები"}
      </h1>
      <div className="w-full h-[230px] relative">
        <Swiper
          loop={true}
          // centeredSlides={true} // Centers active slide
          navigation={{
            nextEl: ".nextt",
            prevEl: ".prevv",
          }}
          modules={[FreeMode, Navigation, Pagination]}
          spaceBetween={dimension[0] > 768 ? 20 : 10} // Negative space to overlap slides
          pagination={{
            clickable: true,
          }}
          className="w-full h-full mySwiper"
          slidesPerView={
            dimension[0] > 1440
              ? 6
              : dimension[0] > 1024
              ? 4
              : dimension[0] > 400
              ? 3
              : 2
          }
        >
          {data.map((item) => (
            <SwiperSlide
              key={item.id}
              className="sm:w-[200px] w-[150px] !h-[150px] flex items-center justify-center border border-[#eee] sm:py-8 py-10 sm:px-4 px-4 rounded-[10px]"
            >
              <div
                className={`${
                  item.id == 4 ? "w-full" : "sm:w-[85%] w-full"
                } sm:h-[90%] h-full m-auto relative`}
              >
                <Image layout="fill" src={item.img} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

"use client";

import { SwiperSlide, Swiper } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdOutlinePlayCircle } from "react-icons/md";

import { Navigation, FreeMode, Thumbs } from "swiper/modules";

import "swiper/css";
import { useTranslations } from "next-intl";
import ScreenSize from "@/hooks/ScreenSize";
import Image from "next/legacy/image";

// interface Props {
//   images: { id: number; product_id: number; url: string }[];
// }

export default function GallerySwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [slidesPerView, setSlidesPerView] = useState(4);

  const width = ScreenSize();

  let swiperRef = useRef<any>(null);

  useEffect(() => {
    if (width[0] >= 1024) setSlidesPerView(4);
    else if (width[0] >= 600) setSlidesPerView(3);
    else setSlidesPerView(2);
  }, [width[0]]);

  const images = [
    "/images/apart1.jpeg",
    "/images/apart2.jpeg",
    "/images/apart3.jpeg",
    "/images/apart4.jpeg",
  ];

  return (
    <>
      <div className="w-full flex flex-col gap-[60px]">
        <div className="w-full sm:h-[570px] md600:h-[450px] h-[320px] relative ">
          <Swiper
            loop={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-full rounded-[12px]"
          >
            {images.map((item: string) => (
              <SwiperSlide key={item} className="w-full h-full relative">
                <Image
                  src={item}
                  alt="gallery"
                  layout="fill"
                  objectFit="cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="left-[50%] translate-x-[-50%] absolute flex items-center bottom-[-40px] z-[1]">
            <button className="prev w-[80px] h-[80px] bg-blue flex items-center justify-center text-white">
              <BsChevronLeft className="text-[24px]" />
            </button>
            <button className="next w-[80px] h-[80px] bg-[rgba(250,250,250,1)] flex items-center justify-center text-blue">
              <BsChevronRight className="text-[24px]" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full mx-0">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            direction={"horizontal"}
            spaceBetween={12}
            slidesPerView={slidesPerView}
            freeMode={true}
            navigation={{
              nextEl: ".next1",
              prevEl: ".prev1",
            }}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper w-full grid grid-cols-4 gap-5"
          >
            {images.map((item: string) => (
              <SwiperSlide
                key={item}
                className="w-full md600:!h-[250px] !h-[200px] relative cursor-pointer"
              >
                <Image
                  src={item}
                  alt="gallery"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px]"
                />
                <div className="bg-[rgba(255,255,255,0.4)] w-full h-full absolute top-0 left-0 z-[1]"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

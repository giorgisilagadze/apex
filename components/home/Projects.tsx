"use client";

import { SwiperSlide, Swiper } from "swiper/react";
import { useEffect, useRef, useState } from "react";

import { Navigation, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/legacy/image";
import ScreenSize from "@/hooks/ScreenSize";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { IoIosArrowBack } from "react-icons/io";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

interface Props {
  projects: Building[];
}

export default function Projects({ projects }: Props) {
  const dimension = ScreenSize();

  const locale = useLocale();
  const route = useRouter();
  const t = useTranslations("HomePage.CurrentProjects");

  const [hoveredId, setHoveredId] = useState<number>();

  return (
    <div className="w-full flex flex-col gap-8 bg-blue py-[80px]">
      <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[1px] bg-white"></div>
            <p className="text-[14px] text-white font-light">{t("projects")}</p>
          </div>
          <h1 className="sm:text-[30px] text-[24px] font-semibold text-white">
            {t("current")}
          </h1>
        </div>
        <div className="md500:flex items-center gap-3 hidden">
          <div className="prevv flex items-center justify-center w-[60px] h-[60px] rounded-[10px] border border-white cursor-pointer">
            <IoIosArrowBack className="text-[26px] text-white" />
          </div>
          <div className="nextt flex items-center justify-center w-[60px] h-[60px] rounded-[10px] border border-white cursor-pointer">
            <IoIosArrowBack className="text-[26px] rotate-180 text-white" />
          </div>
        </div>
      </div>
      <div className="w-full lg1350:h-[500px] sm:h-[450px] h-[340px] relative lg:px-[80px] sm:px-[60px] px-6">
        <Swiper
          loop={true}
          // centeredSlides={true} // Centers active slide
          navigation={{
            nextEl: ".nextt",
            prevEl: ".prevv",
          }}
          modules={[FreeMode, Navigation]}
          spaceBetween={30} // Negative space to overlap slides
          pagination={{
            clickable: true,
          }}
          className="w-full h-full mySwiper"
          slidesPerView={
            dimension[0] > 1600
              ? 4
              : dimension[0] > 1024
              ? 3
              : dimension[0] > 600
              ? 2
              : 1
          }
        >
          {projects.map((item, index: number) => (
            <SwiperSlide
              key={item.id}
              className="w-[428px] lg1350:!h-[450px] sm:!h-[400px] !h-[330px]"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(undefined)}
            >
              {/* <div
                className="w-full h-full relative cursor-pointer"
                onClick={() => route.push(`/${locale}/projects/${item.id}`)}
              > */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} // 20% of element must be visible
                transition={{
                  delay: index * 0.1, // 100ms stagger
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="w-full h-full relative cursor-pointer"
                onClick={() => route.push(`/${locale}/projects/${item.id}`)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
                  alt="project-image"
                  layout="fill"
                  objectFit="cover"
                  className="z-[1] rounded-[10px]"
                />
                <div
                  className={`w-full h-full rounded-[10px] absolute left-0 top-0 bg-gradient-to-t via-[rgba(255,255,255,0.1)] to-[rgba(0,0,0,0)] z-[2] duration-700
           
                  `}
                  style={{
                    backgroundImage:
                      hoveredId == item.id
                        ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)"
                        : "linear-gradient(to top, rgba(3,44,95,0.5) 0%, rgba(0,0,0,0) 40%)",
                  }}
                ></div>
                <div
                  className={`absolute left-5 z-[3] flex flex-col gap-3 ${
                    hoveredId == item.id
                      ? "opacity-100 md600:bottom-[35px] bottom-6"
                      : "opacity-0 md600:bottom-[10px] bottom-2"
                  } duration-500`}
                >
                  <p className="lg1250:text-[28px] md600:text-[22px] text-[18px] text-white font-bold md500:whitespace-nowrap">
                    {locale == "en"
                      ? item.title_en
                      : locale == "ge"
                      ? item.title
                      : item.title_ru}
                  </p>
                  {/* <p className="text-[12px] text-[rgba(219,219,219,1)]">
                    {locale == "en"
                      ? item.text_en
                      : locale == "ge"
                      ? item.text
                      : item.text_ru}
                  </p> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        locale == "en"
                          ? item.text_en
                          : locale == "ge"
                          ? item.text
                          : item.text_ru,
                    }}
                    className="editor text-[12px] text-white max-h-[110px] overflow-hidden text-ellipsis"
                  />
                  <div className="flex items-center gap-2">
                    <p className="text-[16px] text-white">პროექტის ნახვა</p>
                    <IoArrowForwardCircleOutline className="text-[24px] text-white" />
                  </div>
                </div>
                <div
                  className={`absolute left-5 z-[3] flex flex-col gap-3 md600:bottom-[35px] bottom-6 ${
                    hoveredId != item.id ? "opacity-100" : "opacity-0"
                  } duration-500`}
                >
                  <p className="lg1250:text-[28px] md600:text-[22px] text-[18px] text-white font-bold md500:whitespace-nowrap text-center">
                    {locale == "en"
                      ? item.title_en
                      : locale == "ge"
                      ? item.title
                      : item.title_ru}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-[30px] h-[2px] bg-white"></div>
                    <p className="sm:text-[14px] text-[12px] text-white font-light">
                      {t(item.status)}
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* </div> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="w-[250px] h-[54px] rounded-[16px] bg-[rgba(47,159,42,1)] flex items-center justify-center gap-2 mx-auto"
        onClick={() => route.push(`/${locale}/projects`)}
      >
        <p className="text-[14px] text-white">ყველა პროექტის ნახვა</p>
        <IoArrowForwardCircleOutline className="text-[20px] text-white" />
      </button>
    </div>
  );
}

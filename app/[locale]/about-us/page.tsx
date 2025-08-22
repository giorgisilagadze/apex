"use client";

import Button from "@/components/button/Button";
import AboutUsComp from "@/components/home/AboutUsComp";
import Image from "next/legacy/image";

import { SwiperSlide, Swiper } from "swiper/react";

import { Navigation, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import EmployeeCard from "@/components/card/EmployeeCard";
import { BsArrowDown } from "react-icons/bs";
import SendEmail from "@/components/SendEmail";
import ScreenSize from "@/hooks/ScreenSize";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Contact from "@/components/home/Contact";
import { motion } from "framer-motion";
import React from "react";
import { PiBuildingOfficeFill } from "react-icons/pi";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function AboutUs() {
  const dimension = ScreenSize();

  const [hoveredYear, setHoveredYear] = useState<string>();
  const { ref, inView } = useInView({ triggerOnce: true });

  const t = useTranslations("AboutUs");
  const t1 = useTranslations("HomePage.About");

  const employees = [
    {
      id: 1,
      name: t("employee1"),
      position: t("გაყიდვების მენეჯერი"),
      image: "/images/employees/1.jpg",
    },
    {
      id: 2,
      name: t("employee2"),
      position: t("ბუღალტერი"),
      image: "/images/employees/2.jpg",
    },
    {
      id: 3,
      name: t("employee3"),
      position: t("გაყიდვების ხელმძღვანელი"),
      image: "/images/employees/3.jpg",
    },
    {
      id: 4,
      name: t("employee4"),
      position: t("ბუღალტერი"),
      image: "/images/employees/4.jpg",
    },
    {
      id: 5,
      name: t("employee5"),
      position: t("მარკეტინგის ხელმძღვანელი"),
      image: "/images/employees/5.jpg",
    },
    {
      id: 6,
      name: t("employee6"),
      position: t("ბუღალტერი"),
      image: "/images/employees/6.jpg",
    },
    {
      id: 7,
      name: t("employee7"),
      position: t("გაყიდვების მენეჯერი"),
      image: "/images/employees/7.jpg",
    },
    {
      id: 8,
      name: t("employee8"),
      position: t("ოპერაციების დირექტორი"),
      image: "/images/employees/8.jpg",
    },
    {
      id: 9,
      name: t("employee9"),
      position: t("იურიდიული დეპარტამენტის ხელმძღვანელი"),
      image: "/images/employees/9.jpg",
    },
  ];

  const tree = [
    {
      id: 1,
      year: "2015",
      projects: [t("დადიანის 22")],
    },
    {
      id: 2,
      year: "2016",
      projects: [t("მეცკევიჩის 56"), t("მეტრეველის 4"), t("მეტრეველის 6")],
    },
    {
      id: 3,
      year: "2018",
      projects: [t("დადიანის 125"), t("ცაგარელის 70")],
    },
    {
      id: 4,
      year: "2019",
      projects: [t("დადიანის 111"), t("ბერბუკის 1")],
    },
    {
      id: 5,
      year: "2021",
      projects: [t("დადიანის 90")],
    },
    {
      id: 6,
      year: "2022",
      projects: [t("აპექს ავლაბარი")],
    },
    {
      id: 7,
      year: "2023",
      projects: [t("აპექს ლისი")],
    },
  ];

  return (
    <div className="w-full ">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/aboutus1.jpg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            {t("title")}
          </h1>
          <p className="text-[14px] text-white sm:self-center">{t("page")}</p>
        </div>
      </div>
      <div className="w-full">
        <AboutUsComp />
        <div className="w-full  xl1600:pl-[140px] lg1250:pl-[100px] sm:pl-[64px] pl-6 pr-6 sm:pr-[64px] lg:pr-[100px] lg1110:pr-0 sm:py-[60px] py-10 grid lg1110:grid-cols-4 bg-white">
          <div className="w-full flex flex-col gap-2 lg1110:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-[50px] h-[1px] bg-blue"></div>
              <p className="text-[14px] text-blue font-light">
                {t("companyMission")}
              </p>
            </div>
            <h1 className="sm:text-[30px] text-[24px] font-semibold">
              {t1("historyOfSuccess")}
            </h1>
            <div className="w-full flex flex-col gap-[2px]">
              <div className="w-full">
                <p className="text-[12px] leading-5 text-grey font-light lg1350:w-[480px] w-full mt-2">
                  {t1("text")}
                </p>
                <p className="text-[12px] leading-5 text-grey font-light lg1350:w-[480px] w-full mt-2">
                  {t1("text1")}
                </p>
              </div>
              <div className="w-full">
                <p className="text-[12px] leading-5 text-grey font-light lg1350:w-[480px] w-full mt-2">
                  {t1("text2")}
                </p>
                <p className="text-[12px] leading-5 text-grey font-light lg1350:w-[480px] w-full mt-2">
                  {t1("text3")}
                </p>
              </div>
            </div>
            <div
              className="w-full flex md600:flex-row flex-col items-center gap-5 mt-8"
              ref={ref}
            >
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full px-5  pt-5 pb-5 flex flex-col md600:gap-5 gap-3 bg-white rounded-[20px] justify-between border border-[#eee]"
              >
                <div className="w-full flex flex-col gap-2">
                  <PiBuildingOfficeFill className="text-[40px] text-blue" />
                  <h1 className="xl:text-[20px] text-[16px] font-semibold text-blue">
                    {t1("historyOfSuccess")}
                  </h1>
                  <p className="text-[11px] text-[rgba(97,94,94,1)]">
                    {t1("text")}
                  </p>
                </div>
                <div className="w-full flex flex-col">
                  <h1 className="sm:text-[40px] text-[32px] font-semibold text-blue">
                    <CountUp start={0} end={inView ? 20 : 0} duration={2} />+
                  </h1>
                  <p className="text-[12px]">{t1("done")}</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + 0.1 }}
                viewport={{ once: true }}
                className="w-full md600:h-full h-[300px] relative overflow-hidden"
              >
                <Image
                  src={"/images/about1.jpg"}
                  alt="about"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px] z-[1]"
                />
              </motion.div>
            </div>
          </div>
          <div className="w-full sm:h-[900px] md500:h-[700px] h-[600px] relative lg1110:col-span-2">
            <Image
              src={"/images/tree.png"}
              alt="about"
              layout="fill"
              className="opacity-70"
            />
            <div className="absolute sm:top-[130px] top-[50px] left-[50%] translate-x-[-50%] z-[1] flex flex-col gap-2">
              {tree.map((item, index) => (
                <div
                  className="flex flex-col items-center gap-1 relative cursor-pointer"
                  onMouseEnter={() => setHoveredYear(item.year)}
                  onMouseLeave={() => setHoveredYear(undefined)}
                  key={item.id}
                >
                  <div className="w-[1px] sm:h-[50px] h-[30px] bg-blue"></div>
                  <h1 className="text-blue text-[18px]">{item.year}</h1>
                  <div
                    className={`absolute sm:w-[150px] w-[120px] top-0  ${
                      (index + 1) % 2 == 0 ? "left-[200%]" : "right-[200%]"
                    } ${
                      hoveredYear == item.year
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    } duration-300`}
                  >
                    <h1
                      className={`sm:text-[32px] text-[24px] text-[rgba(47,159,42,1)]  border-b-[2px] border-blue w-full mb-3 ${
                        (index + 1) % 2 != 0 && "text-end"
                      }`}
                    >
                      {item.year}
                    </h1>
                    {item.projects.map((item) => (
                      <div className="flex items-center gap-3" key={item}>
                        <div className="w-1 h-1 rounded-[50%] bg-blue"></div>
                        <h1 className="sm:text-[15px] text-[13px] text-blue">
                          {item}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="w-full grid sm:grid-cols-2 lg1110:gap-[100px] sm:gap-10 items-center">
          <div className="w-full lg:h-[600px] sm:h-full h-[400px] relative">
            <Image
              src={"/images/mission.jpeg"}
              alt="project-image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-full flex flex-col gap-2 sm:pr-6 lg1110:py-0 py-10 px-6">
            <div className="flex items-center gap-3">
              <div className="w-[50px] h-[1px] bg-blue"></div>
              <p className="text-[14px] text-blue font-light">
                {t("ourMission")}
              </p>
            </div>
            <h1 className="sm:text-[30px] text-[24px] font-semibold">
              {t("companyMission")}
            </h1>
            <p className="text-[14px] leading-6 text-grey font-light lg1110:w-[480px] w-full mt-2">
              {t1("text")}
            </p>
            <div className="mt-4">
              <Button
                title={t("title")}
                height="h-[54px]"
                bgColor="bg-blue"
                color="text-white"
                onClick={() => {}}
                width={"w-[200px]"}
              />
            </div>
          </div>
        </div> */}
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[60px] py-10 bg-blue flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-3 items-center">
            <div className="w-[50px] h-[1px] bg-blue"></div>
            {/* <p className="text-[14px] text-white font-light">
              {t("employees")}
            </p> */}
            <h1 className="sm:text-[30px] text-[24px] font-bold mt-[-6px] text-white">
              {t("team")}
            </h1>
          </div>
          <div className="w-full xl1680:h-[470px] xl:h-[420px] lg:h-[470px] h-[420px] relative flex items-center md600:gap-10 gap-6">
            <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-white cursor-pointer hover:opacity-50 hover:text-blue duration-300 prevv select-none">
              <BsArrowDown className="mr-[-20px] text-[26px] rotate-90 text-white" />
            </div>
            <Swiper
              loop={true}
              //   centeredSlides={true} // Centers active slide
              navigation={{
                nextEl: ".nextt",
                prevEl: ".prevv",
              }}
              modules={[FreeMode, Navigation, Pagination]}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              className="md600:w-[calc(100%-144px)] w-[calc(100%-96px)] h-full mySwiper rounded-[10px]"
              slidesPerView={
                dimension[0] > 1440
                  ? 4
                  : dimension[0] > 900
                  ? 3
                  : dimension[0] > 600
                  ? 2
                  : 1
              }
            >
              {employees.map((item) => (
                <SwiperSlide key={item.id} className="w-full !h-[400px]">
                  <EmployeeCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-white cursor-pointer hover:opacity-50 duration-300 nextt select-none">
              <BsArrowDown className=" ml-[-20px] text-[26px] -rotate-90 text-white" />
            </div>
          </div>
        </div>
        {/* <SendEmail /> */}
      </div>
      <Contact />
    </div>
  );
}

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

export default function AboutUs() {
  const dimension = ScreenSize();

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

  return (
    <div className="w-full ">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/aboutus.jpeg"}
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
      <div className="w-full sm:mt-[100px] mt-10">
        <AboutUsComp />
        <div className="w-full grid sm:grid-cols-2 lg1110:gap-[100px] sm:gap-10 items-center">
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
        </div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[60px] py-10 bg-[rgba(250,250,250,1)] flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-3 items-center">
            <div className="w-[50px] h-[1px] bg-blue"></div>
            <p className="text-[14px] text-blue font-light">{t("employees")}</p>
            <h1 className="sm:text-[30px] text-[24px] font-bold mt-[-6px]">
              {t("team")}
            </h1>
          </div>
          <div className="w-full xl1680:h-[470px] xl:h-[420px] lg:h-[470px] h-[420px] relative flex items-center md600:gap-10 gap-6">
            <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-black cursor-pointer hover:border-blue hover:text-blue duration-300 prevv select-none">
              <BsArrowDown className="mr-[-20px] text-[26px] rotate-90" />
            </div>
            <Swiper
              loop={true}
              //   centeredSlides={true} // Centers active slide
              navigation={{
                nextEl: ".nextt",
                prevEl: ".prevv",
              }}
              modules={[FreeMode, Navigation, Pagination]}
              spaceBetween={30}
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
            <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-black cursor-pointer hover:border-blue hover:text-blue duration-300 nextt select-none">
              <BsArrowDown className=" ml-[-20px] text-[26px] -rotate-90" />
            </div>
          </div>
        </div>
        <SendEmail />
      </div>
    </div>
  );
}

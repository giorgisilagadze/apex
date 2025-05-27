"use client";

import Image from "next/legacy/image";
import Button from "../button/Button";
import ScreenSize from "@/hooks/ScreenSize";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

import { PiBuildingOfficeFill } from "react-icons/pi";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AboutUsComp() {
  const t = useTranslations("HomePage.About");

  const dimension = ScreenSize();

  const { ref, inView } = useInView({ triggerOnce: true });

  const [hoveredImage, setHoveredImage] = useState<number>();

  const data = [
    {
      id: 1,
      title: t("customer"),
      count: "5532",
    },
    {
      id: 2,
      title: t("year"),
      count: "15",
    },
    {
      id: 3,
      title: t("done"),
      count: "25",
    },
    {
      id: 4,
      title: t("current"),
      count: "6",
    },
  ];

  const aboutData = [
    {
      id: 1,
      icon: <PiBuildingOfficeFill className="text-[40px] text-blue" />,
      title: "წარმატების ისტორია",
      description:
        "სამშენებლო კომპანია აპექს დეველოპმენტი ბაზარზე 2012 წლიდან ფუნქციონირებს. კომპანია სთავაზობს მომხმარებელს მაღალი ხარისხის პროდუქტსა და მომსახურებას და ქმნის თითოეული ინდივიდისთვის სასურველს კომფორტს.",
      count: 20,
      labelKey: "done",
      image: "/images/about1.jpg",
    },
    {
      id: 2,
      icon: <PiBuildingOfficeFill className="text-[40px] text-blue" />,
      title: "წარმატების ისტორია",
      description:
        "სამშენებლო კომპანია აპექს დეველოპმენტი ბაზარზე 2012 წლიდან ფუნქციონირებს. კომპანია სთავაზობს მომხმარებელს მაღალი ხარისხის პროდუქტსა და მომსახურებას და ქმნის თითოეული ინდივიდისთვის სასურველს კომფორტს.",
      count: 6,
      labelKey: "current",
      image: "/images/about2.jpg",
    },
    {
      id: 3,
      icon: <PiBuildingOfficeFill className="text-[40px] text-blue" />,
      title: "წარმატების ისტორია",
      description:
        "სამშენებლო კომპანია აპექს დეველოპმენტი ბაზარზე 2012 წლიდან ფუნქციონირებს. კომპანია სთავაზობს მომხმარებელს მაღალი ხარისხის პროდუქტსა და მომსახურებას და ქმნის თითოეული ინდივიდისთვის სასურველს კომფორტს.",
      count: 5532,
      labelKey: "customer",
      image: "/images/about3.jpg",
    },
  ];

  const aboutData1 = [
    {
      id: 4,
      image: "/images/about1.jpg",
    },
    {
      id: 5,
      image: "/images/about2.jpg",
    },
    {
      id: 6,
      image: "/images/about3.jpg",
    },
    {
      id: 7,
      image: "/images/about4.jpg",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[80px]">
      <div className="w-full grid lg:grid-cols-2 items-center gap-8 xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-full relative"
        >
          <div className="w-full grid grid-cols-2 aspect-square gap-4">
            {aboutData1.map((item) =>
              item.id == 5 ? (
                <div
                  className="w-full h-full sm:mt-10 sm:pr-10"
                  key={item.id}
                  onMouseEnter={() => setHoveredImage(item.id)}
                  onMouseLeave={() => setHoveredImage(undefined)}
                >
                  <div className="w-full aspect-square relative">
                    <Image
                      src={item.image}
                      alt="about"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[10px]"
                    />
                    <motion.div
                      animate={{ opacity: hoveredImage === item.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0 w-full h-full backdrop-grayscale backdrop-brightness-75 bg-white/10 transition duration-500 z-[2] rounded-[10px]"
                    />
                    {hoveredImage === item.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-1/2 left-0 w-full h-full z-[3] pointer-events-none"
                      >
                        <motion.div
                          initial={{ scaleY: 0, opacity: 1 }}
                          animate={{ scaleY: 1, opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                          }}
                          style={{ originY: 0.5 }}
                          className="absolute bottom-1/2 left-0 w-full h-full bg-gradient-to-t from-white/30 to-transparent"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : item.id == 7 ? (
                <div
                  className="w-full h-full sm:mb-10 sm:pr-10"
                  key={item.id}
                  onMouseEnter={() => setHoveredImage(item.id)}
                  onMouseLeave={() => setHoveredImage(undefined)}
                >
                  <div className="w-full aspect-square relative">
                    <Image
                      src={item.image}
                      alt="about"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[10px]"
                    />
                    <motion.div
                      animate={{ opacity: hoveredImage === item.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0 w-full h-full backdrop-grayscale backdrop-brightness-75 bg-white/10 transition duration-500 z-[2] rounded-[10px]"
                    />
                    {hoveredImage === item.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-1/2 left-0 w-full h-full z-[3] pointer-events-none"
                      >
                        <motion.div
                          initial={{ scaleY: 0, opacity: 1 }}
                          animate={{ scaleY: 1, opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                          }}
                          style={{ originY: 0.5 }}
                          className="absolute bottom-1/2 left-0 w-full h-full bg-gradient-to-t from-white/30 to-transparent"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="w-full aspect-square relative rounded-[10px]"
                  key={item.id}
                  onMouseEnter={() => setHoveredImage(item.id)}
                  onMouseLeave={() => setHoveredImage(undefined)}
                >
                  <Image
                    src={item.image}
                    alt="about"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[10px] "
                  />
                  <motion.div
                    animate={{ opacity: hoveredImage === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 w-full h-full backdrop-grayscale backdrop-brightness-75 bg-white/10 transition duration-500 z-[2] rounded-[10px]"
                  />
                  {hoveredImage === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 left-0 w-full h-full z-[3] pointer-events-none"
                    >
                      <motion.div
                        initial={{ scaleY: 0, opacity: 1 }}
                        animate={{ scaleY: 1, opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                        style={{ originY: 0.5 }}
                        className="absolute bottom-1/2 left-0 w-full h-full bg-gradient-to-t from-white/30 to-transparent"
                      />
                    </motion.div>
                  )}
                </div>
              )
            )}
          </div>
          <div className="w-[120px] h-[120px] z-[3] bg-white rounded-[50%] flex items-center justify-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
            <div className="w-[100px] aspect-square relative">
              <Image
                src={"/images/logo1.png"}
                alt="about"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[1px] bg-blue"></div>
            <p className="text-[14px] text-blue font-light">{t("aboutUs")}</p>
          </div>
          <h1 className="sm:text-[30px] text-[24px] font-semibold">
            {t("aboutUs1")}
          </h1>
          <p className="text-[14px] leading-6 text-grey font-light lg1350:w-[480px] w-full mt-2">
            {t("text")}
          </p>
          <div className="mt-4">
            <Button
              title={t("aboutUs")}
              height="h-[54px]"
              bgColor="bg-blue"
              color="text-white"
              onClick={() => {}}
              width={"w-[200px]"}
            />
          </div>
        </motion.div>
      </div>
      <div className="w-full bg-blue">
        <div
          ref={ref}
          className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[80px] py-[60px] flex flex-col gap-6 items-center"
        >
          <h1 className="sm:text-[30px] text-[24px] font-semibold text-white">
            წარმატების ისტორია
          </h1>
          <div className="w-full grid lg1250:grid-cols-3 md600:grid-cols-2 gap-5">
            {aboutData.map((item, index) => (
              <React.Fragment key={index}>
                {/* Animated Card */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="w-full px-7 pt-7 pb-8 flex flex-col md600:gap-8 gap-6 bg-white rounded-[20px]"
                >
                  <div className="w-full flex flex-col gap-3">
                    {item.icon}
                    <h1 className="xl:text-[24px] text-[20px] font-semibold text-blue">
                      {item.title}
                    </h1>
                    <p className="text-[12px] text-[rgba(97,94,94,1)]">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-full flex flex-col">
                    <h1 className="sm:text-[40px] text-[32px] font-semibold text-blue">
                      <CountUp
                        start={0}
                        end={inView ? item.count : 0}
                        duration={2}
                      />
                      +
                    </h1>
                    <p className="text-[14px]">{t(item.labelKey)}</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                  viewport={{ once: true }}
                  className="w-full md600:h-full h-[300px] relative overflow-hidden"
                  onMouseEnter={() => setHoveredImage(item.id)}
                  onMouseLeave={() => setHoveredImage(undefined)}
                >
                  <Image
                    src={item.image}
                    alt="about"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[10px] z-[1]"
                  />
                  <motion.div
                    animate={{ opacity: hoveredImage === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 w-full h-full backdrop-grayscale backdrop-brightness-75 bg-white/10 transition duration-500 z-[2] rounded-[10px]"
                  />

                  {/* White light wave animation */}
                  {hoveredImage === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 left-0 w-full h-full z-[3] pointer-events-none"
                    >
                      <motion.div
                        initial={{ scaleY: 0, opacity: 1 }}
                        animate={{ scaleY: 1, opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                        style={{ originY: 0.5 }}
                        className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent"
                      />
                      <motion.div
                        initial={{ scaleY: 0, opacity: 1 }}
                        animate={{ scaleY: 1, opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                        style={{ originY: 0.5 }}
                        className="absolute bottom-1/2 left-0 w-full h-full bg-gradient-to-t from-white/30 to-transparent"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

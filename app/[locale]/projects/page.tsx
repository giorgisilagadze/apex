"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ProjectCard1 from "@/components/card/ProjectCard1";
import Filter from "@/components/filter/Filter";
import Shimmer from "@/components/shimmer/Shimmer";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function Projects() {
  const [projects, setProjects] = useState<Building[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [clickedType, setClickedType] = useState("ყველა");
  const t = useTranslations("ProjectsPage");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/building?${
            clickedType !== "ყველა" ? `status=${clickedType}` : ""
          } `
        );
        const data = response.data;

        setProjects(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [clickedType]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // delay between each card
      },
    },
  };

  const types = [
    {
      id: 1,
      title: "ყველა",
    },
    {
      id: 2,
      title: "მიმდინარე",
    },
    {
      id: 3,
      title: "დასრულებული",
    },
  ];

  return (
    <div className="w-full ">
      <div className="w-full sm:h-[550px] h-[450px] relative">
        <Image
          src={"/images/projects1.jpg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blueOpacity to-transparent"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[35%] translate-y-[-35%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            {t("title")}
          </h1>
          <p className="text-[14px] text-white sm:self-center">{t("page")}</p>
        </div>
      </div>
      <div className="sm:mt-[-250px] mt-[-200px] xl1600:px-[100px] lg1350:px-[140px] lg1110:px-[80px] ">
        <Filter page="allProjects" />
      </div>
      <div className="w-full flex items-center md500:gap-6 gap-4 sm:mt-[100px] mt-[40px] justify-center">
        {types.map((item) => (
          <div
            className="flex flex-col items-center gap-[2px]"
            key={item.id}
            onClick={() => {
              setClickedType(item.title);
            }}
          >
            <p
              className={`text-[16px] font-light hover:opacity-50 duration-300 cursor-pointer ${
                item.title == clickedType ? "text-blue" : "text-black"
              }`}
            >
              {t(item.title)}
            </p>
            <div
              className={`w-[40px] h-[1px] ${
                item.title == clickedType ? "bg-blue" : "bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="w-full xl1600:px-[250px] lg:px-[80px] sm:px-[64px] px-6 py-[60px] flex flex-col gap-[40px] items-center ">
        <motion.div
          className="w-full grid lg1250:grid-cols-3 md600:grid-cols-2 gap-x-4 gap-y-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {!isLoading ? (
            projects?.length !== 0 ? (
              projects?.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }} // 20% of element must be visible
                  transition={{
                    delay: index * 0.1, // 100ms stagger
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  key={item.id}
                >
                  <ProjectCard1 item={item} />
                </motion.div>
              ))
            ) : (
              <div className="w-full lg1250:col-span-3 md600:col-span-2 h-[300px] flex items-center gap-2 justify-center">
                <IoSearchOutline className="text-[16px]" />
                <p className="text-[14px]">{t("noProject")}</p>
              </div>
            )
          ) : (
            [1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="w-full h-[400px] rounded-[10px] border border-[#eee] relative"
              >
                <div className="absolute top-0 left-0 w-full h-full">
                  <Shimmer height="h-full" rounded="rounded-[10px]" />
                </div>
                <div className="w-full h-full md500:p-7 p-6 flex flex-col justify-between absolute top-0 left-0">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="w-[60%] h-[45px] rounded-[8px] bg-white"></div>
                    <div className="w-[40%] h-[21px] rounded-[8px] bg-white"></div>
                  </div>
                  <div className="flex lg:items-center sm:items-start md500:items-start justify-between lg:flex-row md500:flex-col flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="w-[140px] h-[33px] rounded-[8px] bg-white"></div>
                      <div className="w-[169px] h-[1px] bg-white"></div>
                      <div className="w-[169px] h-[21px] bg-white rounded-[8px]"></div>
                    </div>
                    <div className="lg:w-[126px] w-full h-[50px] bg-white rounded-[30px]"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

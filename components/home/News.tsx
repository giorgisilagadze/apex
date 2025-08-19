"use client";

import Link from "next/link";
import ProjectCard from "../card/ProjectCard";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";
import ScreenSize from "@/hooks/ScreenSize";

interface Props {
  news: NewsItem[];
}

export default function News({ news }: Props) {
  const locale = useLocale();
  const t = useTranslations("HomePage.News");
  const route = useRouter();

  const dimencion = ScreenSize();

  return (
    <div className="w-full  py-[60px] flex flex-col gap-8 bg-blue relative">
      <div className="w-full flex items-center justify-between xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6">
        <div className="w-full flex flex-col gap-2">
          <div className="items-center gap-3 flex">
            <div className="w-[50px] h-[1px] bg-white"></div>
            <p className="text-[14px] text-white font-light">{t("blog")}</p>
          </div>
          <h1 className="sm:text-[30px] text-[24px] font-semibold text-white">
            {t("news")}
          </h1>
        </div>

        <button
          className="sm:w-[220px] w-[200px] h-[50px] rounded-[12px] bg-[rgba(47,159,42,1)] flex items-center justify-center sm:gap-2 gap-1"
          onClick={() => route.push(`/${locale}/news`)}
        >
          <p className="sm:text-[14px] text-[12px] text-white">{t("all")}</p>
          <BsArrowRight className="sm:text-[20px] text-[16px] text-white -rotate-45" />
        </button>
      </div>
      {dimencion[0] > 1110 ? (
        <div className="w-full grid lg1110:grid-cols-3 grid-cols-2 h-[584px] gap-5 xl1600:px-[140px] lg1250:px-[100px] lg:px-[100px] sm:px-[64px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectCard
              item={news[0]}
              isWhite={true}
              height="lg1110:h-[584px] h-[400px]"
              isSingle={true}
            />
          </motion.div>
          <div className="w-full h-full lg1110:col-span-2 grid lg1110:grid-cols-2 lg1110:grid-rows-2 gap-x-5 lg1110:row-span-2">
            {news?.slice(1).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard
                  item={item}
                  isWhite={true}
                  height="lg1110:h-[282px] h-[400px]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full grid md600:grid-cols-2 gap-5 xl1600:px-[140px] lg1250:px-[100px] lg:px-[100px] sm:px-[64px] px-6">
          {news?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard
                item={item}
                isWhite={true}
                height="md500:h-[400px] h-[350px]"
              />
            </motion.div>
          ))}
        </div>
      )}

      <div className="absolute top-0 left-[-100px]">
        <div className="w-[300px] h-[300px] relative">
          <Image
            src={"/images/1w.png"}
            alt="bg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="absolute top-0 right-[0px]">
        <div className="w-[300px] h-[300px] relative">
          <Image
            src={"/images/2w.png"}
            alt="bg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-[-100px]">
        <div className="w-[300px] h-[300px] relative">
          <Image
            src={"/images/3w.png"}
            alt="bg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-[0px]">
        <div className="w-[300px] h-[300px] relative">
          <Image
            src={"/images/4w.png"}
            alt="bg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

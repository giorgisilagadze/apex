"use client";

import Link from "next/link";
import ProjectCard from "../card/ProjectCard";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/legacy/image";

interface Props {
  news: NewsItem[];
}

export default function News({ news }: Props) {
  const locale = useLocale();
  const t = useTranslations("HomePage.News");

  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[120px] py-[60px] flex flex-col gap-8 sm:mt-[-100px] mt-[-60px] bg-blue relative">
      <div className="w-full flex items-end justify-between">
        <div className="w-full flex flex-col gap-2">
          <div className="items-center gap-3 flex">
            <div className="w-[50px] h-[1px] bg-white"></div>
            <p className="text-[14px] text-white font-light">{t("blog")}</p>
          </div>
          <h1 className="sm:text-[30px] text-[24px] font-semibold text-white">
            {t("news")}
          </h1>
        </div>
        <Link
          href={`/${locale}/news`}
          className="flex items-center sm:gap-3 gap-1 hover:opacity-50 duration-300"
        >
          <div className="w-[50px] h-[1px] bg-white mt-[3px] hidden sm:block"></div>
          <MdOutlineRemoveRedEye className="sm:hidden mt-[-2px] text-white" />
          <p className="text-[14px] font-light whitespace-nowrap text-white">
            {t("all")}
          </p>
        </Link>
      </div>
      <div className="w-full grid lg1250:grid-cols-3 md600:grid-cols-2 gap-x-5 gap-y-8">
        {news?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectCard key={item.id} item={item} isWhite={true} />
          </motion.div>
        ))}
      </div>
      <div className="absolute top-0 left-[-100px]">
        <div className="w-[300px] h-[300px] relative">
          <Image src={"/images/1w.png"} alt="bg" layout="fill" />
        </div>
      </div>
      <div className="absolute top-0 right-[-100px]">
        <div className="w-[300px] h-[300px] relative">
          <Image src={"/images/2w.png"} alt="bg" layout="fill" />
        </div>
      </div>
      <div className="absolute bottom-0 left-[-100px]">
        <div className="w-[300px] h-[300px] relative">
          <Image src={"/images/3w.png"} alt="bg" layout="fill" />
        </div>
      </div>
      <div className="absolute bottom-0 right-[-100px]">
        <div className="w-[300px] h-[300px] relative">
          <Image src={"/images/4w.png"} alt="bg" layout="fill" />
        </div>
      </div>
    </div>
  );
}

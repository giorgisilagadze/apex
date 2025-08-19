"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsArrowDown } from "react-icons/bs";

import { IoLocationSharp } from "react-icons/io5";
import { MdSell } from "react-icons/md";

interface Props {
  item: Building;
}

export default function ProjectCard1({ item }: Props) {
  const locale = useLocale();
  const t = useTranslations("ProjectsPage.card");
  const route = useRouter();
  return (
    <div
      className="w-full h-[400px] relative cursor-pointer"
      onClick={() => route.push(`/${locale}/projects/${item.id}`)}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
        alt="image"
        layout="fill"
        objectFit="cover"
        className="rounded-[10px]"
      />

      <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blueOpacity to-transparent rounded-[10px]"></div>
      <div className="w-full h-full absolute top-0 left-0 md500:p-7 p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-[2px]">
          <p className="sm:text-[26px] text-[22px] text-white font-semibold text-ellipsis truncate">
            {locale == "ge"
              ? item.title
              : locale == "en"
              ? item.title_en
              : item.title_ru}
          </p>
          <div className="flex items-center gap-1">
            <IoLocationSharp className="text-[16px] text-white mt-[-4px]" />
            <p className="text-[14px] text-white font-light">
              {locale == "ge" ? item.address : item.address_en}
            </p>
          </div>
        </div>
        <div className="flex lg:items-center sm:items-start md500:items-start justify-between lg:flex-row md500:flex-col flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[20px] text-white font-semibold">
              {t(item.status)}
            </p>
            <div className="w-full h-[1px] bg-white"></div>
            <div className="flex items-center gap-2">
              <MdSell className="text-[16px] text-white" />
              <h1 className="text-[14px] text-white font-light">
                {t("sold")} {item.sold_percent}%
              </h1>
            </div>
          </div>
          <Link
            href={`/${locale}/projects/${item.id}`}
            className="px-4 py-[10px] lg:w-auto w-full flex items-center gap-3 border border-white rounded-[30px] cursor-pointer hover:opacity-50 duration-300 justify-center backdrop-blur-[10px] bg-[rgba(255,255,255,0.2)]"
          >
            <p className="text-[12px] text-white font-light">{t("seeMore")}</p>
            <div className="flex items-center justify-center w-[28px] h-[28px] rounded-[50%] border border-white cursor-pointer">
              <BsArrowDown className="text-white text-[18px] -rotate-90" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

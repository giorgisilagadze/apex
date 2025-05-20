"use client";

import { BsArrowDown } from "react-icons/bs";
import Button from "../button/Button";
import { HiDocumentText } from "react-icons/hi2";
import { SiArchicad } from "react-icons/si";
import { useTranslations } from "next-intl";

interface Props {
  title: string;
  subtitle?: string;
  isfloor?: boolean;
  soldPerc: string;
  donePerc: string;
}

export default function SaleInfo({
  title,
  subtitle,
  isfloor,
  soldPerc,
  donePerc,
}: Props) {
  const t = useTranslations("SingleProject");
  return (
    <div
      className={`w-full h-full bg-blue flex lg1110:items-center items-start relative ${
        !isfloor
          ? "lg1110:col-span-2 justify-center flex-col xl:gap-8 gap-5 lg1110:pt-10 xl:pt-0 py-[100px] lg1110:py-0"
          : "justify-between flex-col sm:flex-row lg1110:pt-[200px] pt-[100px] pb-[80px] xl:pr-[100px] lg1110:pr-[60px] pr-6"
      }`}
    >
      <div className="w-full flex flex-col xl:gap-6 gap-4">
        {!isfloor && (
          <div className="flex items-center gap-2">
            <hr className="xl:w-[100px] lg1110:w-[60px] w-6 h-[1px] border-none bg-white" />
            <p className="text-[14px] text-white">{subtitle}</p>
          </div>
        )}
        <h1 className="xl:text-[50px] text-[42px] text-white xl:px-[100px] lg1110:px-[60px] px-6">
          {title}
        </h1>
      </div>
      <div
        className={` flex flex-col gap-6 ${
          isfloor
            ? "sm:w-[600px] w-full pl-6 sm:pl-0"
            : " lg1110:w-full sm:w-[70%] w-full xl:px-[100px] lg1110:px-[60px] px-6"
        }`}
      >
        <div className="w-full flex flex-col gap-2">
          <p className="text-white">{t("sold")}</p>
          <div className="w-full h-8 rounded-[15px] bg-[rgba(237,240,244,1)] relative">
            <div
              className={`absolute top-0 left-0 h-full rounded-tl-[15px] rounded-bl-[15px] bg-lightBlue flex items-center justify-center`}
              style={{ width: `${soldPerc}%` }}
            >
              <p className="text-[14px] text-white">{soldPerc}%</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="text-white">{t("work")}</p>
          <div className="w-full h-8 rounded-[15px] bg-[rgba(237,240,244,1)] relative">
            <div
              className="absolute top-0 left-0 h-full  rounded-tl-[15px] rounded-bl-[15px] bg-lightBlue flex items-center justify-center"
              style={{ width: `${donePerc}%` }}
            >
              <p className="text-[14px] text-white">{donePerc}%</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-8 flex-col xl1680:flex-row gap-5">
          <Button
            title={t("download")}
            onClick={() => {}}
            width={"xl1680:w-[240px] w-full"}
            bgColor="bg-white"
            color="text-blue"
            height="h-[45px]"
            icon={HiDocumentText}
          />
          <Button
            title={"archicad view"}
            onClick={() => {}}
            width={"xl1680:w-[200px] w-full"}
            bgColor="bg-transparent"
            color="text-white"
            height="h-[45px]"
            icon={SiArchicad}
            border={true}
          />
        </div>
      </div>
      {!isfloor && (
        <div className="absolute left-[50%] translate-x-[-50%] xl:bottom-[40px] bottom-6 z-[3] flex flex-col items-center gap-4 bounce">
          <p className="xl:text-[14px] text-[12px] text-white font-extralight hidden lg1350:block">
            {t("scroll")}
          </p>
          <div className="flex items-center justify-center xl:w-[32px] xl:h-[32px] w-5 h-5 rounded-[50%] border border-white">
            <BsArrowDown className="text-white xl:mt-[-26px] mt-[-20px] xl:text-[26px] text-[20px]" />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/legacy/image";
import { useState } from "react";

import { IoArrowForwardCircleOutline } from "react-icons/io5";
import PopUpComp from "../popUp/PopUpComp";
import { RxCross1 } from "react-icons/rx";
import Contact from "./Contact";
import { useTranslations } from "next-intl";
import { BsArrowRight } from "react-icons/bs";

export default function Italy() {
  const [isContactClicked, setIsContactClicked] = useState(false);
  const t = useTranslations("Italy");
  return (
    <div className="w-full lg1110:h-[450px] xl1600:pl-[140px] lg1110:pl-[100px] grid lg1110:grid-cols-2  bg-white relative">
      <Image
        src={"/images/pattern_bg.png"}
        alt="bg"
        layout="fill"
        objectFit="cover"
        className="z-[1] pointer-events-none select-none"
      />
      <div className="flex flex-col sm:gap-7 gap-5 w-full z-[2] sm:py-[50px] py-6 pr-6 sm:pr-[60px] pl-6 sm:pl-[60px] lg:pl-[100px] lg1110:pl-0">
        <h1 className="sm:text-[26px] text-[22px] font-semibold text-blue">
          {t("title")}
        </h1>
        <p className="text-blue sm:text-[16px] text-[14px]">{t("subtitle")}</p>
        <p className="text-blue sm:text-[16px] text-[14px]">{t("text")}</p>
        <button
          className="sm:w-[220px] w-[200px] h-[50px] rounded-[12px] bg-[rgba(47,159,42,1)] flex items-center justify-center sm:gap-2 gap-1 sm:mt-[40px] mt-5"
          onClick={() => setIsContactClicked(true)}
        >
          <p className="sm:text-[14px] text-[12px] text-white">{t("all")}</p>
          <BsArrowRight className="sm:text-[20px] text-[16px] text-white -rotate-45" />
        </button>
      </div>
      <div className="w-full h-[450px] grid grid-cols-2 z-[2]">
        <div className="w-full h-[225px] relative">
          <Image
            src={"/images/about1.jpg"}
            alt="bg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full h-[225px] relative">
          <Image
            src={"/images/about2.jpg"}
            alt="bg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full h-[225px] relative">
          <Image
            src={"/images/about3.jpg"}
            alt="bg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full h-[225px] relative">
          <Image
            src={"/images/about4.jpg"}
            alt="bg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

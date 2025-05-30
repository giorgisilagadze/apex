"use client";

import Image from "next/legacy/image";
import { useState } from "react";

import { IoArrowForwardCircleOutline } from "react-icons/io5";
import PopUpComp from "../popUp/PopUpComp";
import { RxCross1 } from "react-icons/rx";
import Contact from "./Contact";
import { useTranslations } from "next-intl";

export default function Italy() {
  const [isContactClicked, setIsContactClicked] = useState(false);
  const t = useTranslations("Italy");
  return (
    <>
      <div className="w-full xl1600:pl-[330px] lg1250:pl-[200px] lg:pl-[100px] sm:pl-[64px] pl-6 pt-5 flex flex-col lg:flex-row lg1110:items-center lg:items-end justify-between bg-white sm:mt-[-100px] mt-[-60px] relative">
        <Image
          src={"/images/pattern_bg.png"}
          alt="bg"
          layout="fill"
          objectFit="cover"
          className="z-[1] pointer-events-none select-none"
        />
        <div className="flex flex-col gap-5 lg:max-w-[600px] sm:max-w-[500px] w-full z-[2] py-[60px] lg1110:py-0">
          <h1 className="sm:text-[30px] text-[24px] font-semibold text-blue">
            {t("title")}
          </h1>
          <p className="text-[14px] text-blue mt-[-5px]">{t("subtitle")}</p>
          <p className="text-[14px] text-blue mt-[-10px]">{t("text")}</p>
          <button
            className="w-[220px] h-[54px] rounded-[16px] bg-[rgba(47,159,42,1)] flex items-center justify-center gap-2"
            onClick={() => setIsContactClicked(true)}
          >
            <p className="text-[14px] text-white">{t("contact")}</p>
            <IoArrowForwardCircleOutline className="text-[20px] text-white" />
          </button>
        </div>
        <div className="flex items-end self-end">
          <div className="lg1110:w-[600px] lg:w-[450px] w-[400px] aspect-[4/3] relative">
            <Image
              src={"/images/italy.png"}
              alt="bg"
              layout="fill"
              // objectFit="cover"
              className="z-[2]"
            />
          </div>
        </div>
      </div>
      <PopUpComp
        isPopUpVisible={isContactClicked}
        setIsPopUpVisible={setIsContactClicked}
        width={"lg1350:w-[60%] sm:w-[80%] w-[90%]"}
        bg="bg-trasparent"
      >
        <div className="w-full flex flex-col gap-2">
          <RxCross1
            className="text-white text-[20px] self-end cursor-pointer hover:opacity-50 duration-300"
            onClick={() => setIsContactClicked(false)}
          />
          <Contact isPopUp={true} setIsContactClicked={setIsContactClicked} />
        </div>
      </PopUpComp>
    </>
  );
}

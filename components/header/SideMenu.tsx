import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Language from "./Language";
import Link from "next/link";
import { PiUser } from "react-icons/pi";
import { useLocale, useTranslations } from "next-intl";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";
import Button from "../button/Button";

interface Props {
  isSideMenuVis: boolean;
  setIsSideMenuVis: (isSideMenuVis: boolean) => void;
  isLangClicked: boolean;
  setIsLangCLicked: (isLangClicked: boolean) => void;
  handleContactClick: () => void;
}

export default function SideMenu({
  isSideMenuVis,
  setIsSideMenuVis,
  isLangClicked,
  setIsLangCLicked,
  handleContactClick,
}: Props) {
  const locale = useLocale();
  const t = useTranslations("Header");

  const nav = [
    {
      id: 1,
      title: t("home"),
      link: `/${locale}/`,
    },
    {
      id: 2,
      title: t("aboutUs"),
      link: `/${locale}/about-us`,
    },
    {
      id: 3,
      title: t("projects"),
      link: `/${locale}/projects`,
    },
    {
      id: 4,
      title: t("news"),
      link: `/${locale}/news`,
    },
    // {
    //   id: 4,
    //   title: t("gallery"),
    //   link: `/${locale}/gallery`,
    // },
    {
      id: 5,
      title: t("partniors"),
      link: `/${locale}/partners`,
    },
    {
      id: 6,
      title: t("construction"),
      link: `/${locale}/construction`,
    },
    {
      id: 7,
      title: t("replace"),
      link: `/${locale}/replace-with-new`,
    },
  ];

  const callPhone = () => {
    const phoneNumber = "0322055055";
    // Construct the phone call URL
    const phoneUrl = `tel:${phoneNumber}`;

    // Open the phone dialer
    if (typeof window !== "undefined") {
      window.open(phoneUrl, "_self");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[100vw] h-[100vh] flex justify-center items-center ${
        isSideMenuVis ? "opacity-100 !z-[11] " : "opacity-0 -z-[1] duration-500"
      }`}
    >
      <div
        className={`w-[100vw] h-[100vh] fixed top-0 right-0 z-[12] transition-opacity ${
          isSideMenuVis
            ? "backdrop-blur-md opacity-100 duration-0"
            : "opacity-0"
        }`}
        onClick={() => {
          setIsSideMenuVis(false);
        }}
      ></div>
      <div
        className={`md500:w-[420px] w-full h-full bg-[rgba(243,243,243,1)] fixed top-0 right-0 duration-300 z-[13] overflow-y-auto md500:m-4 p-6 flex flex-col gap-6 ${
          isSideMenuVis ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex items-center justify-between pr-8">
          <div
            className="flex items-center gap-2 text-textGrey"
            onClick={() => {
              setIsSideMenuVis(false);
            }}
          >
            <RxCross1 className="text-[18px]" />
            <p className="text-[14px] mt-[3px]">{t("close")}</p>
          </div>
          <Language
            isLangClicked={isLangClicked}
            setIsLangCLicked={setIsLangCLicked}
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          {nav.map((item) => (
            <Link
              key={item.id}
              className={`cursor-pointer border-b border-[#dcdcdc] pb-3`}
              href={item.link}
              onClick={() => setIsSideMenuVis(false)}
            >
              <p className="text-[14px] inline-block">{item.title}</p>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1" onClick={callPhone}>
          <IoMdCall className="text-[18px] " />
          <p className="text-[14px]">0322 055 055</p>
        </div>
        {/* <div className="flex items-center gap-1">
          <BsCameraVideo className="text-[16px]" />
          <p className="text-[14px] font-light">ვიდეო ზარი</p>
        </div> */}
        <Button
          title={t("contact")}
          onClick={() => {
            setIsSideMenuVis(false);
            handleContactClick();
          }}
          width={"w-full"}
          bgColor="bg-white"
          color="text-blue"
          height="h-[45px]"
          fontWeight="font-semibold"
        />
      </div>
    </div>
  );
}

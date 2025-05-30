"use client";

import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IoMdCall } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";
import Button from "../button/Button";
import Language from "./Language";
import { useLocale, useTranslations } from "next-intl";

import { CiMenuFries } from "react-icons/ci";
import SideMenu from "./SideMenu";
import { usePathname } from "next/navigation";
import PopUpComp from "../popUp/PopUpComp";
import Contact from "../home/Contact";
import { RxCross1 } from "react-icons/rx";

export default function Header() {
  const [hoveredPageId, sethoveredPageId] = useState(0);
  const [isLangClicked, setIsLangCLicked] = useState(false);
  const [isSideMenuVis, setIsSideMenuVis] = useState(false);
  const [isContactClicked, setIsContactClicked] = useState(false);

  const locale = useLocale();
  const t = useTranslations("Header");
  const pathname = usePathname();

  const nav = [
    {
      id: 1,
      title: t("aboutUs"),
      link: `/${locale}/about-us`,
    },
    {
      id: 2,
      title: t("projects"),
      link: `/${locale}/projects`,
    },
    {
      id: 3,
      title: t("news"),
      link: `/${locale}/news`,
    },
    {
      id: 4,
      title: t("gallery"),
      link: `/${locale}/gallery`,
    },
    {
      id: 5,
      title: t("partniors"),
      link: `/${locale}/partners`,
    },
  ];

  const callPhone = () => {
    const phoneNumber = "555045555";
    // Construct the phone call URL
    const phoneUrl = `tel:${phoneNumber}`;

    // Open the phone dialer
    if (typeof window !== "undefined") {
      window.open(phoneUrl, "_self");
    }
  };

  return (
    <>
      {" "}
      {!pathname.includes(`/${locale}/admin`) && (
        <header
          className={`w-full flex items-center justify-between lg1110:px-[60px] px-6 py-[24px] absolute ${
            isContactClicked ? "z-[1]" : "z-10"
          } z-10 bg-transparent`}
        >
          <Link href={`/${locale}`} className="cursor-pointer">
            <Image src={"/images/logo.png"} alt="logo" width={70} height={70} />
          </Link>
          <div className="items-center gap-7 hidden lg1110:flex">
            {nav.map((item) => (
              <Link className={`cursor-pointer`} href={item.link} key={item.id}>
                <p
                  className="text-white"
                  onMouseOver={() => {
                    sethoveredPageId(item.id);
                  }}
                  onMouseLeave={() => {
                    sethoveredPageId(0);
                  }}
                >
                  {item.title}
                </p>
                <div
                  className={`${hoveredPageId == item.id ? "w-full" : "w-0"} ${
                    pathname == item.link ? "w-[50%] mx-auto" : "w-0"
                  } h-[1px] mt-[4px] bg-white duration-500`}
                ></div>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div
              className="lg1350:flex items-center gap-1 hidden cursor-pointer hover:opacity-60 duration-300"
              onClick={callPhone}
            >
              <IoMdCall className="text-[18px] text-white animate-soft-bounce" />
              <p className="text-[16px] text-white">+995 555 045 555</p>
            </div>
            {/* <div className="lg1110:flex items-center gap-1 hidden">
              <BsCameraVideo className="text-[16px] text-white" />
              <p className="text-[14px] text-white font-light">ვიდეო ზარი</p>
            </div> */}
            <div className="hidden lg1110:block">
              <Language
                isLangClicked={isLangClicked}
                setIsLangCLicked={setIsLangCLicked}
              />
            </div>

            <div className="lg1110:block hidden">
              <Button
                title={t("contact")}
                onClick={() => setIsContactClicked(true)}
                width={"w-[200px]"}
                bgColor="bg-white"
                color="text-blue"
                height="h-[45px]"
                fontWeight="font-semibold"
              />
            </div>
            {/* <Link href={`/${locale}`} className="cursor-pointer lg1110:hidden">
            <Image src={"/images/logo.png"} alt="logo" width={50} height={60} />
          </Link> */}
            <CiMenuFries
              className={`text-[24px] rotate-180 lg1110:hidden text-white`}
              onClick={() => setIsSideMenuVis(true)}
            />
          </div>
        </header>
      )}
      <SideMenu
        isSideMenuVis={isSideMenuVis}
        setIsSideMenuVis={setIsSideMenuVis}
        isLangClicked={isLangClicked}
        setIsLangCLicked={setIsLangCLicked}
        isContactClicked={isContactClicked}
        setIsContactClicked={setIsContactClicked}
      />
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

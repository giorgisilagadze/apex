"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IoMdCall } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";
import Button from "../button/Button";
import Language from "./Language";
import { useLocale } from "next-intl";

import { CiMenuFries } from "react-icons/ci";
import SideMenu from "./SideMenu";

export default function Header() {
  const [hoveredPageId, sethoveredPageId] = useState(0);
  const [isLangClicked, setIsLangCLicked] = useState(false);
  const [isSideMenuVis, setIsSideMenuVis] = useState(false);

  const locale = useLocale();

  const nav = [
    {
      id: 1,
      title: "ჩვენ შესახებ",
      link: `/${locale}/about-us`,
    },
    {
      id: 2,
      title: "პროექტები",
      link: `/${locale}/projects`,
    },
    {
      id: 3,
      title: "სიახლეები",
      link: `/${locale}/news`,
    },
    {
      id: 4,
      title: "გალერეა",
      link: `/${locale}/news`,
    },
    {
      id: 5,
      title: "პარტნიორები",
      link: `/${locale}/partniors`,
    },
  ];
  return (
    <>
      {" "}
      <header className="w-full flex items-center justify-between px-[60px] py-[24px] absolute z-10 bg-transparent">
        <CiMenuFries
          className={`text-[24px] rotate-180 lg1110:hidden text-white`}
          onClick={() => setIsSideMenuVis(true)}
        />
        <Link
          href={`/${locale}`}
          className="cursor-pointer hidden lg1110:block"
        >
          <Image src={"/images/logo.png"} alt="logo" width={50} height={60} />
        </Link>
        <div className="items-center gap-7 hidden lg1110:flex">
          {nav.map((item) => (
            <Link className={`cursor-pointer`} href={item.link} key={item.id}>
              <p
                className="text-[14px] text-white"
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
                className={`${
                  hoveredPageId == item.id ? "w-full" : "w-0"
                } h-[1px] mt-[4px] bg-white duration-500`}
              ></div>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="lg1350:flex items-center gap-1 hidden">
            <IoMdCall className="text-[18px] mt-[4px] text-white" />
            <p className="text-[14px] text-white">+995 555 045 555</p>
          </div>
          <div className="lg1110:flex items-center gap-1 hidden">
            <BsCameraVideo className="text-[16px] mt-[4px] text-white" />
            <p className="text-[14px] text-white font-light">ვიდეო ზარი</p>
          </div>
          <div className="hidden lg1110:block">
            <Language
              isLangClicked={isLangClicked}
              setIsLangCLicked={setIsLangCLicked}
            />
          </div>

          <div className="lg1110:block hidden">
            <Button
              title={"დაგვიკავშირდით"}
              onClick={() => {}}
              width={"w-[200px]"}
              bgColor="bg-white"
              color="text-blue"
              height="h-[45px]"
              fontWeight="font-semibold"
            />
          </div>
          <Link href={`/${locale}`} className="cursor-pointer lg1110:hidden">
            <Image src={"/images/logo.png"} alt="logo" width={50} height={60} />
          </Link>
        </div>
      </header>
      <SideMenu
        isSideMenuVis={isSideMenuVis}
        setIsSideMenuVis={setIsSideMenuVis}
        isLangClicked={isLangClicked}
        setIsLangCLicked={setIsLangCLicked}
      />
    </>
  );
}

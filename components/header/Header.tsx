"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IoMdCall } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";
import Button from "../button/Button";
import Language from "./Language";

export default function Header() {
  const [hoveredPageId, sethoveredPageId] = useState(0);
  const [isLangClicked, setIsLangCLicked] = useState(false);

  const nav = [
    {
      id: 1,
      title: "ჩვენ შესახებ",
      link: `/about-us`,
    },
    {
      id: 2,
      title: "პროექტები",
      link: "/projects",
    },
    {
      id: 3,
      title: "სიახლეები",
      link: "/world",
    },
    {
      id: 4,
      title: "გალერეა",
      link: "/world",
    },
    {
      id: 5,
      title: "პარტნიორები",
      link: "/world",
    },
  ];
  return (
    <header className="w-full flex items-center justify-between px-[60px] py-[24px] fixed z-10 bg-transparent">
      <Image src={"/images/logo.png"} alt="logo" width={50} height={60} />
      <div className="flex items-center gap-7">
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
        <div className="flex items-center gap-1">
          <IoMdCall className="text-[18px] mt-[4px] text-white" />
          <p className="text-[14px] text-white">+995 555 045 555</p>
        </div>
        <div className="flex items-center gap-1">
          <BsCameraVideo className="text-[16px] mt-[4px] text-white" />
          <p className="text-[14px] text-white font-light">ვიდეო ზარი</p>
        </div>
        <Language
          isLangClicked={isLangClicked}
          setIsLangCLicked={setIsLangCLicked}
        />
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
    </header>
  );
}

import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Language from "./Language";
import Link from "next/link";
import { PiUser } from "react-icons/pi";
import { useLocale } from "next-intl";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";
import Button from "../button/Button";

interface Props {
  isSideMenuVis: boolean;
  setIsSideMenuVis: (isSideMenuVis: boolean) => void;
  isLangClicked: boolean;
  setIsLangCLicked: (isLangClicked: boolean) => void;
}

export default function SideMenu({
  isSideMenuVis,
  setIsSideMenuVis,
  isLangClicked,
  setIsLangCLicked,
}: Props) {
  const locale = useLocale();
  const [isSearchVis, setIsSearchVis] = useState(false);

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

  const products = [
    {
      id: 1,
      title: "Trousers",
    },
    {
      id: 2,
      title: "Jacket",
    },
    {
      id: 3,
      title: "Blazer",
    },
    {
      id: 4,
      title: "Shirts",
    },
    {
      id: 5,
      title: "Knitwear",
    },
    {
      id: 6,
      title: "T-shirts",
    },
    {
      id: 7,
      title: "Outwear",
    },
    {
      id: 8,
      title: "Shoes",
    },
    {
      id: 9,
      title: "Accessories",
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center ${
        isSideMenuVis ? "opacity-100 !z-[11] " : "opacity-0 -z-[1] duration-500"
      }`}
    >
      <div
        className={`w-[100vw] h-[100vh] fixed top-0 left-0 z-[12] transition-opacity ${
          isSideMenuVis
            ? "backdrop-blur-md opacity-100 duration-0"
            : "opacity-0"
        }`}
        onClick={() => {
          setIsSideMenuVis(false);
        }}
      ></div>
      <div
        className={`md500:w-[420px] w-full h-full bg-[rgba(243,243,243,1)] fixed top-0 left-0 duration-300 z-[13] overflow-y-auto md500:m-4 p-6 flex flex-col gap-6 ${
          isSideMenuVis ? "translate-x-0" : "translate-x-[-100%]"
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
            <p className="text-[14px]">Close</p>
          </div>
          <Language
            isLangClicked={isLangClicked}
            setIsLangCLicked={setIsLangCLicked}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          {nav.map((item) => (
            <Link
              key={item.id}
              className={`cursor-pointer`}
              href={item.link}
              onClick={() => setIsSideMenuVis(false)}
            >
              <p className="text-[14px]">{item.title}</p>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <IoMdCall className="text-[18px] mt-[4px]" />
          <p className="text-[14px]">+995 555 045 555</p>
        </div>
        <div className="flex items-center gap-1">
          <BsCameraVideo className="text-[16px] mt-[4px]" />
          <p className="text-[14px] font-light">ვიდეო ზარი</p>
        </div>
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
    </div>
  );
}

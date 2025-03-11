"use client";

import { BsArrowDown } from "react-icons/bs";
import Button from "../button/Button";
import { HiDocumentText } from "react-icons/hi2";
import { SiArchicad } from "react-icons/si";

interface Props {
  title: string;
  subtitle: string;
  isfloor?: boolean;
}

export default function SaleInfo({ title, subtitle, isfloor }: Props) {
  return (
    <div
      className={`w-full h-full bg-blue flex items-center relative ${
        !isfloor
          ? "col-span-2 justify-center flex-col gap-8"
          : "justify-between pt-[200px] pb-[80px] pr-[100px]"
      }`}
    >
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <hr className="w-[100px] h-[1px] border-none bg-white" />
          <p className="text-[14px] text-white">{subtitle}</p>
        </div>
        <h1 className="text-[50px] text-white px-[100px]">{title}</h1>
      </div>
      <div
        className={` flex flex-col gap-6 ${
          isfloor ? "w-[600px]" : " w-full px-[100px]"
        }`}
      >
        <div className="w-full flex flex-col gap-2">
          <p className="text-white">გაყიდული ბინები</p>
          <div className="w-full h-8 rounded-[15px] bg-[rgba(237,240,244,1)] relative">
            <div className="absolute top-0 left-0 h-full w-[30%] rounded-tl-[15px] rounded-bl-[15px] bg-lightBlue flex items-center justify-center">
              <p className="text-[14px] text-white">30%</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="text-white">შესრულებული სამუშაოები</p>
          <div className="w-full h-8 rounded-[15px] bg-[rgba(237,240,244,1)] relative">
            <div className="absolute top-0 left-0 h-full w-[15%] rounded-tl-[15px] rounded-bl-[15px] bg-lightBlue flex items-center justify-center">
              <p className="text-[14px] text-white">15%</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-8">
          <Button
            title={"პრეზენტაციის გადმოწერა"}
            onClick={() => {}}
            width={"w-[240px]"}
            bgColor="bg-white"
            color="text-blue"
            height="h-[45px]"
            icon={HiDocumentText}
          />
          <Button
            title={"archicad view"}
            onClick={() => {}}
            width={"w-[200px]"}
            bgColor="bg-transparent"
            color="text-white"
            height="h-[45px]"
            icon={SiArchicad}
            border={true}
          />
        </div>
      </div>
      {!isfloor && (
        <div className="absolute left-[50%] translate-x-[-50%] sm:bottom-[40px] bottom-6 z-[3] flex flex-col gap-4 bounce">
          <p className="text-[14px] text-white font-extralight">Scroll</p>
          <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-white">
            <BsArrowDown className="text-white mt-[-26px] text-[26px]" />
          </div>
        </div>
      )}
    </div>
  );
}

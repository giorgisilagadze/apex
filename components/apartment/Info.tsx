"use client";

import { useState } from "react";
import Button from "../button/Button";
import { HiDocumentText } from "react-icons/hi2";
import { SiArchicad } from "react-icons/si";

export default function Info() {
  const [selectedCurr, setSelectedCurr] = useState("$");

  const details = [
    {
      id: 1,
      title: "საერთო ფართი:",
      value: "36.5კვ.მ",
    },
    {
      id: 2,
      title: "საძინებელი:",
      value: "12.5კვ.მ",
    },
    {
      id: 3,
      title: "აივანი",
      value: "7.3კვ.მ",
    },
    {
      id: 4,
      title: "აბაზანა",
      value: "5.3კვ.მ",
    },
    {
      id: 5,
      title: "ჰოლი",
      value: "4კვ.მ",
    },
  ];
  return (
    <div className="w-full bg-white rounded-tr-[15px] rounded-br-[15px] py-8 pr-[60px] flex flex-col gap-2">
      <div className="w-full flex items-start justify-between">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <hr className="w-[100px] h-[1px] border-none bg-black" />
            <p className="text-[14px]">აპექს დიდი დიღომი</p>
          </div>
          <h1 className="text-[44px] px-[100px]">ბინა #115</h1>
        </div>
        <h1 className="text-[16px] whitespace-nowrap">სართული 11</h1>
      </div>
      <div className="pl-[100px] flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <h1>
            57.5{" "}
            <span>
              მ<sup>2</sup>
            </span>
          </h1>
          <div className="w-[2px] h-5 bg-black"></div>
          <div className="flex items-center gap-2">
            <h1>
              1295$ /{" "}
              <span>
                მ<sup>2</sup>
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-[30px]">75.565</h1>
          <div className="px-2 py-1 flex items-center gap-2 rounded-[12px] border border-[#eee]">
            <div
              className={`w-8 h-8 rounded-[50%] flex items-center justify-center cursor-pointer ${
                selectedCurr == "₾" && "bg-lightBlue text-white"
              } duration-300`}
              onClick={() => setSelectedCurr("₾")}
            >
              ₾
            </div>
            <div
              className={`w-8 h-8 rounded-[50%] flex items-center justify-center cursor-pointer ${
                selectedCurr == "$" && "bg-lightBlue text-white"
              } duration-300`}
              onClick={() => setSelectedCurr("$")}
            >
              $
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-5">
          {details.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-5 h-5 border border-[rgba(64,95,242,1)] rounded-[50%] flex items-center justify-center">
                <div className="w-2 h-2 rounded-[50%] bg-lightBlue flex items-center justify-center">
                  <div className="w-1 h-1 rounded-[50%] border border-white"></div>
                </div>
              </div>
              <div>
                <h1 className="text-[14px]">{item.title}</h1>
                <p className="text-[14px]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-between gap-3 mt-8">
          <Button
            title={"პრეზენტაციის გადმოწერა"}
            onClick={() => {}}
            width={"w-[240px]"}
            bgColor="bg-blue"
            color="text-white"
            height="h-[45px]"
            icon={HiDocumentText}
          />
          <Button
            title={"archicad view"}
            onClick={() => {}}
            width={"w-[200px]"}
            bgColor="bg-transparent"
            color="text-black"
            height="h-[45px]"
            icon={SiArchicad}
            border={true}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Button from "../button/Button";
import { HiDocumentText } from "react-icons/hi2";
import { SiArchicad } from "react-icons/si";
import { useTranslations } from "next-intl";

interface Props {
  apartment: Apartment1;
}

export default function Info({ apartment }: Props) {
  const [selectedCurr, setSelectedCurr] = useState("$");
  const t = useTranslations("SingleApartmnet");

  const details = [
    {
      id: 1,
      title: `${t("wholeArea")}:`,
      value: parseInt(apartment.area).toFixed(0),
    },
    {
      id: 2,
      title: `${t("bedroom")}:`,
      value: apartment.bedroom,
    },
    {
      id: 3,
      title: `${t("summer")}:`,
      value: apartment.summer_area,
    },
    {
      id: 4,
      title: `${t("bathroom")}:`,
      value: apartment.bathroom,
    },
    {
      id: 5,
      title: `${t("hall")}:`,
      value: apartment.hall,
    },
  ];

  return (
    <div className="w-full bg-white sm:rounded-tr-[15px] sm:rounded-br-[15px] py-8 sm:pr-[60px] pr-6 flex flex-col gap-2">
      <div className="w-full flex items-start justify-between">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <hr className="lg1250:w-[100px] sm:w-10 w-6 h-[1px] border-none bg-black" />
            <p className="text-[14px]">{apartment.building}</p>
          </div>
          <h1 className="sm:text-[44px] text-[32px] lg1250:px-[100px] sm:px-10 px-6">
            {t("apartment")} #{apartment.number}
          </h1>
        </div>
        <h1 className="text-[16px] whitespace-nowrap">
          {t("floor")} {apartment.floor}
        </h1>
      </div>
      <div className="lg1250:pl-[100px] sm:pl-10 pl-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <h1>
            {Number(apartment.area).toFixed(0)}{" "}
            <span>
              {t("area")}
              <sup>2</sup>
            </span>
          </h1>
          <div className="w-[2px] h-5 bg-black"></div>
          <div className="flex items-center gap-2">
            <h1>
              $ {Number(apartment.price2).toFixed(0)}{" "}
              <span>
                {t("area")}
                <sup>2</sup>
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-[30px]">
            {selectedCurr == "$"
              ? Number(apartment.price).toFixed(0)
              : apartment.priceGEL.toFixed(0)}
          </h1>
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
          {details
            .filter((item) => item.value !== null)
            .map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-5 h-5 border border-[rgba(64,95,242,1)] rounded-[50%] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-[50%] bg-lightBlue flex items-center justify-center">
                    <div className="w-1 h-1 rounded-[50%] border border-white"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-[14px]">{item.title}</h1>
                  <p className="text-[14px]">
                    {item.value}
                    {t("area")}
                    <sup>2</sup>
                  </p>
                </div>
              </div>
            ))}
        </div>
        {/* <div className="w-full flex items-center gap-3 mt-8 flex-col md600:flex-row">
          <Button
            title={t("download")}
            onClick={() => {}}
            width={"md600:w-[240px] w-full"}
            bgColor="bg-blue"
            color="text-white"
            height="h-[45px]"
            icon={HiDocumentText}
          />
          <Button
            title={"archicad view"}
            onClick={() => {}}
            width={"md600:w-[200px] w-full"}
            bgColor="bg-transparent"
            color="text-black"
            height="h-[45px]"
            icon={SiArchicad}
            border={true}
          />
        </div> */}
      </div>
    </div>
  );
}

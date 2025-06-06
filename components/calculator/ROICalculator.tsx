"use client";

import Image from "next/legacy/image";
import Input from "../input/Input";
import { IoMdPlay } from "react-icons/io";
import VideoItem from "../gallery/VideoItem";
import SelectComp from "../input/SelectComp";
import { useEffect, useState } from "react";
import SelectComp1 from "../input/SelectComp1";
import { useTranslations } from "next-intl";
import { Project } from "next/dist/build/swc/types";

interface Props {
  apartment: Apartment1;
}

export default function ROICalculator({ apartment }: Props) {
  const [selectedType, setSelectedType] = useState("სრული");
  const [roi, setRoi] = useState<number>();

  const t = useTranslations("SingleApartmnet");
  const f = useTranslations("Filter");

  const ijara = Number(parseFloat(apartment.projectR.ijara).toFixed(2));
  const fullSale = Number(parseFloat(apartment.projectR.fullSale).toFixed(2));
  const halfSale = Number(parseFloat(apartment.projectR.halfSale).toFixed(2));

  useEffect(() => {
    if (selectedType) {
      if (selectedType == "სრული") {
        const result =
          (parseInt(Number(apartment.area).toFixed(0)) * ijara * 12) /
          (parseInt(Number(apartment.area).toFixed(0)) *
            (parseInt(Number(apartment.price2).toFixed(0)) - fullSale));

        setRoi(result);
      } else {
        const result =
          (parseInt(Number(apartment.area).toFixed(0)) * ijara * 12) /
          (parseInt(Number(apartment.area).toFixed(0)) *
            (parseInt(Number(apartment.price2).toFixed(0)) - halfSale));

        setRoi(result);
      }
    }
  }, [selectedType]);

  console.log(roi);

  return (
    <div className="w-full shadow-dropDown relative">
      <div className="w-full flex items-center justify-center h-[68px] bg-blue rounded-tl-[15px] rounded-tr-[15px]">
        <p className="text-white">{t("roi")}</p>
      </div>
      <div className="sm:p-10 p-6 grid lg:grid-cols-3 sm:grid-cols-2 gap-14 bg-white">
        <div className="w-full lg:col-span-2 grid lg:grid-cols-2 gap-5">
          <Input
            placeholder={""}
            title={t("project")}
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={apartment.project}
            readonly={true}
          />
          <Input
            placeholder={""}
            title={t("projectType")}
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={f(apartment.type) as string}
            readonly={true}
          />
          <SelectComp1
            placeholder={t("choose")}
            value={selectedType}
            setValue={setSelectedType}
            data={["სრული", "ნახევარი"]}
            title={t("payment")}
          />
          <Input
            placeholder={""}
            title={`${t("area")}²`}
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={Number(apartment.area).toFixed(0)}
          />
          <Input
            placeholder={""}
            title={t("price")}
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={Number(apartment.price2).toFixed(0) as string}
          />
          <Input
            placeholder={"ROI"}
            title={t("result")}
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={`${roi ? (roi * 100).toFixed(0) : "X"}%`}
          />
        </div>
        <div className="w-full lg:h-full sm:h-[50%] h-[300px] relative flex items-center justify-center">
          <VideoItem
            className="w-full h-full"
            item={{ url: "/images/video.mp4", id: 1 }}
            isLocal={true}
          />
        </div>
      </div>
    </div>
  );
}

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
  projectName: string;
}

export default function ROICalculator({ apartment, projectName }: Props) {
  const [selectedType, setSelectedType] = useState("სრული");
  const [roi, setRoi] = useState<number>();
  const [data, setData] = useState({
    area: "",
    price: "",
  });

  const t = useTranslations("SingleApartmnet");
  const f = useTranslations("Filter");

  const handleOnChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  // const ijara = Number(parseFloat(apartment.projectR.ijara).toFixed(2));
  // const fullSale = Number(parseFloat(apartment.projectR.fullSale).toFixed(2));
  // const halfSale = Number(parseFloat(apartment.projectR.halfSale).toFixed(2));

  // useEffect(() => {
  //   if (selectedType) {
  //     if (selectedType == "სრული") {
  //       const result =
  //         (parseInt(Number(apartment.area).toFixed(0)) * ijara * 12) /
  //         (parseInt(Number(apartment.area).toFixed(0)) *
  //           (parseInt(Number(apartment.price2).toFixed(0)) - fullSale));

  //       setRoi(result);
  //     } else {
  //       const result =
  //         (parseInt(Number(apartment.area).toFixed(0)) * ijara * 12) /
  //         (parseInt(Number(apartment.area).toFixed(0)) *
  //           (parseInt(Number(apartment.price2).toFixed(0)) - halfSale));

  //       setRoi(result);
  //     }
  //   }
  // }, [selectedType]);

  console.log(roi);

  return (
    <div className="w-full relative">
      <div className="w-full flex items-center justify-start h-[78px] rounded-tl-[15px] rounded-tr-[15px]">
        <h1 className="text-white text-[22px] ">{t("roi")}</h1>
      </div>
      <div className="sm:py-10 py-6 grid md500:grid-cols-2 gap-5 w-full">
        <Input
          placeholder={""}
          title={t("project")}
          bgColor="bg-transparent"
          onChange={() => {}}
          value={projectName}
          readonly={true}
          color="text-white"
          isRoi={true}
        />
        <Input
          placeholder={""}
          title={t("projectType")}
          bgColor="bg-transparent"
          onChange={() => {}}
          // value={f(apartment.type) as string}
          value={"სტუდიო" as string}
          readonly={true}
          color="text-white"
          isRoi={true}
        />
        <SelectComp1
          placeholder={t("choose")}
          value={selectedType}
          setValue={setSelectedType}
          data={["სრული", "ნახევარი"]}
          title={t("payment")}
          color="text-white"
        />
        <Input
          inputKey="area"
          placeholder={""}
          title={`${t("area")}²`}
          bgColor="bg-transparent"
          onChange={handleOnChange}
          value={data.area}
          color="text-white"
          isRoi={true}
        />
        <Input
          inputKey="price"
          placeholder={""}
          title={t("price")}
          bgColor="bg-transparent"
          onChange={handleOnChange}
          value={data.price}
          color="text-white"
          isRoi={true}
        />
        {/* <Input
          placeholder={"ROI"}
          title={t("result")}
          bgColor="bg-transparent"
          onChange={() => {}}
          value={`${roi ? (roi * 100).toFixed(0) : "X"}%`}
          color="text-white"
          isRoi={true}
        /> */}
        <div className="w-full flex flex-col gap-[6px]">
          <h1
            className={`text-[14px] font-medium whitespace-nowrap text-white`}
          >
            {t("result")}
          </h1>
          <div>
            <p className="text-[14px] text-white">
              ანაზღაურებადი პერიოდი: 8 წელი
            </p>
            <p className="text-[14px] text-white">
              წმინდა შემოსავალი: $ 14 851
            </p>
            <p className="text-[14px] text-white">ROI: 13%</p>
          </div>
        </div>
        {/* <div className="w-full lg:h-full sm:h-[50%] h-[300px] relative flex items-center justify-center">
          <VideoItem
            className="w-full h-full"
            item={{ url: "/images/video.mp4", id: 1 }}
            isLocal={true}
          />
        </div> */}
      </div>
    </div>
  );
}

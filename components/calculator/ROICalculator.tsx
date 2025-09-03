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
  project: Building;
  projectName: string;
}

export default function ROICalculator({ project, projectName }: Props) {
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

  useEffect(() => {
    if (!data.area || !data.price) return;

    const area = Math.round(Number(data.area));
    const price = Math.round(Number(data.price));
    const ijara = Number(parseFloat(project.ijara).toFixed(2));
    const fullSale = Number(parseFloat(project.fullSale).toFixed(2));
    const halfSale = Number(parseFloat(project.halfSale).toFixed(2));

    const saleValue = selectedType === "სრული" ? fullSale : halfSale;
    const numerator = area * ijara * 12;
    const denominator = area * (price - saleValue);

    const roi1 = numerator / denominator;

    setRoi(roi1);
  }, [selectedType, data]);

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
          value={"ბინა" as string}
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
          title={`${t("price")}`}
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
          <div className="w-full h-[44px] flex items-center justify-start">
            <h1 className="text-[18px] text-white">
              ROI: {`${roi ? (roi * 100).toFixed(0) : "X"}%`}
            </h1>
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

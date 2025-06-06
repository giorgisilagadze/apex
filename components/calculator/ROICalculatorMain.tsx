"use client";

import Image from "next/legacy/image";
import Input from "../input/Input";
import { IoMdPlay } from "react-icons/io";
import VideoItem from "../gallery/VideoItem";
import SelectComp from "../input/SelectComp";
import { useEffect, useState } from "react";
import SelectComp1 from "../input/SelectComp1";
import { useLocale, useTranslations } from "next-intl";
import { Project } from "next/dist/build/swc/types";

interface Props {
  projects: Building[];
}

export default function ROICalculatorMain({ projects }: Props) {
  const [selectedType, setSelectedType] = useState("სრული");
  const [data, setData] = useState({
    project: "",
    area: "",
    price: "",
  });

  const [roi, setRoi] = useState<number>();

  const t = useTranslations("SingleApartmnet");
  const f = useTranslations("Filter");
  const locale = useLocale();

  const handleOnChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  useEffect(() => {
    if (!data.project || !data.area || !data.price) return;

    const project = projects.find((item) => item.title === data.project);
    if (!project) return;

    const area = Math.round(Number(data.area));
    const price = Math.round(Number(data.price));
    const ijara = Number(parseFloat(project.ijara).toFixed(2));
    const fullSale = Number(parseFloat(project.fullSale).toFixed(2));
    const halfSale = Number(parseFloat(project.halfSale).toFixed(2));

    const saleValue = selectedType === "სრული" ? fullSale : halfSale;
    const numerator = area * ijara * 12;
    const denominator = area * (price - saleValue);

    const roi = numerator / denominator;
    setRoi(roi);
  }, [data, selectedType]);

  return (
    <div className="w-full shadow-dropDown relative">
      <div className="w-full flex items-center justify-center h-[68px] bg-blue rounded-tl-[15px] rounded-tr-[15px]">
        <p className="text-white">{t("roi")}</p>
      </div>
      <div className="sm:p-10 p-6 grid lg:grid-cols-3 sm:grid-cols-2 gap-14 bg-white">
        <div className="w-full lg:col-span-2 grid lg:grid-cols-2 gap-5">
          <SelectComp
            title={t("project")}
            placeholder={t("choose")}
            data={projects.map((item) =>
              locale == "ge"
                ? item.title
                : locale == "en"
                ? item.title_en
                : item.title_ru
            )}
            onClick={handleOnChange}
            filterKey="project"
            selectedValues={data}
            isTranslated={true}
          />
          <Input
            placeholder={""}
            title={t("projectType")}
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={f("ბინა")}
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
            placeholder={`${t("area")}²`}
            title={`${t("area")}²`}
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={handleOnChange}
            value={data.area}
            inputKey="area"
            type="number"
          />
          <Input
            placeholder={t("price")}
            title={t("price")}
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={handleOnChange}
            value={data.price}
            inputKey="price"
            type="number"
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

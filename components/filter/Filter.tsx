"use client";

import { useRef, useState } from "react";
import SelectComp from "../input/SelectComp";
import Input from "../input/Input";
import Button from "../button/Button";

import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import ScreenSize from "@/hooks/ScreenSize";
import { MdKeyboardArrowDown } from "react-icons/md";
import useClickOutside from "@/hooks/useClickOutside";
import SortSelect from "../input/SortSelect";
import FilterCard from "../card/FIlterCard";
import Image from "next/legacy/image";

interface Props {
  sort?: { id: number; title: string }[];
  isSingleProject?: boolean;
}

export default function Filter({ sort, isSingleProject }: Props) {
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [selectedCurr, setSelectedCurr] = useState("დოლარი");
  const [selectedPrice, setSelectedPrice] = useState("მაღლიდან დაბლა");

  const dimension = ScreenSize();

  const currency = [
    {
      id: 1,
      value: "ლარი",
    },
    {
      id: 2,
      value: "დოლარი",
    },
  ];

  const price = [
    {
      id: 1,
      value: "მაღლიდან დაბლა",
    },
    {
      id: 2,
      value: "დაბლიდან მაღლა",
    },
  ];

  return (
    <div
      className={`w-full xl1600:px-[250px] lg:px-[80px] sm:px-[64px] px-6 relative ${
        !sort && "sm:py-[80px] py-[60px]"
      }`}
    >
      {!sort && (
        <Image
          src={"/images/pattern_bg.png"}
          alt="bg"
          layout="fill"
          objectFit="cover"
          className="z-[-1]"
        />
      )}
      <div className={`w-full rounded-[16px] shadow-dropDown bg-white z-[1]`}>
        <div className="flex items-center gap-5 shadow-topShadow lg:px-12 px-6 pt-5 pb-3">
          {sort ? (
            sort?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 cursor-pointer"
                onClick={() => setSelectedProjectId(item.id)}
              >
                <p
                  className={`${
                    selectedProjectId == item.id
                      ? "text-blue font-medium"
                      : "text-black font-light"
                  } text-[14px]`}
                >
                  {item.title}
                </p>
                <div
                  className={`w-full h-[2px] ${
                    selectedProjectId == item.id ? "bg-blue" : "bg-trasparent"
                  }`}
                ></div>
              </div>
            ))
          ) : (
            <div className="flex sm:items-center gap-5 flex-wrap">
              <div className="flex items-center gap-1">
                <h1 className={`text-[14px] text-blue`}>თავისუფალია:</h1>
                <p className="text-[14px] text-blue">105 ბინა</p>
              </div>
              <SortSelect
                title="ვალუტა"
                data={currency}
                selected={selectedCurr}
                setSelected={setSelectedCurr}
              />
              <SortSelect
                title="ფასი"
                data={price}
                selected={selectedPrice}
                setSelected={setSelectedPrice}
              />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col ">
          <div
            className={`w-full lg:px-12 px-6 py-7 grid lg:grid-cols-6 md600:grid-cols-3 md500:grid-cols-2 gap-4 items-center rounded-bl-[16px] rounded-br-[16px] `}
          >
            <SelectComp title="ბლოკი" placeholder="აირჩიეთ" />
            <SelectComp title="კატეგორია" placeholder="აირჩიეთ" />
            <SelectComp title="სტატუსი" placeholder="აირჩიეთ" />
            <div className="w-full flex flex-col gap-[6px]">
              <p className="text-[14px] font-medium">
                მ<sup>2</sup>
              </p>
              <div className="w-full grid grid-cols-2 gap-1">
                <Input placeholder={"დან"} />
                <Input placeholder={"მდე"} />
              </div>
            </div>
            <div className="w-full flex flex-col gap-[6px]">
              <p className="text-[14px] font-medium">ფასი</p>
              <div className="w-full grid grid-cols-2 gap-1">
                <Input placeholder={"დან"} />
                <Input placeholder={"მდე"} />
              </div>
            </div>
            <div className="w-full flex items-center justify-end gap-4 flex-col md500:flex-row">
              {dimension[0] > 500 ? (
                <VscSettings className="text-[28px]" />
              ) : (
                <div className="w-full rounded-[16px] bg-[#eee] py-[11px] flex items-center justify-center gap-2">
                  <VscSettings className="text-[28px]" />
                  <p className="text-[14px] font-medium">ფილტრი</p>
                </div>
              )}
              <Button
                title={"ძებნა"}
                onClick={() => {}}
                width={"md500:w-[110px] w-full"}
                height="h-[50px]"
                bgColor="bg-blue"
                color="text-white"
                icon={CiSearch}
                rounded="rounded-[16px]"
              />
            </div>
          </div>
          {!sort && (
            <div className="w-full flex flex-col gap-5 md600:max-h-[390px] max-h-[600px] overflow-y-auto filter lg:px-12 px-6 pb-5 relative">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <FilterCard key={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

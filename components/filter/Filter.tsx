"use client";

import { useState } from "react";
import SelectComp from "../input/SelectComp";
import Input from "../input/Input";
import Button from "../button/Button";

import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import ScreenSize from "@/hooks/ScreenSize";

export default function Filter() {
  const [selectedProjectId, setSelectedProjectId] = useState(1);

  const dimension = ScreenSize();

  const projects = [
    {
      id: 1,
      name: "აპექს ნუცუბიძე",
    },
    {
      id: 2,
      name: "აპექს დიდი დიღომი",
    },
    {
      id: 3,
      name: "აპექს ნუცუბიძე ||",
    },
  ];

  return (
    <div className="w-full xl1600:px-[250px] lg:px-[80px] sm:px-[64px] px-6">
      <div className="w-full rounded-[16px] shadow-dropDown bg-white">
        <div className="flex items-center gap-5 lg:px-12 px-6 pt-5 pb-3">
          {projects.map((item) => (
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
                {item.name}
              </p>
              <div
                className={`w-full h-[2px] ${
                  selectedProjectId == item.id ? "bg-blue" : "bg-trasparent"
                }`}
              ></div>
            </div>
          ))}
        </div>
        <div className="w-full lg:px-12 px-6 py-7 grid lg:grid-cols-6 md600:grid-cols-3 md500:grid-cols-2 gap-4 items-center shadow-dropDown rounded-bl-[16px] rounded-br-[16px]">
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
              <div className="w-full rounded-[16px] bg-[#eee] py-[11px] flex items-center justify-center">
                <VscSettings className="text-[28px]" />
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
      </div>
    </div>
  );
}

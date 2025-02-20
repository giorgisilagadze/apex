"use client";

import { useState } from "react";
import SelectComp from "../input/SelectComp";
import Input from "../input/Input";
import Button from "../button/Button";

import { CiSearch } from "react-icons/ci";

export default function Filter() {
  const [selectedProjectId, setSelectedProjectId] = useState(1);
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
    <div className="w-full px-[330px]">
      <div className="w-full rounded-[16px] shadow-dropDown bg-white">
        <div className="flex items-center gap-5 px-12 pt-5 pb-3">
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
        <div className="w-full px-12 py-7 grid grid-cols-6 gap-4 items-center shadow-dropDown rounded-bl-[16px] rounded-br-[16px]">
          <SelectComp title="ბლოკი" placeholder="აირჩიეთ ბლოკი" />
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
          <div className="w-full flex justify-end">
            <Button
              title={"ძებნა"}
              onClick={() => {}}
              width={"w-[110px]"}
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

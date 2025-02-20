"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ProjectCard from "@/components/card/ProjectCard";
import Image from "next/image";
import { useState } from "react";

export default function News() {
  const [clickedType, setClickedType] = useState(1);
  const types = [
    {
      id: 1,
      title: "ყველა",
    },
    {
      id: 2,
      title: "პროექტები",
    },
    {
      id: 3,
      title: "ღონისძიებები",
    },
    {
      id: 4,
      title: "გამოფენები",
    },
  ];

  return (
    <div className="w-full ">
      <div className="w-full h-[400px] relative">
        <Image
          src={"/images/contact.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full px-[330px] absolute top-[50%] translate-y-[-50%] left-0 flex items-center justify-between">
          <h1 className="text-[60px] font-light text-white">სიახლეები</h1>
          <p className="text-[14px] text-white">მთავარი / სიახლეები</p>
        </div>
      </div>
      <div className="w-full mt-[100px] flex flex-col items-center gap-10">
        <div className="flex items-center gap-6">
          {types.map((item) => (
            <div
              className="flex flex-col items-center gap-[2px]"
              key={item.id}
              onClick={() => setClickedType(item.id)}
            >
              <p
                className={`text-[14px] font-light hover:opacity-50 duration-300 cursor-pointer ${
                  item.id == clickedType ? "text-blue" : "text-black"
                }`}
              >
                {item.title}
              </p>
              <div
                className={`w-[40px] h-[1px] ${
                  item.id == clickedType ? "bg-blue" : "bg-transparent"
                }`}
              ></div>
            </div>
          ))}
        </div>
        <PagePagination
          dataLength={60}
          itemsPerPage={9}
          both={false}
          currentPage={0}
          setCurrentPage={() => {}}
          onClick={() => {}}
        >
          <div className="w-full grid grid-cols-3 gap-x-5 gap-y-8 px-[330px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <ProjectCard key={item} />
            ))}
          </div>
        </PagePagination>
        <div className="mt-[60px] w-full">
          <SendEmail />
        </div>
      </div>
    </div>
  );
}

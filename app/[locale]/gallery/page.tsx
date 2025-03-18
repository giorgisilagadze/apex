"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ImagesComp from "@/components/gallery/ImagesComp";
import Image from "next/legacy/image";
import { useState } from "react";

export default function Gallery() {
  const [type, setType] = useState(1);

  const data = [
    {
      id: 1,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 2,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 3,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 4,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 5,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 6,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 7,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 8,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 9,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 10,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 11,
      src: "/images/apartment2.jpeg",
    },
    {
      id: 12,
      src: "/images/apartment2.jpeg",
    },
  ];

  return (
    <div className="w-full flex flex-col sm:gap-[100px] gap-[40px]">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/contact.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            გალერეა
          </h1>
          <p className="text-[14px] text-white sm:self-center">
            მთავარი / გალერეა
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center sm:gap-[60px] gap-10 xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6">
        <div className="w-[230px] h-[55px] rounded-[30px] bg-[rgba(217,217,217,1)] flex items-center justify-between relative">
          <div
            className={`absolute w-[50%] h-full duration-300 bg-blue rounded-[30px] ${
              type == 1 ? "left-0" : "left-[50%]"
            }`}
          ></div>
          <p
            className="text-[14px] text-white z-[1] cursor-pointer h-full w-full flex items-center justify-center"
            onClick={() => setType(1)}
          >
            ფოტო
          </p>
          <p
            className="text-[14px] text-white z-[1] cursor-pointer h-full w-full flex items-center justify-center"
            onClick={() => setType(2)}
          >
            ვიდეო
          </p>
        </div>
        <PagePagination
          dataLength={30}
          itemsPerPage={8}
          both={false}
          currentPage={0}
          setCurrentPage={() => {}}
          onClick={() => {}}
        >
          <div className="w-full flex flex-col gap-1">
            <ImagesComp data={data.slice(0, 6)} />
            <ImagesComp data={data.slice(6, data.length)} />
          </div>
        </PagePagination>
      </div>
      <SendEmail />
    </div>
  );
}

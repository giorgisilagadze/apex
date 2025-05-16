"use client";

import Image from "next/legacy/image";
import Input from "../input/Input";
import { IoMdPlay } from "react-icons/io";
import VideoItem from "../gallery/VideoItem";

export default function ROICalculator() {
  return (
    <div className="w-full shadow-dropDown relative">
      <div className="w-full flex items-center justify-center h-[68px] bg-blue rounded-tl-[15px] rounded-tr-[15px]">
        <p className="text-white">ROI კალკულატორი</p>
      </div>
      <div className="sm:p-10 p-6 grid lg:grid-cols-3 sm:grid-cols-2 gap-14 bg-white">
        <div className="w-full lg:col-span-2 grid lg:grid-cols-2 gap-5">
          <Input
            placeholder={"აპექს დიდი დიღომი"}
            title="პროექტი"
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={""}
          />
          <Input
            placeholder={"სტუდიო"}
            title="აპარტამენტის ტიპი:"
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={""}
          />
          <Input
            placeholder={"ყოველთვიური"}
            title="გაქირავების ტიპი:"
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={""}
          />
          <Input
            placeholder={"45"}
            title="მ2:"
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={""}
          />
          <Input
            placeholder={"1950$"}
            title="მ2-ის ფასი:"
            bgColor="bg-[rgba(242,242,242,1)]"
            onChange={() => {}}
            value={""}
          />
          <div className="w-full flex flex-col gap-[6px]">
            <p className="text-[14px] ">შედეგი:</p>
            <div>
              <p className="text-[12px]">ანაზღაურებადი პერიოდი: 8 წელი</p>
              <p className="text-[12px]">წმინდა შემოსავალი: 14 851 $</p>
              <p className="text-[12px]">ROI: 13%</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:h-full sm:h-[50%] h-[300px] relative flex items-center justify-center">
          {/* <Image
            src={"/images/single-project.jpeg"}
            alt="project"
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
          <div className="w-[70px] h-[70px] rounded-[50%] bg-white flex items-center justify-center z-[1]">
            <IoMdPlay className="text-[24px] ml-1" />
          </div> */}
          <VideoItem
            className="w-full h-full"
            item={{ url: "/images/video1.mp4", id: 1 }}
            isLocal={true}
          />
        </div>
      </div>
    </div>
  );
}

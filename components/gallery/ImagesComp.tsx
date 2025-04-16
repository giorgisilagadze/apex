"use client";

import Image from "next/legacy/image";
import { useRef, useState } from "react";
import { MdOutlineZoomIn } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import PopUpComp from "../popUp/PopUpComp";
import { FaPlay } from "react-icons/fa";
import VideoItem from "./VideoItem";

interface Props {
  data: GalleryItem[];
}

export default function ImagesComp({ data }: Props) {
  const [isClickedImage, setIsClickedImage] = useState(false);
  const [clickedImage, setClickedImage] = useState<GalleryItem>();

  const renderImageVideo = (item: GalleryItem, className: string) =>
    item.type == "photo" ? (
      <div className={`${className} relative group`} key={item.id}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
          alt="image"
          layout="fill"
          objectFit="cover"
          className="rounded-[10px]"
        />
        <div
          className="absolute top-0 left-0 w-full h-full rounded-[10px] bg-transparent group-hover:bg-[rgba(0,0,0,0.5)] duration-300 cursor-pointer flex items-center justify-center"
          onClick={() => {
            setIsClickedImage(true);
            setClickedImage(item);
          }}
        >
          <MdOutlineZoomIn className="text-[40px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    ) : (
      <VideoItem item={item} className={className} key={item.id} />
    );
  return (
    <>
      <div className="w-full grid sm:grid-cols-2 gap-1">
        {/* Left side layout */}
        <div className="w-full grid grid-cols-1 gap-1">
          {data[0] && renderImageVideo(data[0], "w-full aspect-[6/4]")}
          <div className="w-full grid grid-cols-2 gap-1">
            {data
              .slice(1, 3)
              .map((item, index) =>
                renderImageVideo(item, "w-full aspect-[5/4]")
              )}
          </div>
        </div>

        {/* Right side layout */}
        {data.length === 4 ? (
          <div className="w-full h-full relative">
            {renderImageVideo(data[3], "w-full sm:h-full aspect-[6/4]")}
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 gap-1">
            <div className="w-full grid grid-cols-2 gap-1">
              {data
                .slice(3, 5)
                .map((item, index) =>
                  renderImageVideo(item, "w-full aspect-[5/4]")
                )}
            </div>
            {data[5] && renderImageVideo(data[5], "w-full aspect-[6/4]")}
          </div>
        )}
      </div>
      <PopUpComp
        isPopUpVisible={isClickedImage}
        setIsPopUpVisible={setIsClickedImage}
        width={"xl:w-[50%] sm:w-[70%] md600:w-[80%] w-[90%]"}
      >
        <div className="w-full aspect-[6/4] relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${clickedImage?.url}`}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
          <div
            className="absolute top-5 right-5 sm:w-8 sm:h-8 w-6 h-6 rounded-[50%] bg-white flex items-center justify-center cursor-pointer hover:opacity-50 duration-300"
            onClick={() => setIsClickedImage(false)}
          >
            <RxCross2 className="text-[12px] sm:text-[16px]" />
          </div>
        </div>
      </PopUpComp>
    </>
  );
}

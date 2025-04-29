import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ImagesComp from "@/components/gallery/ImagesComp";
import { FetchGallery } from "@/serverside/FetchGallery";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  searchParams: {
    type?: string;
  };
}

export default async function Gallery({ searchParams }: any) {
  const type = searchParams.type === "video" ? "video" : "photo";
  const data: GalleryItem[] = await FetchGallery(type);

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
              type === "photo" ? "left-0" : "left-[50%]"
            }`}
          ></div>
          <Link
            href="?type=photo"
            className="text-[14px] text-white z-[1] cursor-pointer h-full w-full flex items-center justify-center"
          >
            ფოტო
          </Link>
          <Link
            href="?type=video"
            className="text-[14px] text-white z-[1] cursor-pointer h-full w-full flex items-center justify-center"
          >
            ვიდეო
          </Link>
        </div>
        <div className="w-full flex flex-col gap-1">
          <ImagesComp data={data.slice(0, 6)} />
          <ImagesComp data={data.slice(6, 12)} />
          <ImagesComp data={data.slice(12, data.length)} />
        </div>
      </div>
      <SendEmail />
    </div>
  );
}

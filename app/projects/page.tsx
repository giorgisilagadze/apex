"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ProjectCard1 from "@/components/card/ProjectCard1";
import Filter from "@/components/filter/Filter";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="w-full ">
      <div className="w-full h-[550px] relative">
        <Image src={"/images/projects.png"} alt="project-image" layout="fill" />
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blueOpacity to-transparent"></div>
        <div className="w-full px-[330px] absolute top-[50%] translate-y-[-50%] left-0 flex items-center justify-between">
          <h1 className="text-[60px] font-light text-white">პროექტები</h1>
          <p className="text-[14px] text-white">მთავარი / პროექტები</p>
        </div>
        <div className="absolute left-0 bottom-[-100px]">
          <Filter />
        </div>
      </div>
      <div className="w-full px-[330px] pt-[200px] flex flex-col gap-[40px] items-center">
        <PagePagination
          dataLength={50}
          itemsPerPage={6}
          both={false}
          currentPage={0}
          setCurrentPage={() => {}}
          onClick={() => {}}
        >
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <ProjectCard1 key={item} />
            ))}
          </div>
        </PagePagination>
      </div>
      <div className="mt-[80px]">
        <SendEmail />
      </div>
    </div>
  );
}

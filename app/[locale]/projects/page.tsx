"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ProjectCard1 from "@/components/card/ProjectCard1";
import Filter from "@/components/filter/Filter";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="w-full ">
      <div className="w-full sm:h-[550px] h-[450px] relative">
        <Image
          src={"/images/projects.png"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blueOpacity to-transparent"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            პროექტები
          </h1>
          <p className="text-[14px] text-white self-end sm:self-center">
            მთავარი / პროექტები
          </p>
        </div>
        <div className="absolute left-0 md600:bottom-[-100px] md500:bottom-[-200px] bottom-[-500px]">
          <Filter />
        </div>
      </div>
      <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 md600:pt-[200px] md500:pt-[300px] pt-[600px] flex flex-col gap-[40px] items-center">
        <PagePagination
          dataLength={50}
          itemsPerPage={6}
          both={false}
          currentPage={0}
          setCurrentPage={() => {}}
          onClick={() => {}}
        >
          <div className="w-full grid sm:grid-cols-2 gap-x-4 gap-y-6">
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

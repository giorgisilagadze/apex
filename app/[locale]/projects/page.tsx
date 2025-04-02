"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ProjectCard1 from "@/components/card/ProjectCard1";
import Filter from "@/components/filter/Filter";
import axios from "axios";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<Building[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/building`
        );
        const data = response.data;
        setProjects(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="w-full ">
      <div className="w-full sm:h-[550px] h-[450px] relative">
        <Image
          src={"/images/projects.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blueOpacity to-transparent"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            პროექტები
          </h1>
          <p className="text-[14px] text-white sm:self-center">
            მთავარი / პროექტები
          </p>
        </div>
      </div>
      <div className="md600:mt-[-100px] md500:mt-[-150px] mt-[-100px]">
        <Filter page="allProjects" />
      </div>
      <div className="w-full xl1600:px-[250px] lg:px-[80px] sm:px-[64px] px-6 md600:pt-[100px] pt-[60px] flex flex-col gap-[40px] items-center">
        <PagePagination
          dataLength={50}
          itemsPerPage={6}
          both={false}
          currentPage={0}
          setCurrentPage={() => {}}
          onClick={() => {}}
        >
          <div className="w-full grid sm:grid-cols-2 gap-x-4 gap-y-6">
            {projects?.map((item) => (
              <ProjectCard1 key={item.id} item={item} />
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

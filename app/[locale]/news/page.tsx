"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ProjectCard from "@/components/card/ProjectCard";
import Shimmer from "@/components/shimmer/Shimmer";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/legacy/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function News() {
  const [news, setNews] = useState<{ data: NewsItem[]; total: number } | null>(
    null
  );
  const [clickedType, setClickedType] = useState("ყველა");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations("NewsPage");

  const types = [
    {
      id: 1,
      title: "ყველა",
    },
    {
      id: 2,
      title: "პროექტი",
    },
    {
      id: 3,
      title: "ღონისძიება",
    },
    {
      id: 4,
      title: "გამოფენა",
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = params.get("page");
    const type = params.get("type");
    setCurrentPage(page ? parseInt(page) - 1 : 0);
    setClickedType(type ? type : "ყველა");
  }, []);

  useEffect(() => {
    if (typeof currentPage !== "undefined")
      (async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/news?page=${
              currentPage + 1
            }&per_page=12${
              clickedType !== "ყველა" ? `&type=${clickedType}` : ""
            }`
          );
          const data = response.data;
          setNews(data);
          const params = new URLSearchParams(searchParams);
          params.set("page", (currentPage + 1).toString());
          params.set("type", clickedType);
          replace(`${pathname}?${params}`, { scroll: false });
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
      })();
  }, [currentPage, clickedType]);

  return (
    <div className="w-full ">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/contact.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            {t("title")}
          </h1>
          <p className="text-[14px] text-white sm:self-center">{t("page")}</p>
        </div>
      </div>
      <div className="w-full sm:mt-[100px] mt-[40px] flex flex-col items-center gap-10">
        <div className="flex items-center md500:gap-6 gap-4">
          {!isLoading
            ? types.map((item) => (
                <div
                  className="flex flex-col items-center gap-[2px]"
                  key={item.id}
                  onClick={() => {
                    setClickedType(item.title);
                    setCurrentPage(0);
                  }}
                >
                  <p
                    className={`text-[16px] font-light hover:opacity-50 duration-300 cursor-pointer ${
                      item.title == clickedType ? "text-blue" : "text-black"
                    }`}
                  >
                    {t(item.title)}
                  </p>
                  <div
                    className={`w-[40px] h-[1px] ${
                      item.title == clickedType ? "bg-blue" : "bg-transparent"
                    }`}
                  ></div>
                </div>
              ))
            : [1, 2, 3, 4].map((item) => (
                <div
                  className="flex flex-col items-center gap-[2px]"
                  key={item}
                >
                  <Shimmer
                    width="w-[60px]"
                    height="h-[21px]"
                    rounded="rounded-[5px]"
                  />
                  <Shimmer height="h-[1px]" rounded="rounded-[5px]" />
                </div>
              ))}
        </div>
        <PagePagination
          dataLength={news?.total as number}
          itemsPerPage={12}
          both={false}
          currentPage={currentPage as number}
          setCurrentPage={setCurrentPage}
        >
          <div className="w-full grid lg1250:grid-cols-3 md600:grid-cols-2 gap-x-5 gap-y-8 xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6">
            {!isLoading ? (
              news && news.data.length !== 0 ? (
                news.data?.map((item: NewsItem) => (
                  <ProjectCard key={item.id} item={item} />
                ))
              ) : (
                <div className="w-full lg1250:col-span-3 md600:col-span-2 h-[300px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5 rounded-[10px]">
                  <CiSearch className="text-[24px]" />
                  <p>{t("nodata")}</p>
                </div>
              )
            ) : (
              [1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="w-full flex flex-col gap-4">
                  <Shimmer
                    height="xl:h-[350px] lg1250:h-[300px] lg:h-[350px] md600:h-[300px] h-[350px]"
                    rounded="rounded-[10px]"
                  />
                  <div className="w-full flex flex-col gap-1">
                    <Shimmer
                      width="w-[100px]"
                      height="h-[21px]"
                      rounded="rounded-[5px]"
                    />
                    <Shimmer height="h-[30px]" rounded="rounded-[5px]" />
                    <Shimmer
                      width="w-[100px]"
                      height="h-[21px]"
                      rounded="rounded-[5px]"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </PagePagination>
        <div className="mt-[60px] w-full">
          <SendEmail />
        </div>
      </div>
    </div>
  );
}

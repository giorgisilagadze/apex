"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import ProjectCard from "@/components/card/ProjectCard";
import Shimmer from "@/components/shimmer/Shimmer";
import ScreenSize from "@/hooks/ScreenSize";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
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
  const [isTypeLoading, setIsTypeLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations("NewsPage");
  const locale = useLocale();

  const dimencion = ScreenSize();

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
    setIsTypeLoading(true);
    const params = new URLSearchParams(searchParams);
    const page = params.get("page");
    const type = params.get("type");
    setCurrentPage(page ? parseInt(page) - 1 : 0);
    setClickedType(type ? type : "ყველა");
    setIsTypeLoading(false);
  }, []);

  useEffect(() => {
    if (typeof currentPage !== "undefined")
      (async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/news?page=${
              currentPage + 1
            }&per_page=10${
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
          src={"/images/news.png"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute md500:top-[50%] md500:translate-y-[-50%] top-[60%] translate-y-[-60%] left-0 flex flex-col gap-4">
          <div className="w-full flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
            <h1 className="lg:text-[60px] text-[40px] font-light text-white">
              {t("title")}
            </h1>
            <p className="text-[14px] text-white sm:self-center">{t("page")}</p>
          </div>
          <div className="flex items-center gap-2 ">
            {!isTypeLoading ? (
              types.map((item) => (
                <div
                  className={`rounded-[30px] md500:px-3 md500:py-2 px-2 py-1 ${
                    item.title == clickedType && "bg-blue"
                  }`}
                  key={item.id}
                  onClick={() => {
                    setClickedType(item.title);
                    setCurrentPage(0);
                  }}
                >
                  <p
                    className={`md500:text-[14px] text-[12px] font-light hover:opacity-50 duration-300 cursor-pointer text-white ${
                      item.title == clickedType ? "text-blue" : "text-white"
                    }`}
                  >
                    {t(item.title)}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-[2px]">
                <div
                  className={`${
                    locale == "en" ? "w-[40.2px]" : "w-[70.44px]"
                  } w-[90px] h-[37px] bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] rounded-[30px]`}
                ></div>
                <div
                  className={`${
                    locale == "en" ? "w-[68.19px]" : "w-[88.77px]"
                  } w-[90px] h-[37px] bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] rounded-[30px]`}
                ></div>
                <div
                  className={`${
                    locale == "en" ? "w-[58.61px]" : "w-[113.25px]"
                  } w-[90px] h-[37px] bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] rounded-[30px]`}
                ></div>
                <div
                  className={`${
                    locale == "en" ? "w-[87.14px]" : "w-[95.59px]"
                  } w-[90px] h-[37px] bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] rounded-[30px]`}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full sm:mt-[100px] mt-[40px] flex flex-col items-center gap-10">
        <PagePagination
          dataLength={news?.total as number}
          itemsPerPage={12}
          both={false}
          currentPage={currentPage as number}
          setCurrentPage={setCurrentPage}
        >
          <div className="w-full xl1600:px-[140px] lg1250:px-[100px] lg:px-[100px] sm:px-[64px] px-6">
            {!isLoading ? (
              news && news.data.length !== 0 ? (
                <div className="w-full flex flex-col gap-5">
                  {dimencion[0] > 1110 ? (
                    <div className="w-full grid lg1110:grid-cols-3 grid-cols-2 h-[584px] gap-5">
                      {news.data[0] && (
                        <ProjectCard
                          key={news.data[0].id}
                          item={news.data[0]}
                          isWhite={true}
                          height="lg1110:h-[584px] h-[400px]"
                          isSingle={true}
                        />
                      )}
                      <div className="w-full h-full lg1110:col-span-2 grid lg1110:grid-cols-2 lg1110:grid-rows-2 gap-x-5 lg1110:row-span-2">
                        {news.data?.slice(1, 4).map((item, index) => (
                          <ProjectCard
                            item={item}
                            isWhite={true}
                            height="lg1110:h-[282px] h-[400px]"
                            key={item.id}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full grid md600:grid-cols-2 gap-5">
                      {news.data?.slice(0, 4).map((item, index) => (
                        <ProjectCard
                          item={item}
                          isWhite={true}
                          height="md500:h-[400px] h-[350px]"
                        />
                      ))}
                    </div>
                  )}
                  {dimencion[0] > 1110 ? (
                    <div className="w-full grid lg1110:grid-cols-3 grid-cols-2 h-[584px] gap-5">
                      {news.data[5] && (
                        <ProjectCard
                          key={news.data[5].id}
                          item={news.data[5]}
                          isWhite={true}
                          height="lg1110:h-[584px] h-[400px]"
                          isSingle={true}
                        />
                      )}
                      <div className="w-full h-full lg1110:col-span-2 grid lg1110:grid-cols-2 lg1110:grid-rows-2 gap-x-5 lg1110:row-span-2">
                        {news.data?.slice(6, 9).map((item, index) => (
                          <ProjectCard
                            item={item}
                            isWhite={true}
                            height="lg1110:h-[282px] h-[400px]"
                            key={item.id}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full grid md600:grid-cols-2 gap-5">
                      {news.data?.slice(5, 9).map((item, index) => (
                        <ProjectCard
                          item={item}
                          isWhite={true}
                          height="md500:h-[400px] h-[350px]"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full lg1250:col-span-3 md600:col-span-2 h-[300px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5 rounded-[10px]">
                  <CiSearch className="text-[24px]" />
                  <p>{t("nodata")}</p>
                </div>
              )
            ) : (
              <div className="w-full flex flex-col gap-5">
                <div className="w-full grid lg1110:grid-cols-3 grid-cols-2 h-[584px] gap-5">
                  <Shimmer
                    height="lg1110:h-[584px] h-[400px]"
                    rounded="rounded-[10px]"
                  />
                  <div className="w-full h-full lg1110:col-span-2 grid lg1110:grid-cols-2 lg1110:grid-rows-2 gap-x-5 lg1110:row-span-2">
                    {[1, 2, 3, 4].map((item) => (
                      <Shimmer
                        height="lg1110:h-[282px] h-[400px]"
                        rounded="rounded-[10px]"
                        key={item}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full grid lg1110:grid-cols-3 grid-cols-2 h-[584px] gap-5">
                  <Shimmer
                    height="lg1110:h-[584px] h-[400px]"
                    rounded="rounded-[10px]"
                  />
                  <div className="w-full h-full lg1110:col-span-2 grid lg1110:grid-cols-2 lg1110:grid-rows-2 gap-x-5 lg1110:row-span-2">
                    {[1, 2, 3, 4].map((item) => (
                      <Shimmer
                        height="lg1110:h-[282px] h-[400px]"
                        rounded="rounded-[10px]"
                        key={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
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

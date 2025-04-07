"use client";

import NewsCard from "@/components/admin/news/newsCard";
import Button from "@/components/button/Button";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function News() {
  const route = useRouter();
  const locale = useLocale();
  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 items-center">
      <div className="w-full flex items-center justify-between">
        <h1 className="sm:text-[28px] text-[20px] text-mainColor self-start">
          სიახლეები
        </h1>
        <Button
          title="სიახლის დამატება"
          onClick={() => route.push(`/${locale}/admin/adminPanel/add-news`)}
          width={"w-[200px]"}
          bgColor="bg-blue"
        />
      </div>

      <div className="w-full overflow-x-auto topFilter">
        <div className="xl:w-full w-[1190px] flex flex-col">
          <div className="w-full grid grid-cols-4 gap-5 bg-[#eee] py-4 px-6 rounded-[5px]">
            <p className="text-[14px] font-medium">ფოტო</p>
            <p className="text-[14px] font-medium">სათაური</p>
            <p className="text-[14px] font-medium">თარიღი</p>
            <p className="text-[14px] font-medium">მოქმედება</p>
          </div>
          {[1, 2, 3, 4].map((item) => (
            <NewsCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

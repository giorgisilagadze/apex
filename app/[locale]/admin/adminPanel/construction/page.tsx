"use client";

import ConstructionCard from "@/components/admin/construction/ConstuctionCard";
import NewsCard from "@/components/admin/news/newsCard";
import PartnerCard from "@/components/admin/partners/PartnerCard";
import Button from "@/components/button/Button";
import Shimmer from "@/components/shimmer/Shimmer";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Construction() {
  const [constructions, setConstructions] = useState<Construction[]>();
  const [forRender, setForRender] = useState(1);

  const route = useRouter();
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosAdmin.get("/construction");
        const data = response.data;
        setConstructions(data);
      } catch (err) {}
    })();
  }, [forRender]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 items-center">
      <div className="w-full flex flex-col md600:flex-row items-end md600:items-center gap-4 justify-between">
        <h1 className="sm:text-[28px] text-[20px] text-mainColor self-start">
          მშენებლობა
        </h1>
        <Button
          title="მშენებლობის დამატება"
          onClick={() =>
            route.push(`/${locale}/admin/adminPanel/add-construction`)
          }
          width={"w-[200px]"}
          bgColor="bg-blue"
        />
      </div>

      <div className="w-full overflow-x-auto topFilter">
        <div className="xl:w-full w-[1190px] flex flex-col">
          <div className="w-full grid grid-cols-4 gap-5 bg-[#eee] py-4 px-6 rounded-[5px]">
            <p className="text-[14px] font-medium">ფოტო</p>
            <p className="text-[14px] font-medium">სახელი</p>
            <p className="text-[14px] font-medium">თარიღი</p>
            <p className="text-[14px] font-medium">მოქმედება</p>
          </div>
          {constructions ? (
            constructions.length != 0 ? (
              constructions.map((item: Construction) => (
                <ConstructionCard
                  key={item.id}
                  item={item}
                  forRender={forRender}
                  setForRender={setForRender}
                />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5">
                <CiSearch className="text-[24px]" />
                <p>მშენებლობები არ მოიძებნა</p>
              </div>
            )
          ) : (
            [1, 2, 3, 4, 5].map((item) => (
              <div className="w-full mt-5" key={item}>
                <Shimmer height="h-[135px]" rounded="rounded-[5px]" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

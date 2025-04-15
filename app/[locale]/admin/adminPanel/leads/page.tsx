"use client";

import LeadCard from "@/components/admin/leads/LeadCard";
import Shimmer from "@/components/shimmer/Shimmer";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>();
  const [forRender, setForRender] = useState(1);

  // const route = useRouter();
  // const locale = useLocale();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosAdmin.get("/lead");
        const data = response.data;
        setLeads(data);
      } catch (err) {}
    })();
  }, [forRender]);
  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 items-center">
      <div className="w-full flex items-center justify-between">
        <h1 className="sm:text-[28px] text-[20px] text-mainColor self-start">
          ლიდები
        </h1>
      </div>

      <div className="w-full overflow-x-auto topFilter">
        <div className="xl:w-full w-[1190px] flex flex-col">
          <div className="w-full grid grid-cols-6 gap-5 bg-[#eee] py-4 px-6 rounded-[5px]">
            <p className="text-[14px] font-medium">სახელი</p>
            <p className="text-[14px] font-medium">ტელ. ნომერი</p>
            <p className="text-[14px] font-medium">ელ. ფოსტა</p>
            <p className="text-[14px] font-medium">პროექტი</p>
            <p className="text-[14px] font-medium">სტატუსი</p>
            <p className="text-[14px] font-medium">თარიღი</p>
          </div>
          {leads ? (
            leads.length != 0 ? (
              leads?.map((item: Lead) => (
                <LeadCard
                  key={item.id}
                  item={item}
                  forRender={forRender}
                  setForRender={setForRender}
                />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5">
                <CiSearch className="text-[24px]" />
                <p>ლიდები არ მოიძებნა</p>
              </div>
            )
          ) : (
            [1, 2, 3, 4, 5].map((item) => (
              <div className="w-full mt-4" key={item}>
                <Shimmer height="h-[158px]" rounded="rounded-[5px]" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

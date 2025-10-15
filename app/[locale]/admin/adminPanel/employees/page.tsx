"use client";

import EmployeeCard from "@/components/admin/employees/EmployeeCard";
import NewsCard from "@/components/admin/news/newsCard";
import Button from "@/components/button/Button";
import Shimmer from "@/components/shimmer/Shimmer";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Employees() {
  const [employees, setEmployees] = useState<EmployeeProfile[]>();
  const [forRender, setForRender] = useState(1);

  const route = useRouter();
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosAdmin.get("/employ");
        const data = response.data;
        setEmployees(data);
      } catch (err) {}
    })();
  }, [forRender]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 items-center">
      <div className="w-full flex flex-col md600:flex-row items-end md600:items-center gap-4 justify-between">
        <h1 className="sm:text-[28px] text-[20px] text-mainColor self-start">
          თანამშრომლები
        </h1>
        <Button
          title="თანამშრომლის დამატება"
          onClick={() => route.push(`/${locale}/admin/adminPanel/add-employee`)}
          width={"w-[220px]"}
          bgColor="bg-blue"
        />
      </div>

      <div className="w-full overflow-x-auto topFilter">
        <div className="xl:w-full w-[1190px] flex flex-col">
          <div className="w-full grid grid-cols-4 gap-5 bg-[#eee] py-4 px-6 rounded-[5px]">
            <p className="text-[14px] font-medium">ფოტო</p>
            <p className="text-[14px] font-medium">სახელი</p>
            <p className="text-[14px] font-medium">პოზიცია</p>
            <p className="text-[14px] font-medium">მოქმედება</p>
          </div>
          {employees ? (
            employees.length != 0 ? (
              employees?.map((item: EmployeeProfile) => (
                <EmployeeCard
                  key={item.id}
                  item={item}
                  forRender={forRender}
                  setForRender={setForRender}
                />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5">
                <CiSearch className="text-[24px]" />
                <p>თანამშრომლები არ მოიძებნა</p>
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

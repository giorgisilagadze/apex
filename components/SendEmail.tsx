"use client";

import { useState } from "react";
import Button from "./button/Button";
import useApexAdmin from "@/utils/ApexAdmin";
import axios from "axios";
import { useTranslations } from "next-intl";

export default function SendEmail() {
  const { setToast } = useApexAdmin();

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("subscribtion");

  const handleSend = async () => {
    // if (!value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/))
    //   return setToast(true, t("error"), "error");
    // if (!isLoading) {
    //   setIsLoading(true);
    //   try {
    //     const response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_API_URL}/subscribe`,
    //       {
    //         mail: value,
    //       }
    //     );
    //     setValue("");
    //     setToast(true, t("success"), "success");
    //   } catch (err) {
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    setToast(true, t("success"), "success");
  };

  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[80px] py-10 bg-blueOpacityLight flex items-center justify-between flex-col gap-6 lg:flex-row">
      <div className="flex flex-col gap-1 items-center lg:items-start">
        <h1 className="sm:text-[26px] text-[20px] font-bold text-center lg:text-start">
          {t("title")}
        </h1>
        <p className="text-[14px] font-light text-center lg:text-start">
          {t("subtitle")}
        </p>
      </div>
      <div className="sm:w-[570px] w-full h-[70px] rounded-[120px] bg-[rgba(3,44,95,0.2)] py-3 pl-6 pr-3 flex items-center justify-between">
        <input
          type="text"
          className="border-none sm:w-[70%] w-[50%] md500:text-[14px] text-[12px] outline-none bg-transparent placeholder:text-black font-light"
          placeholder={t("email")}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          title={t("subscribe")}
          onClick={handleSend}
          width={"w-[130px]"}
          height="h-[48px]"
          bgColor="bg-lightBlue"
          rounded="rounded-[120px]"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

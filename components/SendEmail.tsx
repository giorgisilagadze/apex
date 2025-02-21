"use client";

import { useState } from "react";
import Button from "./button/Button";
import ScreenSize from "@/hooks/ScreenSize";

export default function SendEmail() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dimension = ScreenSize();

  const handleSend = () => {
    //   if (!value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/))
    //     return errorToast(s("validEmail"));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setValue("");
    }, 1000);
  };
  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[80px] py-10 bg-blueOpacityLight flex items-center justify-between flex-col gap-6 lg:flex-row">
      <div className="flex flex-col gap-1 items-center lg:items-start">
        <h1 className="sm:text-[26px] text-[20px] font-bold text-center lg:text-start">
          გამოიწერეთ სიახლეები
        </h1>
        <p className="text-[14px] font-light text-center lg:text-start">
          იყავი პირველი, გაიგე ყველა შენთვის საინტერესო სიახლე პირველმა!
        </p>
      </div>
      <div className="sm:w-[570px] w-full h-[70px] rounded-[120px] bg-[rgba(3,44,95,0.2)] py-3 pl-6 pr-3 flex items-center justify-between">
        <input
          type="text"
          className="border-none sm:w-[70%] w-[50%] text-[14px] outline-none bg-transparent placeholder:text-black font-light"
          placeholder={dimension[0] > 500 ? "ელექტრონული ფოსტა" : "ელ. ფოსტა"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          title={"გამოწერა"}
          onClick={() => {}}
          width={"w-[130px]"}
          height="h-[48px]"
          bgColor="bg-lightBlue"
          rounded="rounded-[120px]"
        />
      </div>
    </div>
  );
}

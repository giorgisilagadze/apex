"use client";

import { useState } from "react";
import Button from "./button/Button";

export default function SendEmail() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="w-full px-[330px] py-[80px] bg-blueOpacityLight flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-[26px] font-bold">გამოიწერეთ სიახლეები</h1>
        <p className="text-[14px] font-light">
          იყავი პირველი, გაიგე ყველა შენთვის საინტერესო სიახლე პირველმა!
        </p>
      </div>
      <div className="sm:w-[570px] w-full h-[70px] rounded-[120px] bg-[rgba(3,44,95,0.2)] py-3 pl-6 pr-3 flex items-center justify-between">
        <input
          type="text"
          className="border-none sm:w-[70%] w-[50%] text-[14px] outline-none bg-transparent placeholder:text-black font-light"
          placeholder={"ელექტრონული ფოსტა"}
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

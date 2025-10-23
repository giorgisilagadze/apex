"use client";

import { useState } from "react";
import { FaFacebookF, FaFacebookMessenger } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import Input from "./input/Input";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";
import Button from "./button/Button";
import { useTranslations } from "next-intl";
import axios from "axios";
import useApexAdmin from "@/utils/ApexAdmin";

export default function Call() {
  const { setToast } = useApexAdmin();
  const [isHovered, setIsHovered] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const t = useTranslations("bookCall");

  const onChange = (inputKey: string, value: string) => {
    setInfo({ ...info, [inputKey]: value });
  };

  const handleUpload = async () => {
    setIsSubmited(true);
    const hasEmptyField = Object.values(info).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField) return;

    if (!isLoading) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/lead`,
          {
            name: info.name,
            phone: info.phone,
          }
        );
        setInfo({ name: "", phone: "" });
        setIsSubmited(false);
        setIsHovered(false);
        setToast(true, t("success"), "success");
      } catch {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-[5] flex-col gap-[2px] w-[60px] items-end sm:flex hidden">
    
      <a
        className="w-[50px] h-[50px] hover:w-[60px] rounded-tl-[10px] rounded-bl-[10px] bg-black flex items-center justify-center cursor-pointer text-white hover:bg-white hover:text-black hover:shadow-dropDown duration-300"
        href={"http://m.me/apexd.ge"}
        target="_blank"
        aria-label="social icons"
      >
        <FaFacebookMessenger className="text-[18px] ml-[2px]" />
      </a>
      <div
        className={`w-[50px] h-[180px] bg-black rounded-tl-[10px] rounded-bl-[10px] py-3 flex items-center justify-center cursor-pointer duration-300 relative ${
          isHovered
            ? "left-[-50px] opacity-0 "
            : "left-0 opacity-100 pointer-events-auto"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center -rotate-90 gap-2">
          <IoMdCall className="text-[18px] text-white rotate-[45deg] mt-1" />
          <p className="text-[14px] text-white whitespace-nowrap">
            {t("title")}
          </p>
        </div>
      </div>
      <div
        className={`w-[280px] h-[300px] rounded-tl-[10px] rounded-bl-[10px] bg-white shadow-dropDown absolute duration-300 top-[54px] py-8 px-5 flex flex-col gap-6 items-center ${
          isHovered ? "right-0" : "right-[-280px]"
        }`}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="text-[18px] text-blue">{t("title")}</h1>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-[2px]">
            <Input
              placeholder={t("name")}
              inputKey="name"
              onChange={onChange}
              value={info.name}
              color={isSubmited && !info.name ? "text-[red]" : "text-white"}
            />
            {isSubmited && !info.name && (
              <p className="text-[10px] text-[red] ml-2">{t("enterName")}</p>
            )}
          </div>

          <div className="w-full flex flex-col gap-[2px]">
            <div className="w-full rounded-[10px] border border-blue px-3">
              <PhoneInput
                defaultCountry="GE"
                placeholder={t("phone")}
                value={info.phone}
                onChange={(value) => onChange("phone", value as string)}
              />
            </div>
            {isSubmited && !info.phone && (
              <p className="text-[10px] text-[red] ml-2">{t("enterPhone")}</p>
            )}
          </div>
          <Button
            title={t("send")}
            onClick={handleUpload}
            width={"w-full"}
            bgColor="bg-blue"
            height="h-[44px]"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

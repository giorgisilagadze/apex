"use client";

import { MdKeyboardArrowDown } from "react-icons/md";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";

interface Props {
  isLangClicked: boolean;
  setIsLangCLicked: (isLangClicked: boolean) => void;
}

export default function Language({ isLangClicked, setIsLangCLicked }: Props) {
  const pathName = usePathname();
  const [language, setLanguage] = useState<string>("GE");
  const LanguageRef = useRef<HTMLDivElement>(null);
  const route = useRouter();
  const searchParams = useSearchParams();

  useClickOutside(LanguageRef, () => setIsLangCLicked(false));

  const data = [
    {
      id: 1,
      value: "GE",
      text: "Georgian",
      switch: "ge",
    },
    {
      id: 2,
      value: "EN",
      text: "English",
      switch: "en",
    },
  ];

  const handleChangeLang = (language: string) => {
    const splited = pathName.split("/");
    splited[1] = language;
    route.push(`${splited.join("/")}?${searchParams}`);
  };

  useEffect(() => {
    const splited = pathName.split("/");
    if (splited[1] == "ge") setLanguage("GE");
    else if (splited[1] == "en") setLanguage("EN");
    else setLanguage("RU");
  }, []);

  return (
    <div
      ref={LanguageRef}
      className="relative cursor-pointer hover:shadow-product duration-200 rounded-[30px] select-none w-[45px]"
    >
      <div
        className="flex items-center gap-1 lg:py-[8px] py-[6px] rounded-[30px] hover:opacity-50 duration-300 lg1110:text-white text-black"
        onMouseDown={() => setIsLangCLicked(!isLangClicked)}
      >
        <p className={`cursor-pointer lg1110:text-[14px] text[16px]`}>
          {language}
        </p>
        <MdKeyboardArrowDown
          className={`${
            isLangClicked && "rotate-180"
          } duration-200 text-[12px] lg:text-[14px] xl:text-[16px`}
        />
      </div>
      <div
        className={`${
          isLangClicked
            ? "opacity-100 pointer-events-auto lg:top-[45px] top-8"
            : "opacity-0 pointer-events-none lg:top-[53px] top-10"
        } duration-300 lg:py-3 px-3 py-2 flex flex-col gap-1 z-[3] absolute bg-white w-[90px] shadow-dropDown rounded-[10px]`}
      >
        {data.map((item) => (
          <p
            onMouseDown={() => {
              setLanguage(item.value);
              handleChangeLang(item.switch);
            }}
            className="cursor-pointer text-[14px] hover:opacity-50 duration-300"
            key={item.id}
          >
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
}

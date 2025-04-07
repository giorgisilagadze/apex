"use client";

import TextEditor from "@/components/admin/TextEditor";
import Input from "@/components/input/Input";
import { useState } from "react";

export default function AddNews() {
  const [news, setNews] = useState({
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });

  const handleOnChange = (key: string, value: string) => {
    setNews({ ...news, [key]: value });
  };

  console.log(news);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        სიახლის დამატება
      </h1>
      <div className="flex flex-col gap-5 w-[70%]">
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={news.titleGeo}
          title="სათაური ქართულად"
          inputKey="titleGeo"
        />
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={news.titleEng}
          title="სათაური ინგლისურად"
          inputKey="titleEng"
        />
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={news.titleRus}
          title="სათაური რუსულად"
          inputKey="titleRus"
        />
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა ქართულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionGeo"}
            value={news.descriptionGeo}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა ინგლისურად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionEng"}
            value={news.descriptionEng}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა რუსულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionRus"}
            value={news.descriptionRus}
          />
        </div>
      </div>
    </div>
  );
}

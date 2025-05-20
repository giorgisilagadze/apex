"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import SelectComp from "@/components/input/SelectComp";
import useApexAdmin from "@/utils/ApexAdmin";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useEffect, useState } from "react";

export default function AddNews() {
  const { setToast } = useApexAdmin();
  const [news, setNews] = useState({
    type: "",
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });
  const [newsImage, setNewsImage] = useState([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleOnChange = (key: string, value: string) => {
    setNews({ ...news, [key]: value });
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const hasEmptyField = Object.values(news).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField || newsImage.length == 0) {
      return setToast(true, "შეავსეთ ყველა ველი", "error");
    }
    if (!isUploadLoading) {
      setIsUploadLoading(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("type", news.type);
      formData.append("title", news.titleGeo);
      formData.append("title_en", news.titleEng);
      formData.append("title_ru", news.titleRus);
      formData.append("text", news.descriptionGeo);
      formData.append("text_en", news.descriptionEng);
      formData.append("text_ru", news.descriptionRus);
      try {
        const response = await axiosAdmin.post("/news", formData);
        setToast(true, "სიახლე წარმატებით აიტვირთა", "success");
        setNews({
          type: "",
          titleGeo: "",
          titleEng: "",
          titleRus: "",
          descriptionGeo: "",
          descriptionEng: "",
          descriptionRus: "",
        });
        setNewsImage([]);
        setHasUploaded(true);
      } catch (err) {
        setToast(true, "დაფიქსირდა შეცდომა", "error");
      } finally {
        setIsUploadLoading(false);
      }
    }
  };

  useEffect(() => {
    const hasOneValue = Object.values(news).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || newsImage.length != 0) {
      setHasUploaded(false);
    }
  }, [news, newsImage]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        სიახლის დამატება
      </h1>
      <form
        className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
        onSubmit={handleUpload}
      >
        <SelectComp
          placeholder={"აირჩიეთ ტიპი"}
          filterKey={"type"}
          selectedValues={news}
          title="სიახლის ტიპი"
          data={["პროექტი", "ღონისძიება", "გამოფენა"]}
          onClick={handleOnChange}
        />
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
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა ინგლისურად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionEng"}
            value={news.descriptionEng}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა რუსულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionRus"}
            value={news.descriptionRus}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">სიახლის ფოტო</p>
          <PhotoUpload name="image" image={newsImage} setImage={setNewsImage} />
        </div>
        <div className="w-full flex justify-end">
          <Button
            title={"დამატება"}
            onClick={() => {}}
            width={"w-[200px]"}
            type="submit"
            bgColor="bg-blue"
            isLoading={isUploadLoading}
          />
        </div>
      </form>
    </div>
  );
}

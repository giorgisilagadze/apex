"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import SelectComp from "@/components/input/SelectComp";
import Shimmer from "@/components/shimmer/Shimmer";
import useApexAdmin from "@/utils/ApexAdmin";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleAdminNews() {
  const params = useParams();

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
  const [newsUpdate, setNewsUpdate] = useState({
    type: "",
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });
  const [newsImage, setNewsImage] = useState([]);
  const [backImage, setBackImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [forRender, setForRender] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axiosAdmin.get(`/news/${params.adminNewsId}`);
        const data = response.data;
        setNews({
          ...news,
          type: data.type,
          titleGeo: data.title,
          titleEng: data.title_en,
          titleRus: data.title_ru,
          descriptionGeo: data.text,
          descriptionEng: data.text_en,
          descriptionRus: data.text_ru,
        });
        setNewsUpdate({
          ...newsUpdate,
          type: data.type,
          titleGeo: data.title,
          titleEng: data.title_en,
          titleRus: data.title_ru,
          descriptionGeo: data.text,
          descriptionEng: data.text_en,
          descriptionRus: data.text_ru,
        });
        setBackImage(data.img);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [forRender]);

  const handleOnChange = (key: string, value: string) => {
    setNewsUpdate({ ...newsUpdate, [key]: value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const isinputValuesChange = Object.keys(news).some(
      (key) =>
        newsUpdate[key as keyof typeof newsUpdate] !==
        news[key as keyof typeof news]
    );
    if (isinputValuesChange || newsImage.length !== 0) {
      const hasEmptyField = Object.values(newsUpdate).some(
        (value) => value.trim() === ""
      );

      if (hasEmptyField) {
        return setToast(true, "შეავსეთ ყველა ველი", "error");
      }
      if (!isUploadLoading) {
        setIsUploadLoading(true);
        const form = e.target;
        const formData = new FormData(form);

        formData.append("type", newsUpdate.type);
        formData.append("title", newsUpdate.titleGeo);
        formData.append("title_en", newsUpdate.titleEng);
        formData.append("title_ru", newsUpdate.titleRus);
        formData.append("text", newsUpdate.descriptionGeo);
        formData.append("text_en", newsUpdate.descriptionEng);
        formData.append("text_ru", newsUpdate.descriptionRus);
        formData.append("id", params.adminNewsId as string);
        try {
          const response = await axiosAdmin.put(
            `/news/${params.adminNewsId}`,
            formData
          );
          setToast(true, "სიახლე წარმატებით განახლდა", "success");
          setNewsImage([]);
          setHasUploaded(true);
          setForRender(forRender + 1);
        } catch (err) {
          setToast(true, "დაფიქსირდა შეცდომა", "error");
        } finally {
          setIsUploadLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    const hasOneValue = Object.values(newsUpdate).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || newsImage.length != 0) {
      setHasUploaded(false);
    }
  }, [newsUpdate, newsImage]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        სიახლე N{params.adminNewsId}
      </h1>
      {!isLoading ? (
        <form
          className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
          onSubmit={handleUpdate}
        >
          <SelectComp
            placeholder={"აირჩიეთ ტიპი"}
            filterKey={"type"}
            selectedValues={newsUpdate}
            title="სიახლის ტიპი"
            data={["პროექტი", "ღონისძიება", "გამოფენა"]}
            onClick={handleOnChange}
          />
          <Input
            placeholder={"სათაური"}
            onChange={handleOnChange}
            value={newsUpdate.titleGeo}
            title="სათაური ქართულად"
            inputKey="titleGeo"
          />
          <Input
            placeholder={"სათაური"}
            onChange={handleOnChange}
            value={newsUpdate.titleEng}
            title="სათაური ინგლისურად"
            inputKey="titleEng"
          />
          <Input
            placeholder={"სათაური"}
            onChange={handleOnChange}
            value={newsUpdate.titleRus}
            title="სათაური რუსულად"
            inputKey="titleRus"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა ქართულად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionGeo"}
              value={newsUpdate.descriptionGeo}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა ინგლისურად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionEng"}
              value={newsUpdate.descriptionEng}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა რუსულად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionRus"}
              value={newsUpdate.descriptionRus}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">სიახლის ფოტო</p>
            <PhotoUpload
              name="image"
              image={newsImage}
              setImage={setNewsImage}
              backImage={backImage}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              title={"განახლება"}
              onClick={() => {}}
              width={"w-[200px]"}
              type="submit"
              bgColor="bg-blue"
              isLoading={isUploadLoading}
            />
          </div>
        </form>
      ) : (
        <div className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full">
          <div className="w-full flex flex-col gap-[6px]">
            <Shimmer
              width="w-[100px]"
              height="h-[21px]"
              rounded="rounded-[10px]"
            />
            <Shimmer height="h-[44px]" rounded="rounded-[5px]" />
          </div>
          <div className="w-full flex flex-col gap-[6px]">
            <Shimmer
              width="w-[100px]"
              height="h-[21px]"
              rounded="rounded-[10px]"
            />
            <Shimmer height="h-[44px]" rounded="rounded-[5px]" />
          </div>
          <div className="w-full flex flex-col gap-[6px]">
            <Shimmer
              width="w-[100px]"
              height="h-[21px]"
              rounded="rounded-[10px]"
            />
            <Shimmer height="h-[44px]" rounded="rounded-[5px]" />
          </div>
          <div className="w-full flex flex-col gap-[6px]">
            <Shimmer
              width="w-[100px]"
              height="h-[21px]"
              rounded="rounded-[10px]"
            />
            <Shimmer height="h-[44px]" rounded="rounded-[5px]" />
          </div>
          <div className="w-full flex flex-col gap-[6px]">
            <Shimmer
              width="w-[100px]"
              height="h-[21px]"
              rounded="rounded-[10px]"
            />
            <Shimmer height="h-[197px]" rounded="rounded-[5px]" />
          </div>
          <div className="w-full flex flex-col gap-[6px]">
            <Shimmer
              width="w-[100px]"
              height="h-[21px]"
              rounded="rounded-[10px]"
            />
            <Shimmer height="h-[197px]" rounded="rounded-[5px]" />
          </div>
          <div className="w-full flex flex-col gap-[6px]">
            <Shimmer
              width="w-[100px]"
              height="h-[21px]"
              rounded="rounded-[10px]"
            />
            <Shimmer height="h-[197px]" rounded="rounded-[5px]" />
          </div>
          <div className="w-full flex flex-col gap-[6px]">
            <Shimmer
              width="w-[100px]"
              height="h-[21px]"
              rounded="rounded-[10px]"
            />
            <Shimmer
              width="w-[190px]"
              height="h-[170px]"
              rounded="rounded-[10px]"
            />
            <Shimmer
              width="w-[190px]"
              height="h-[170px]"
              rounded="rounded-[10px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

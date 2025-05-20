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

export default function SingleAdminPartner() {
  const params = useParams();

  const { setToast } = useApexAdmin();
  const [partner, setpartner] = useState({
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });
  const [partnerUpdate, setpartnerUpdate] = useState({
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });
  const [partnerImage, setpartnerImage] = useState([]);
  const [backImage, setBackImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [forRender, setForRender] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axiosAdmin.get(
          `/partner/${params.adminPartnerId}`
        );
        const data = response.data;
        setpartner({
          ...partner,
          titleGeo: data.title,
          titleEng: data.title_en,
          titleRus: data.title_ru,
          descriptionGeo: data.text,
          descriptionEng: data.text_en,
          descriptionRus: data.text_ru,
        });
        setpartnerUpdate({
          ...partnerUpdate,
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
    setpartnerUpdate({ ...partnerUpdate, [key]: value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const isinputValuesChange = Object.keys(partner).some(
      (key) =>
        partnerUpdate[key as keyof typeof partnerUpdate] !==
        partner[key as keyof typeof partner]
    );
    if (isinputValuesChange || partnerImage.length !== 0) {
      const hasEmptyField = Object.values(partnerUpdate).some(
        (value) => value.trim() === ""
      );

      if (hasEmptyField) {
        return setToast(true, "შეავსეთ ყველა ველი", "error");
      }
      if (!isUploadLoading) {
        setIsUploadLoading(true);
        const form = e.target;
        const formData = new FormData(form);

        formData.append("title", partnerUpdate.titleGeo);
        formData.append("title_en", partnerUpdate.titleEng);
        formData.append("title_ru", partnerUpdate.titleRus);
        formData.append("text", partnerUpdate.descriptionGeo);
        formData.append("text_en", partnerUpdate.descriptionEng);
        formData.append("text_ru", partnerUpdate.descriptionRus);
        formData.append("id", params.adminPartnerId as string);
        try {
          const response = await axiosAdmin.put(
            `/partner/${params.adminPartnerId}`,
            formData
          );
          setToast(true, "პარტნიორი წარმატებით განახლდა", "success");
          setpartnerImage([]);
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
    const hasOneValue = Object.values(partnerUpdate).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || partnerImage.length != 0) {
      setHasUploaded(false);
    }
  }, [partnerUpdate, partnerImage]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        პარტნიორი - {partner.titleGeo}
      </h1>
      {!isLoading ? (
        <form
          className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
          onSubmit={handleUpdate}
        >
          <Input
            placeholder={"სახელი"}
            onChange={handleOnChange}
            value={partnerUpdate.titleGeo}
            title="სახელი ქართულად"
            inputKey="titleGeo"
          />
          <Input
            placeholder={"სახელი"}
            onChange={handleOnChange}
            value={partnerUpdate.titleEng}
            title="სახელი ინგლისურად"
            inputKey="titleEng"
          />
          <Input
            placeholder={"სახელი"}
            onChange={handleOnChange}
            value={partnerUpdate.titleRus}
            title="სახელი რუსულად"
            inputKey="titleRus"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა ქართულად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionGeo"}
              value={partnerUpdate.descriptionGeo}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა ინგლისურად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionEng"}
              value={partnerUpdate.descriptionEng}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა რუსულად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionRus"}
              value={partnerUpdate.descriptionRus}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">სიახლის ფოტო</p>
            <PhotoUpload
              name="image"
              image={partnerImage}
              setImage={setpartnerImage}
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

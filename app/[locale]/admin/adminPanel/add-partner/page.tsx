"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import SelectComp from "@/components/input/SelectComp";
import useApexAdmin from "@/utils/ApexAdmin";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useEffect, useState } from "react";

export default function AddPartner() {
  const { setToast } = useApexAdmin();
  const [partner, setPartner] = useState({
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });
  const [partnerImage, setPartnerImage] = useState([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleOnChange = (key: string, value: string) => {
    setPartner({ ...partner, [key]: value });
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const hasEmptyField = Object.values(partner).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField || partnerImage.length == 0) {
      return setToast(true, "შეავსეთ ყველა ველი", "error");
    }
    if (!isUploadLoading) {
      setIsUploadLoading(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("title", partner.titleGeo);
      formData.append("title_en", partner.titleEng);
      formData.append("title_ru", partner.titleRus);
      formData.append("text", partner.descriptionGeo);
      formData.append("text_en", partner.descriptionEng);
      formData.append("text_ru", partner.descriptionRus);
      try {
        const response = await axiosAdmin.post("/partner", formData);
        setToast(true, "პარტნიორი წარმატებით აიტვირთა", "success");
        setPartner({
          titleGeo: "",
          titleEng: "",
          titleRus: "",
          descriptionGeo: "",
          descriptionEng: "",
          descriptionRus: "",
        });
        setPartnerImage([]);
        setHasUploaded(true);
      } catch (err) {
        setToast(true, "დაფიქსირდა შეცდომა", "error");
      } finally {
        setIsUploadLoading(false);
      }
    }
  };

  useEffect(() => {
    const hasOneValue = Object.values(partner).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || partnerImage.length != 0) {
      setHasUploaded(false);
    }
  }, [partner, partnerImage]);

  console.log(partner);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        პარტნიორის დამატება
      </h1>
      <form
        className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
        onSubmit={handleUpload}
      >
        <Input
          placeholder={"სახელი"}
          onChange={handleOnChange}
          value={partner.titleGeo}
          title="სახელი ქართულად"
          inputKey="titleGeo"
        />
        <Input
          placeholder={"სახელი"}
          onChange={handleOnChange}
          value={partner.titleEng}
          title="სახელი ინგლისურად"
          inputKey="titleEng"
        />
        <Input
          placeholder={"სახელი"}
          onChange={handleOnChange}
          value={partner.titleRus}
          title="სახელი რუსულად"
          inputKey="titleRus"
        />
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა ქართულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionGeo"}
            value={partner.descriptionGeo}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა ინგლისურად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionEng"}
            value={partner.descriptionEng}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა რუსულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionRus"}
            value={partner.descriptionRus}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პარნიორის ფოტო</p>
          <PhotoUpload
            name="image"
            image={partnerImage}
            setImage={setPartnerImage}
          />
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

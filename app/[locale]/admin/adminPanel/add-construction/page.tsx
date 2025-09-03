"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import SelectComp from "@/components/input/SelectComp";
import useApexAdmin from "@/utils/ApexAdmin";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useEffect, useState } from "react";

export default function AddConstruction() {
  const { setToast } = useApexAdmin();
  const [construction, setConstruction] = useState({
    cardTitleGeo: "",
    cardTitleEng: "",
    cardTitleRus: "",
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    firstDescriptionGeo: "",
    firstDescriptionEng: "",
    firstDescriptionRus: "",
    secondDescriptionGeo: "",
    secondDescriptionEng: "",
    secondDescriptionRus: "",
  });
  const [cardImage, setCardImage] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [bottomImage1, setBottomImage1] = useState([]);
  const [bottomImage2, setBottomImage2] = useState([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleOnChange = (key: string, value: string) => {
    setConstruction({ ...construction, [key]: value });
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const hasEmptyField = Object.values(construction).some(
      (value) => value.trim() === ""
    );

    if (
      hasEmptyField ||
      cardImage.length == 0 ||
      mainImage.length == 0 ||
      bottomImage1.length == 0 ||
      bottomImage2.length == 0
    ) {
      return setToast(true, "შეავსეთ ყველა ველი", "error");
    }
    if (!isUploadLoading) {
      setIsUploadLoading(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("title", construction.cardTitleGeo);
      formData.append("title_en", construction.cardTitleEng);
      formData.append("title_ru", construction.cardTitleRus);
      formData.append("text", construction.titleGeo);
      formData.append("text_en", construction.titleEng);
      formData.append("text_ru", construction.titleRus);
      formData.append("sub_text", construction.firstDescriptionGeo);
      formData.append("sub_text_en", construction.firstDescriptionEng);
      formData.append("sub_text_ru", construction.firstDescriptionRus);
      formData.append("sub_text1", construction.secondDescriptionGeo);
      formData.append("sub_text1_en", construction.secondDescriptionEng);
      formData.append("sub_text1_ru", construction.secondDescriptionRus);
      try {
        const response = await axiosAdmin.post("/construction", formData);
        setToast(true, "მშენებლობა წარმატებით აიტვირთა", "success");
        setConstruction({
          cardTitleGeo: "",
          cardTitleEng: "",
          cardTitleRus: "",
          titleGeo: "",
          titleEng: "",
          titleRus: "",
          firstDescriptionGeo: "",
          firstDescriptionEng: "",
          firstDescriptionRus: "",
          secondDescriptionGeo: "",
          secondDescriptionEng: "",
          secondDescriptionRus: "",
        });
        setCardImage([]);
        setMainImage([]);
        setBottomImage1([]);
        setBottomImage2([]);
        setHasUploaded(true);
      } catch (err) {
        setToast(true, "დაფიქსირდა შეცდომა", "error");
      } finally {
        setIsUploadLoading(false);
      }
    }
  };

  useEffect(() => {
    const hasOneValue = Object.values(construction).some(
      (value) => value.trim() !== ""
    );

    if (
      hasOneValue ||
      cardImage.length != 0 ||
      mainImage.length != 0 ||
      bottomImage1.length != 0 ||
      bottomImage2.length != 0
    ) {
      setHasUploaded(false);
    }
  }, [construction, cardImage, mainImage, bottomImage1, bottomImage2]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        მშენებლობის დამატება
      </h1>
      <form
        className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
        onSubmit={handleUpload}
      >
        {/* <SelectComp
          placeholder={"აირჩიეთ ტიპი"}
          filterKey={"type"}
          selectedValues={news}
          title="სიახლის ტიპი"
          data={["პროექტი", "ღონისძიება", "გამოფენა"]}
          onClick={handleOnChange}
        /> */}
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[14px]">ქარდის ფოტო</h1>
          <PhotoUpload name="image" image={cardImage} setImage={setCardImage} />
        </div>
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={construction.cardTitleGeo}
          title="ქარდის სათაური ქართულად"
          inputKey="cardTitleGeo"
        />
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={construction.cardTitleEng}
          title="ქარდის სათაური ინგლისურად"
          inputKey="cardTitleEng"
        />
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={construction.cardTitleRus}
          title="ქარდის სათაური რუსულად"
          inputKey="cardTitleRus"
        />
        <Input
          placeholder={"შიდა სათაური"}
          onChange={handleOnChange}
          value={construction.titleGeo}
          title="შიდა სათაური ქართულად"
          inputKey="titleGeo"
        />
        <Input
          placeholder={"შიდა სათაური"}
          onChange={handleOnChange}
          value={construction.titleEng}
          title="შიდა სათაური ინგლისურად"
          inputKey="titleEng"
        />
        <Input
          placeholder={"შიდა სათაური"}
          onChange={handleOnChange}
          value={construction.titleRus}
          title="შიდა სათაური რუსულად"
          inputKey="titleRus"
        />
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[14px]">შიდა მთავარი ფოტო</h1>
          <PhotoUpload
            name="image1"
            image={mainImage}
            setImage={setMainImage}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პირველი აღწერა ქართულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"firstDescriptionGeo"}
            value={construction.firstDescriptionGeo}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პირველი აღწერა ინგლისურად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"firstDescriptionEng"}
            value={construction.firstDescriptionEng}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პირველი აღწერა რუსულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"firstDescriptionRus"}
            value={construction.firstDescriptionRus}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[14px]">შიდა ქვედა ორი ფოტო</h1>
          <PhotoUpload
            name="image2"
            image={bottomImage1}
            setImage={setBottomImage1}
          />
          <PhotoUpload
            name="image3"
            image={bottomImage2}
            setImage={setBottomImage2}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">მეორე აღწერა ქართულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"secondDescriptionGeo"}
            value={construction.secondDescriptionGeo}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">მეორე აღწერა ინგლისურად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"secondDescriptionEng"}
            value={construction.secondDescriptionEng}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">მეორე აღწერა რუსულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"secondDescriptionRus"}
            value={construction.secondDescriptionRus}
            hasUploaded={hasUploaded}
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

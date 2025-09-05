"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import ConstructionNewsCard from "@/components/admin/construction/ConstructionNewsCard";
import ConstructionCard from "@/components/admin/construction/ConstuctionCard";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import SelectComp from "@/components/input/SelectComp";
import Shimmer from "@/components/shimmer/Shimmer";
import useApexAdmin from "@/utils/ApexAdmin";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SingleAdminConstruction() {
  const params = useParams();

  const { setToast } = useApexAdmin();
  const [forRender, setForRender] = useState(1);
  const [construction, setConstruction] = useState<Construction>();
  const [constructionNews, setConstructionNews] = useState({
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
  const [mainImage, setMainImage] = useState([]);
  const [bottomImage1, setBottomImage1] = useState([]);
  const [bottomImage2, setBottomImage2] = useState([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleOnChange = (key: string, value: string) => {
    setConstructionNews({ ...constructionNews, [key]: value });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosAdmin.get(
          `/construction/${params.adminConstructionId}?relation=1`
        );
        const data = response.data;
        setConstruction(data);
      } catch (err) {}
    })();
  }, [forRender]);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const hasEmptyField = Object.values(constructionNews).some(
      (value) => value.trim() === ""
    );

    if (
      hasEmptyField ||
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

      formData.append(
        "construction_id",
        params.adminConstructionId?.toString() as string
      );
      formData.append("text", constructionNews.titleGeo);
      formData.append("text_en", constructionNews.titleEng);
      formData.append("text_ru", constructionNews.titleRus);
      formData.append("sub_text", constructionNews.firstDescriptionGeo);
      formData.append("sub_text_en", constructionNews.firstDescriptionEng);
      formData.append("sub_text_ru", constructionNews.firstDescriptionRus);
      formData.append("sub_text1", constructionNews.secondDescriptionGeo);
      formData.append("sub_text1_en", constructionNews.secondDescriptionEng);
      formData.append("sub_text1_ru", constructionNews.secondDescriptionRus);
      try {
        const response = await axiosAdmin.post(`/constructionNews`, formData);
        setToast(true, "მშენებლობის სიახლე წარმატებით აიტვირთა", "success");
        setConstructionNews({
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
        setMainImage([]);
        setBottomImage1([]);
        setBottomImage2([]);
        setHasUploaded(true);
        setForRender(forRender + 1);
      } catch (err) {
        setToast(true, "დაფიქსირდა შეცდომა", "error");
      } finally {
        setIsUploadLoading(false);
      }
    }
  };

  useEffect(() => {
    const hasOneValue = Object.values(constructionNews).some(
      (value) => value.trim() !== ""
    );

    if (
      hasOneValue ||
      mainImage.length != 0 ||
      bottomImage1.length != 0 ||
      bottomImage2.length != 0
    ) {
      setHasUploaded(false);
    }
  }, [constructionNews, mainImage, bottomImage1, bottomImage2]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        მშენებლობა - {construction?.title}
      </h1>

      <div className="w-full overflow-x-auto topFilter">
        <div className="xl:w-full w-[1190px] flex flex-col">
          <div className="w-full grid grid-cols-4 gap-5 bg-[#eee] py-4 px-6 rounded-[5px]">
            <p className="text-[14px] font-medium">ფოტო</p>
            <p className="text-[14px] font-medium">სახელი</p>
            <p className="text-[14px] font-medium">თარიღი</p>
            <p className="text-[14px] font-medium">მოქმედება</p>
          </div>
          {construction ? (
            construction.news.length != 0 ? (
              construction.news.map((item) => (
                <ConstructionNewsCard
                  key={item.id}
                  item={item}
                  forRender={forRender}
                  setForRender={setForRender}
                />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5">
                <CiSearch className="text-[24px]" />
                <p>მშენებლობის ნიუსები არ მოიძებნა</p>
              </div>
            )
          ) : (
            [1, 2, 3, 4, 5].map((item) => (
              <div className="w-full mt-5" key={item}>
                <Shimmer height="h-[135px]" rounded="rounded-[5px]" />
              </div>
            ))
          )}
        </div>
      </div>
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        ახალი დეტალები
      </h1>
      <form
        className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
        onSubmit={handleUpload}
      >
        <Input
          placeholder={"შიდა სათაური"}
          onChange={handleOnChange}
          value={constructionNews.titleGeo}
          title="შიდა სათაური ქართულად"
          inputKey="titleGeo"
        />
        <Input
          placeholder={"შიდა სათაური"}
          onChange={handleOnChange}
          value={constructionNews.titleEng}
          title="შიდა სათაური ინგლისურად"
          inputKey="titleEng"
        />
        <Input
          placeholder={"შიდა სათაური"}
          onChange={handleOnChange}
          value={constructionNews.titleRus}
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
            value={constructionNews.firstDescriptionGeo}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პირველი აღწერა ინგლისურად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"firstDescriptionEng"}
            value={constructionNews.firstDescriptionEng}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პირველი აღწერა რუსულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"firstDescriptionRus"}
            value={constructionNews.firstDescriptionRus}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[14px]">შიდა ქვედა ორი ფოტო</h1>
          <PhotoUpload
            name="image2"
            image={bottomImage1}
            setImage={setBottomImage1}
            isMultiply={true}
          />
          <PhotoUpload
            name="image3"
            image={bottomImage2}
            setImage={setBottomImage2}
            isMultiply={true}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">მეორე აღწერა ქართულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"secondDescriptionGeo"}
            value={constructionNews.secondDescriptionGeo}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">მეორე აღწერა ინგლისურად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"secondDescriptionEng"}
            value={constructionNews.secondDescriptionEng}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">მეორე აღწერა რუსულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"secondDescriptionRus"}
            value={constructionNews.secondDescriptionRus}
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

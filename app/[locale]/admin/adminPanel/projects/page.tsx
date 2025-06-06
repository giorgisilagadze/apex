"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import SelectComp from "@/components/input/SelectComp";
import Shimmer from "@/components/shimmer/Shimmer";
import useApexAdmin from "@/utils/ApexAdmin";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Projects() {
  const { setToast } = useApexAdmin();
  const [projects, setProjects] = useState<Building[]>();
  const [forRender, setForRender] = useState(1);
  const [project, setProject] = useState({
    type: "",
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    floor: "",
    ijara: "",
    fullSale: "",
    halfSale: "",
    map: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });
  const [projectImage, setProjectImage] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const route = useRouter();
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosAdmin.get("/building");
        const data = response.data;
        setProjects(data);
      } catch (err) {}
    })();
  }, [forRender]);

  const handleOnChange = (key: string, value: string) => {
    setProject({ ...project, [key]: value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const hasEmptyField = Object.values(project).some(
      (value) => value.trim() === ""
    );

    if (
      hasEmptyField ||
      projectImage.length == 0 ||
      galleryImages.length == 0
    ) {
      return setToast(true, "შეავსეთ ყველა ველი", "error");
    }
    if (!isUploadLoading) {
      setIsUploadLoading(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("status", project.type);
      formData.append("name", project.titleGeo);
      formData.append("title", project.titleGeo);
      formData.append("title_en", project.titleEng);
      formData.append("title_ru", project.titleRus);
      formData.append("max_floor", project.floor);
      formData.append("ijara", project.ijara);
      formData.append("fullSale", project.fullSale);
      formData.append("halfSale", project.halfSale);
      formData.append("maping", project.map);
      formData.append("text", project.descriptionGeo);
      formData.append("text_en", project.descriptionEng);
      formData.append("text_ru", project.descriptionRus);
      try {
        const response = await axiosAdmin.post(`/building`, formData);
        setToast(true, "პროექტი წარმატებით აიტვირთა", "success");
        setProject({
          type: "",
          titleGeo: "",
          titleEng: "",
          titleRus: "",
          floor: "",
          ijara: "",
          fullSale: "",
          halfSale: "",
          map: "",
          descriptionGeo: "",
          descriptionEng: "",
          descriptionRus: "",
        });
        setProjectImage([]);
        setGalleryImages([]);
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
    const hasOneValue = Object.values(project).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || projectImage.length != 0) {
      setHasUploaded(false);
    }
  }, [project, projectImage]);

  console.log(project);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        პროექტის დამატება
      </h1>
      <form
        className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
        onSubmit={handleUpdate}
      >
        <SelectComp
          placeholder={"აირჩიეთ სტატუსი"}
          filterKey={"type"}
          selectedValues={project}
          title="პროექტის სტატუსი"
          data={["მიმდინარე", "დასრულებული"]}
          onClick={handleOnChange}
        />
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={project.titleGeo}
          title="სათაური ქართულად"
          inputKey="titleGeo"
        />
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={project.titleEng}
          title="სათაური ინგლისურად"
          inputKey="titleEng"
        />
        <Input
          placeholder={"სათაური"}
          onChange={handleOnChange}
          value={project.titleRus}
          title="სათაური რუსულად"
          inputKey="titleRus"
        />
        <Input
          placeholder={"სართული"}
          onChange={handleOnChange}
          value={project.floor}
          title="სართულების რაოდენობა"
          inputKey="floor"
        />
        <Input
          placeholder={"იჯარა"}
          onChange={handleOnChange}
          value={project.ijara}
          title="იჯარა"
          inputKey="ijara"
          type="number"
        />
        <Input
          placeholder={"სრული შენატანი"}
          onChange={handleOnChange}
          value={project.fullSale}
          title="სრული შენატანი"
          inputKey="fullSale"
          type="number"
        />
        <Input
          placeholder={"ნახევარი შენატანი"}
          onChange={handleOnChange}
          value={project.halfSale}
          title="ნახევარი შენატანი"
          inputKey="halfSale"
          type="number"
        />
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პროექტის მაპირება</p>
          <textarea
            className="resize-none w-full min-h-[150px] border border-blue bg-white rounded-[10px] outline-none p-3 font-light text-[14px]"
            placeholder="მაპირება"
            onChange={(e) => handleOnChange("map", e.target.value)}
            value={project.map}
          ></textarea>
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა ქართულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionGeo"}
            value={project.descriptionGeo}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა ინგლისურად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionEng"}
            value={project.descriptionEng}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">აღწერა რუსულად</p>
          <TextEditor
            onChange={handleOnChange}
            inputKey={"descriptionRus"}
            value={project.descriptionRus}
            hasUploaded={hasUploaded}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პროექტის ფოტო</p>
          <PhotoUpload
            name="image"
            image={projectImage}
            setImage={setProjectImage}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">პროექტის გალერია</p>
          <PhotoUpload
            name="galery"
            image={galleryImages}
            setImage={setGalleryImages}
            isMultiply={true}
          />
        </div>
        <Button
          title={"დამატება"}
          onClick={() => {}}
          width={"w-[200px]"}
          type="submit"
          bgColor="bg-blue"
          isLoading={isUploadLoading}
        />
      </form>
      <hr className="w-full h-[1px] bg-[#eee] border-none" />
      <div className="w-full flex flex-col md600:flex-row items-end md600:items-center gap-4 justify-between">
        <h1 className="sm:text-[28px] text-[20px] text-mainColor self-start">
          პროექტები
        </h1>
        {/* <Button
          title="პროექტის დამატება"
          onClick={() => route.push(`/${locale}/admin/adminPanel/add-news`)}
          width={"w-[200px]"}
          bgColor="bg-blue"
        /> */}
      </div>

      <div className="w-full overflow-x-auto topFilter">
        <div className="xl:w-full w-[1190px] flex flex-col">
          <div className="w-full grid grid-cols-5 gap-5 bg-[#eee] py-4 px-6 rounded-[5px]">
            <p className="text-[14px] font-medium">ფოტო</p>
            <p className="text-[14px] font-medium">სათაური</p>
            <p className="text-[14px] font-medium">სტატუსი</p>
            <p className="text-[14px] font-medium">სართულები</p>
            <p className="text-[14px] font-medium">მოქმედება</p>
          </div>
          {projects ? (
            projects.length != 0 ? (
              projects?.map((item: Building) => (
                <ProjectCard
                  key={item.id}
                  item={item}
                  forRender={forRender}
                  setForRender={setForRender}
                />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5">
                <CiSearch className="text-[24px]" />
                <p>პროექტები არ მოიძებნა</p>
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
    </div>
  );
}

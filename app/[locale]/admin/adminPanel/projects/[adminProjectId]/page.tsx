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

export default function SingleAdminProject() {
  const params = useParams();

  const { setToast } = useApexAdmin();
  const [project, setProject] = useState({
    type: "",
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    floor: "",
    map: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });
  const [projectUpdate, setProjectUpdate] = useState({
    type: "",
    titleGeo: "",
    titleEng: "",
    titleRus: "",
    floor: "",
    map: "",
    descriptionGeo: "",
    descriptionEng: "",
    descriptionRus: "",
  });
  const [projectImage, setProjectImage] = useState([]);
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
          `/building/${params.adminProjectId}`
        );
        const data = response.data;
        setProject({
          ...project,
          type: data.status,
          titleGeo: data.title,
          titleEng: data.title_en,
          titleRus: data.title_ru,
          floor: data.max_floor.toString(),
          map: data.maping !== null ? data.maping : "",
          descriptionGeo: data.text !== null ? data.text : "",
          descriptionEng: data.text_en !== null ? data.text_en : "",
          descriptionRus: data.text_ru !== null ? data.text_ru : "",
        });
        setProjectUpdate({
          ...projectUpdate,
          type: data.status,
          titleGeo: data.title,
          titleEng: data.title_en,
          titleRus: data.title_ru,
          floor: data.max_floor.toString(),
          map: data.maping !== null ? data.maping : "",
          descriptionGeo: data.text !== null ? data.text : "",
          descriptionEng: data.text_en !== null ? data.text_en : "",
          descriptionRus: data.text_ru !== null ? data.text_ru : "",
        });
        setBackImage(data.img);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [forRender]);

  const handleOnChange = (key: string, value: string) => {
    setProjectUpdate({ ...projectUpdate, [key]: value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const isinputValuesChange = Object.keys(project).some(
      (key) =>
        projectUpdate[key as keyof typeof projectUpdate] !==
        project[key as keyof typeof project]
    );
    if (isinputValuesChange || projectImage.length !== 0) {
      const hasEmptyField = Object.values(projectUpdate).some(
        (value) => value.trim() === ""
      );

      if (hasEmptyField) {
        return setToast(true, "შეავსეთ ყველა ველი", "error");
      }
      if (!isUploadLoading) {
        setIsUploadLoading(true);
        const form = e.target;
        const formData = new FormData(form);

        formData.append("status", projectUpdate.type);
        formData.append("title", projectUpdate.titleGeo);
        formData.append("title_en", projectUpdate.titleEng);
        formData.append("title_ru", projectUpdate.titleRus);
        formData.append("max_floor", projectUpdate.floor);
        formData.append("maping", projectUpdate.map);
        formData.append("text", projectUpdate.descriptionGeo);
        formData.append("text_en", projectUpdate.descriptionEng);
        formData.append("text_ru", projectUpdate.descriptionRus);
        formData.append("id", params.adminProjectId as string);
        try {
          const response = await axiosAdmin.put(
            `/building/${params.adminProjectId}`,
            formData
          );
          setToast(true, "პროექტი წარმატებით განახლდა", "success");
          setProjectImage([]);
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
    const hasOneValue = Object.values(projectUpdate).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || projectImage.length != 0) {
      setHasUploaded(false);
    }
  }, [projectUpdate, projectImage]);

  console.log(projectUpdate);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">პროექტი</h1>
      {!isLoading ? (
        <form
          className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
          onSubmit={handleUpdate}
        >
          <SelectComp
            placeholder={"აირჩიეთ სტატუსი"}
            filterKey={"type"}
            selectedValues={projectUpdate}
            title="პროექტის სტატუსი"
            data={["მიმდინარე", "დასრულებული"]}
            onClick={handleOnChange}
          />
          <Input
            placeholder={"სათაური"}
            onChange={handleOnChange}
            value={projectUpdate.titleGeo}
            title="სათაური ქართულად"
            inputKey="titleGeo"
          />
          <Input
            placeholder={"სათაური"}
            onChange={handleOnChange}
            value={projectUpdate.titleEng}
            title="სათაური ინგლისურად"
            inputKey="titleEng"
          />
          <Input
            placeholder={"სათაური"}
            onChange={handleOnChange}
            value={projectUpdate.titleRus}
            title="სათაური რუსულად"
            inputKey="titleRus"
          />
          <Input
            placeholder={"სართული"}
            onChange={handleOnChange}
            value={projectUpdate.floor}
            title="სართულების რაოდენობა"
            inputKey="floor"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">პროექტის მაპირება</p>
            <textarea
              className="resize-none w-full min-h-[150px] border border-blue bg-white rounded-[10px] outline-none p-3 font-light text-[14px]"
              placeholder="მაპირება"
              onChange={(e) => handleOnChange("map", e.target.value)}
              value={projectUpdate.map}
            ></textarea>
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა ქართულად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionGeo"}
              value={projectUpdate.descriptionGeo}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა ინგლისურად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionEng"}
              value={projectUpdate.descriptionEng}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">აღწერა რუსულად</p>
            <TextEditor
              onChange={handleOnChange}
              inputKey={"descriptionRus"}
              value={projectUpdate.descriptionRus}
              hasUploaded={hasUploaded}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">პროექტის ფოტო</p>
            <PhotoUpload
              name="image"
              image={projectImage}
              setImage={setProjectImage}
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

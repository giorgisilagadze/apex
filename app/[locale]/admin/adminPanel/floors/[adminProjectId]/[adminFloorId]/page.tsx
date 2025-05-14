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

export default function SingleAdminFloor() {
  const params = useParams();

  const { setToast } = useApexAdmin();
  const [floor, setFloor] = useState({
    type: "",
    floor: "",
    map: "",
  });
  const [updateFloor, setUpdateFloor] = useState({
    type: "",
    floor: "",
    map: "",
  });
  const [floorImage, setFloorImage] = useState([]);
  const [backImage, setBackImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [forRender, setForRender] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axiosAdmin.get(`/floor/${params.adminFloorId}`);
        const data = response.data;
        setFloor({
          ...floor,
          type: data.status !== null ? data.status : "",
          floor: data.title,
          map: data.maping !== null ? data.maping : "",
        });
        setUpdateFloor({
          ...updateFloor,
          type: data.status !== null ? data.status : "",
          floor: data.title,
          map: data.maping !== null ? data.maping : "",
        });
        setBackImage(data.img);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [forRender]);

  const handleOnChange = (key: string, value: string) => {
    setUpdateFloor({ ...updateFloor, [key]: value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const isinputValuesChange = Object.keys(floor).some(
      (key) =>
        updateFloor[key as keyof typeof updateFloor] !==
        floor[key as keyof typeof floor]
    );
    if (isinputValuesChange || floorImage.length !== 0) {
      const hasEmptyField = Object.values(updateFloor).some(
        (value) => value.trim() === ""
      );

      if (hasEmptyField) {
        return setToast(true, "შეავსეთ ყველა ველი", "error");
      }
      if (!isUploadLoading) {
        setIsUploadLoading(true);
        const form = e.target;
        const formData = new FormData(form);

        formData.append("status", updateFloor.type);
        formData.append("title", updateFloor.floor);
        formData.append("name", updateFloor.floor);
        formData.append("maping", updateFloor.map);
        formData.append("id", params.adminFloorId as string);
        try {
          const response = await axiosAdmin.put(
            `/floor/${params.adminFloorId}`,
            formData
          );
          setToast(true, "სართული წარმატებით განახლდა", "success");
          setFloorImage([]);
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
    const hasOneValue = Object.values(updateFloor).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || floorImage.length != 0) {
      setHasUploaded(false);
    }
  }, [updateFloor, floorImage]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      {!isLoading ? (
        <h1 className="sm:text-[28px] text-[20px] text-mainColor">
          სართული {floor.floor}
        </h1>
      ) : (
        <Shimmer width="w-[170px]" height="h-[42px]" rounded="rounded-[10px]" />
      )}
      {!isLoading ? (
        <form
          className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
          onSubmit={handleUpdate}
        >
          <SelectComp
            placeholder={"აირჩიეთ სტატუსი"}
            filterKey={"type"}
            selectedValues={updateFloor}
            title="სართულის სტატუსი"
            data={["მიმდინარე", "დასრულებული"]}
            onClick={handleOnChange}
          />
          <Input
            placeholder={"სართული"}
            onChange={handleOnChange}
            value={updateFloor.floor}
            title="სართული"
            inputKey="floor"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">პროექტის მაპირება</p>
            <textarea
              className="resize-none w-full min-h-[150px] border border-blue bg-white rounded-[10px] outline-none p-3 font-light text-[14px]"
              placeholder="მაპირება"
              onChange={(e) => handleOnChange("map", e.target.value)}
              value={updateFloor.map}
            ></textarea>
          </div>

          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">სართულის ფოტო</p>
            <PhotoUpload
              name="image"
              image={floorImage}
              setImage={setFloorImage}
              backImage={backImage}
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
            <Shimmer height="h-[197px]" rounded="rounded-[5px]" />
          </div>
          <div className="w-full flex items-center gap-[6px]">
            <Shimmer
              width="w-[190px]"
              height="h-[170px]"
              rounded="rounded-[10px]"
            />
          </div>
          <div className="self-end">
            <Shimmer
              width="w-[200px]"
              height="h-[54px]"
              rounded="rounded-[10px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import FloorCard from "@/components/admin/floors/FloorCard";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import SelectComp from "@/components/input/SelectComp";
import Shimmer from "@/components/shimmer/Shimmer";
import useApexAdmin from "@/utils/ApexAdmin";
import { axiosAdmin } from "@/utils/AxiosToken";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SingleProjectFloors() {
  const params = useParams();

  const { setToast } = useApexAdmin();
  const [newFloor, setNewFloor] = useState({
    type: "",
    floor: "",
    map: "",
  });
  const [floorImage, setFloorImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [forRender, setForRender] = useState(1);
  const [floors, setFloors] = useState<Floor[]>();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/floor?building_id=${params.adminProjectId}`
        );
        const data = response.data;
        setFloors(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [forRender]);

  const handleOnChange = (key: string, value: string) => {
    setNewFloor({ ...newFloor, [key]: value });
  };

  const handleAddFloor = async (e: any) => {
    e.preventDefault();
    const hasEmptyField = Object.values(newFloor).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField || floorImage.length == 0) {
      return setToast(true, "შეავსეთ ყველა ველი", "error");
    }
    if (!isUploadLoading) {
      setIsUploadLoading(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("status", newFloor.type);
      formData.append("title", newFloor.floor);
      formData.append("name", newFloor.floor);
      formData.append("maping", newFloor.map);
      formData.append("building_id", params.adminProjectId as string);
      try {
        const response = await axiosAdmin.post(`/floor`, formData);
        setToast(true, "სართული წარმატებით დაემატა", "success");
        setFloorImage([]);
        setNewFloor({
          type: "",
          floor: "",
          map: "",
        });
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
    const hasOneValue = Object.values(newFloor).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || floorImage.length != 0) {
      setHasUploaded(false);
    }
  }, [newFloor, floorImage]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        სართულის დამატება
      </h1>
      {!isLoading ? (
        <form
          className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
          onSubmit={handleAddFloor}
        >
          <SelectComp
            placeholder={"აირჩიეთ სტატუსი"}
            filterKey={"type"}
            selectedValues={newFloor}
            title="სართულის სტატუსი"
            data={["მიმდინარე", "დასრულებული"]}
            onClick={handleOnChange}
          />
          <Input
            placeholder={"სართული"}
            onChange={handleOnChange}
            value={newFloor.floor}
            title="სართული"
            inputKey="floor"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">პროექტის მაპირება</p>
            <textarea
              className="resize-none w-full min-h-[150px] border border-blue bg-white rounded-[10px] outline-none p-3 font-light text-[14px]"
              placeholder="მაპირება"
              onChange={(e) => handleOnChange("map", e.target.value)}
              value={newFloor.map}
            ></textarea>
          </div>

          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">სართულის ფოტო</p>
            <PhotoUpload
              name="image"
              image={floorImage}
              setImage={setFloorImage}
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
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">სართულები</h1>
      <div className="w-full overflow-x-auto topFilter">
        <div className="xl:w-full w-[1190px] flex flex-col">
          <div className="w-full grid grid-cols-4 gap-5 bg-[#eee] py-4 px-6 rounded-[5px]">
            <p className="text-[14px] font-medium">ფოტო</p>
            <p className="text-[14px] font-medium">სართული</p>
            <p className="text-[14px] font-medium">ბინები</p>
            <p className="text-[14px] font-medium">მოქმედება</p>
          </div>
          {floors ? (
            floors.length != 0 ? (
              floors?.map((item: Floor) => (
                <FloorCard
                  key={item.id}
                  item={item}
                  forRender={forRender}
                  setForRender={setForRender}
                />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5">
                <CiSearch className="text-[24px]" />
                <p>სართულები არ მოიძებნა</p>
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

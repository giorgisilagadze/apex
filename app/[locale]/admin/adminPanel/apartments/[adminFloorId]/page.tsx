"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import ApartmentCard from "@/components/admin/apartments/ApartmentCard";
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

export default function SingleFloorApartments() {
  const params = useParams();

  const { setToast } = useApexAdmin();
  const [newApartment, setNewApartment] = useState({
    status: "",
    price: "",
    price2: "",
    number: "",
    wholeSpace: "",
    livingSpace: "",
    summerSpace: "",
    studio: "",
    bedroom1: "",
    bedroom2: "",
    bedroom3: "",
    bathroom1: "",
    bathroom2: "",
    hall: "",
  });
  const [apartmentImage, setApartmentImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [forRender, setForRender] = useState(1);
  const [apartments, setApartments] = useState<Apartment1[]>();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/apartment?floor_id=${params.adminFloorId}`
        );
        const data = response.data;
        setApartments(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [forRender]);

  const handleOnChange = (key: string, value: string) => {
    setNewApartment({ ...newApartment, [key]: value });
  };

  const handleAddApartment = async (e: any) => {
    e.preventDefault();
    //   const hasEmptyField = Object.values(newApartment).some(
    //     (value) => value.trim() === ""
    //   );

    if (apartmentImage.length == 0) {
      return setToast(true, "ატვირთეთ ბინის ფოტო", "error");
    }
    if (!isUploadLoading) {
      setIsUploadLoading(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("status", newApartment.status);
      formData.append("price", newApartment.price);
      formData.append("price2", newApartment.price2);
      formData.append("number", newApartment.number);
      formData.append("area", newApartment.wholeSpace);
      formData.append("living_space", newApartment.livingSpace);
      formData.append("summer_area", newApartment.summerSpace);
      formData.append("studio", newApartment.studio);
      formData.append("bedroom", newApartment.bedroom1);
      formData.append("bedroom2", newApartment.bedroom2);
      formData.append("bedroom3", newApartment.bedroom3);
      formData.append("bathroom", newApartment.bathroom1);
      formData.append("bathroom2", newApartment.bathroom2);
      formData.append("hall", newApartment.hall);
      formData.append("floor_id", params.adminFloorId as string);
      try {
        const response = await axiosAdmin.post(`/apartment`, formData);
        setToast(true, "ბინა წარმატებით დაემატა", "success");
        setApartmentImage([]);
        setNewApartment({
          status: "",
          price: "",
          price2: "",
          number: "",
          wholeSpace: "",
          livingSpace: "",
          summerSpace: "",
          studio: "",
          bedroom1: "",
          bedroom2: "",
          bedroom3: "",
          bathroom1: "",
          bathroom2: "",
          hall: "",
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
    const hasOneValue = Object.values(newApartment).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || apartmentImage.length != 0) {
      setHasUploaded(false);
    }
  }, [newApartment, apartmentImage]);

  const inputs = [
    {
      id: 1,
      title: "სრული ფასი $",
      inputKey: "price",
      value: newApartment.price,
    },
    {
      id: 14,
      title: "1მ2 ფასი $",
      inputKey: "price2",
      value: newApartment.price2,
    },
    {
      id: 2,
      title: "ბინის ნომერი",
      inputKey: "number",
      value: newApartment.number,
    },
    {
      id: 3,
      title: "საერთო ფართი",
      inputKey: "wholeSpace",
      value: newApartment.wholeSpace,
    },
    {
      id: 4,
      title: "საცხოვრებელი ფართი",
      inputKey: "livingSpace",
      value: newApartment.livingSpace,
    },
    {
      id: 5,
      title: "საზაფხულო ფართი",
      inputKey: "summerSpace",
      value: newApartment.summerSpace,
    },
    {
      id: 6,
      title: "სტუდიო",
      inputKey: "studio",
      value: newApartment.studio,
    },
    {
      id: 8,
      title: "საძინებელი 1",
      inputKey: "bedroom1",
      value: newApartment.bedroom1,
    },
    {
      id: 9,
      title: "საძინებელი 2",
      inputKey: "bedroom2",
      value: newApartment.bedroom2,
    },
    {
      id: 10,
      title: "საძინებელი 3",
      inputKey: "bedroom3",
      value: newApartment.bedroom3,
    },
    {
      id: 11,
      title: "სველი წერტილი 1",
      inputKey: "bathroom1",
      value: newApartment.bathroom1,
    },
    {
      id: 12,
      title: "სველი წერტილი 2",
      inputKey: "bathroom2",
      value: newApartment.bathroom2,
    },
    {
      id: 13,
      title: "ჰოლი",
      inputKey: "hall",
      value: newApartment.hall,
    },
  ];

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        ბინის დამატება
      </h1>
      {!isLoading ? (
        <form
          className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
          onSubmit={handleAddApartment}
        >
          <SelectComp
            placeholder={"აირჩიეთ სტატუსი"}
            filterKey={"status"}
            selectedValues={newApartment}
            title="ბინის სტატუსი"
            data={["გასაყიდი", "გაყიდული"]}
            onClick={handleOnChange}
          />
          {inputs.map((item) => (
            <Input
              placeholder={""}
              onChange={handleOnChange}
              value={item.value}
              title={item.title}
              inputKey={item.inputKey}
              key={item.id}
              type={item.id !== 2 ? "number" : "text"}
            />
          ))}

          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">ბინის ფოტო</p>
            <PhotoUpload
              name="image"
              image={apartmentImage}
              setImage={setApartmentImage}
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
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">ბინები</h1>
      <div className="w-full overflow-x-auto topFilter">
        <div className="xl:w-full w-[1190px] flex flex-col">
          <div className="w-full grid grid-cols-5 gap-5 bg-[#eee] py-4 px-6 rounded-[5px]">
            <p className="text-[14px] font-medium">ფოტო</p>
            <p className="text-[14px] font-medium">ბინის ნომერი</p>
            <p className="text-[14px] font-medium">სტატუსი</p>
            <p className="text-[14px] font-medium">კვადრატულობა</p>
            <p className="text-[14px] font-medium">მოქმედება</p>
          </div>
          {apartments ? (
            apartments.length != 0 ? (
              apartments?.map((item: Apartment1) => (
                <ApartmentCard
                  key={item.id}
                  item={item}
                  forRender={forRender}
                  setForRender={setForRender}
                />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center flex-col gap-3 text-[14px] border border-[#eee] mt-5">
                <CiSearch className="text-[24px]" />
                <p>ბინები არ მოიძებნა</p>
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

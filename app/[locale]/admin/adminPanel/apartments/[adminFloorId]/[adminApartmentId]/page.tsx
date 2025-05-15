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

export default function SingleAdminApartment() {
  const params = useParams();

  const { setToast } = useApexAdmin();
  const [apart, setApart] = useState({
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
  const [apartUpdate, setApartUpdate] = useState({
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
  const [apartImage, setApartImage] = useState([]);
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
          `/apartment/${params.adminApartmentId}`
        );
        const data = response.data;
        setApart({
          ...apart,
          status: data.status !== null ? data.status : "",
          price: data.price !== null ? data.price : "",
          price2: data.price2 !== null ? data.price2 : "",
          number: data.number !== null ? data.number : "",
          wholeSpace: data.area !== null ? data.area : "",
          livingSpace: data.living_space !== null ? data.living_space : "",
          summerSpace: data.summer_area !== null ? data.summer_area : "",
          studio: data.studio !== null ? data.studio : "",
          bedroom1: data.bedroom !== null ? data.bedroom : "",
          bedroom2: data.bedroom2 !== null ? data.bedroom2 : "",
          bedroom3: data.bedroom3 !== null ? data.bedroom3 : "",
          bathroom1: data.bathroom !== null ? data.bathroom : "",
          bathroom2: data.bathroom2 !== null ? data.bathroom2 : "",
          hall: data.hall !== null ? data.hall : "",
        });
        setApartUpdate({
          ...apartUpdate,
          status: data.status !== null ? data.status : "",
          price: data.price !== null ? data.price : "",
          price2: data.price2 !== null ? data.price2 : "",
          number: data.number !== null ? data.number : "",
          wholeSpace: data.area !== null ? data.area : "",
          livingSpace: data.living_space !== null ? data.living_space : "",
          summerSpace: data.summer_area !== null ? data.summer_area : "",
          studio: data.studio !== null ? data.studio : "",
          bedroom1: data.bedroom !== null ? data.bedroom : "",
          bedroom2: data.bedroom2 !== null ? data.bedroom2 : "",
          bedroom3: data.bedroom3 !== null ? data.bedroom3 : "",
          bathroom1: data.bathroom !== null ? data.bathroom : "",
          bathroom2: data.bathroom2 !== null ? data.bathroom2 : "",
          hall: data.hall !== null ? data.hall : "",
        });
        setBackImage(data.img);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [forRender]);

  const handleOnChange = (key: string, value: string) => {
    setApartUpdate({ ...apartUpdate, [key]: value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const isinputValuesChange = Object.keys(apart).some(
      (key) =>
        apartUpdate[key as keyof typeof apartUpdate] !==
        apart[key as keyof typeof apart]
    );
    if (isinputValuesChange || apartImage.length !== 0) {
      // const hasEmptyField = Object.values(apartUpdate).some(
      //   (value) => value.trim() === ""
      // );

      // if (hasEmptyField) {
      //   return setToast(true, "შეავსეთ ყველა ველი", "error");
      // }
      if (!isUploadLoading) {
        setIsUploadLoading(true);
        const form = e.target;
        const formData = new FormData(form);

        formData.append("status", apartUpdate.status);
        formData.append("price", apartUpdate.price);
        formData.append("price2", apartUpdate.price2);
        formData.append("number", apartUpdate.number);
        formData.append("area", apartUpdate.wholeSpace);
        formData.append("living_space", apartUpdate.livingSpace);
        formData.append("summer_area", apartUpdate.summerSpace);
        formData.append("studio", apartUpdate.studio);
        formData.append("bedroom", apartUpdate.bedroom1);
        formData.append("bedroom2", apartUpdate.bedroom2);
        formData.append("bedroom3", apartUpdate.bedroom3);
        formData.append("bathroom", apartUpdate.bathroom1);
        formData.append("bathroom2", apartUpdate.bathroom2);
        formData.append("hall", apartUpdate.hall);
        formData.append("id", params.adminApartmentId as string);
        try {
          const response = await axiosAdmin.put(
            `/apartment/${params.adminApartmentId}`,
            formData
          );
          setToast(true, "პროექტი წარმატებით განახლდა", "success");
          setApartImage([]);
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
    const hasOneValue = Object.values(apartUpdate).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || apartImage.length != 0) {
      setHasUploaded(false);
    }
  }, [apartUpdate, apartImage]);

  const inputs = [
    {
      id: 1,
      title: "1მ2 ფასი $",
      inputKey: "price",
      value: apartUpdate.price,
    },
    {
      id: 14,
      title: "სრული ფასი $",
      inputKey: "price2",
      value: apartUpdate.price2,
    },
    {
      id: 2,
      title: "ბინის ნომერი",
      inputKey: "number",
      value: apartUpdate.number,
    },
    {
      id: 3,
      title: "საერთო ფართი",
      inputKey: "wholeSpace",
      value: apartUpdate.wholeSpace,
    },
    {
      id: 4,
      title: "საცხოვრებელი ფართი",
      inputKey: "livingSpace",
      value: apartUpdate.livingSpace,
    },
    {
      id: 5,
      title: "საზაფხულო ფართი",
      inputKey: "summerSpace",
      value: apartUpdate.summerSpace,
    },
    {
      id: 6,
      title: "სტუდიო",
      inputKey: "studio",
      value: apartUpdate.studio,
    },
    {
      id: 8,
      title: "საძინებელი 1",
      inputKey: "bedroom1",
      value: apartUpdate.bedroom1,
    },
    {
      id: 9,
      title: "საძინებელი 2",
      inputKey: "bedroom2",
      value: apartUpdate.bedroom2,
    },
    {
      id: 10,
      title: "საძინებელი 3",
      inputKey: "bedroom3",
      value: apartUpdate.bedroom3,
    },
    {
      id: 11,
      title: "სველი წერტილი 1",
      inputKey: "bathroom1",
      value: apartUpdate.bathroom1,
    },
    {
      id: 12,
      title: "სველი წერტილი 2",
      inputKey: "bathroom2",
      value: apartUpdate.bathroom2,
    },
    {
      id: 13,
      title: "ჰოლი",
      inputKey: "hall",
      value: apartUpdate.hall,
    },
  ];

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        ბინა {apart.number}
      </h1>
      {!isLoading ? (
        <form
          className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
          onSubmit={handleUpdate}
        >
          <SelectComp
            placeholder={"აირჩიეთ სტატუსი"}
            filterKey={"status"}
            selectedValues={apartUpdate}
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
              image={apartImage}
              setImage={setApartImage}
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

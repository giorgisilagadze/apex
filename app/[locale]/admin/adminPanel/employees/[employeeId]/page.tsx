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

export default function SingleAdminEmployee() {
  const params = useParams();

  const { setToast } = useApexAdmin();
  const [employee, setemployee] = useState({
    nameGeo: "",
    nameEng: "",
    nameRus: "",
    positionGeo: "",
    positionEng: "",
    positionRus: "",
  });
  const [employeeUpdate, setemployeeUpdate] = useState({
    nameGeo: "",
    nameEng: "",
    nameRus: "",
    positionGeo: "",
    positionEng: "",
    positionRus: "",
  });
  const [employeeImage, setemployeeImage] = useState([]);
  const [backImage, setBackImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [forRender, setForRender] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axiosAdmin.get(`/employ/${params.employeeId}`);
        const data = response.data;
        setemployee({
          ...employee,
          nameGeo: data.name,
          nameEng: data.name_en,
          nameRus: data.name_ru,
          positionGeo: data.position,
          positionEng: data.position_en,
          positionRus: data.position_ru,
        });
        setemployeeUpdate({
          ...employeeUpdate,
          nameGeo: data.name,
          nameEng: data.name_en,
          nameRus: data.name_ru,
          positionGeo: data.position,
          positionEng: data.position_en,
          positionRus: data.position_ru,
        });
        setBackImage(data.img);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [forRender]);

  const handleOnChange = (key: string, value: string) => {
    setemployeeUpdate({ ...employeeUpdate, [key]: value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const isinputValuesChange = Object.keys(employee).some(
      (key) =>
        employeeUpdate[key as keyof typeof employeeUpdate] !==
        employee[key as keyof typeof employee]
    );
    if (isinputValuesChange || employeeImage.length !== 0) {
      const hasEmptyField = Object.values(employeeUpdate).some(
        (value) => value.trim() === ""
      );

      if (hasEmptyField) {
        return setToast(true, "შეავსეთ ყველა ველი", "error");
      }
      if (!isUploadLoading) {
        setIsUploadLoading(true);
        const form = e.target;
        const formData = new FormData(form);

        formData.append("name", employeeUpdate.nameGeo);
        formData.append("name_en", employeeUpdate.nameEng);
        formData.append("name_ru", employeeUpdate.nameRus);
        formData.append("position", employeeUpdate.positionGeo);
        formData.append("position_en", employeeUpdate.positionEng);
        formData.append("position_ru", employeeUpdate.positionRus);
        formData.append("id", params.employeeId as string);
        try {
          const response = await axiosAdmin.put(
            `/employ/${params.employeeId}`,
            formData
          );
          setToast(true, "თანამშრომელი წარმატებით განახლდა", "success");
          setemployeeImage([]);
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
    const hasOneValue = Object.values(employeeUpdate).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || employeeImage.length != 0) {
      setHasUploaded(false);
    }
  }, [employeeUpdate, employeeImage]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        თანამშრომელი {employee.nameGeo}
      </h1>
      {!isLoading ? (
        <form
          className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
          onSubmit={handleUpdate}
        >
          <Input
            placeholder={"სახელი"}
            onChange={handleOnChange}
            value={employeeUpdate.nameGeo}
            title="სახელი ქართულად"
            inputKey="nameGeo"
          />
          <Input
            placeholder={"სახელი"}
            onChange={handleOnChange}
            value={employeeUpdate.nameEng}
            title="სახელი ინგლისურად"
            inputKey="nameEng"
          />
          <Input
            placeholder={"სახელი"}
            onChange={handleOnChange}
            value={employeeUpdate.nameRus}
            title="სახელი რუსულად"
            inputKey="nameRus"
          />
          <Input
            placeholder={"პოზიცია"}
            onChange={handleOnChange}
            value={employeeUpdate.positionGeo}
            title="პოზიცია ქართულად"
            inputKey="positionGeo"
          />
          <Input
            placeholder={"პოზიცია"}
            onChange={handleOnChange}
            value={employeeUpdate.positionEng}
            title="პოზიცია ინგლისურად"
            inputKey="positionEng"
          />
          <Input
            placeholder={"პოზიცია"}
            onChange={handleOnChange}
            value={employeeUpdate.positionRus}
            title="პოზიცია რუსულად"
            inputKey="positionRus"
          />
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px]">თანამშრომლის ფოტო</p>
            <PhotoUpload
              name="image"
              image={employeeImage}
              setImage={setemployeeImage}
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

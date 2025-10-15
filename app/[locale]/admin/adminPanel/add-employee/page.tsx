"use client";

import PhotoUpload from "@/components/admin/PhotoUpload";
import TextEditor from "@/components/admin/TextEditor";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import SelectComp from "@/components/input/SelectComp";
import useApexAdmin from "@/utils/ApexAdmin";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useEffect, useState } from "react";

export default function AddEmployee() {
  const { setToast } = useApexAdmin();
  const [employee, setemployee] = useState({
    nameGeo: "",
    nameEng: "",
    nameRus: "",
    positionGeo: "",
    positionEng: "",
    positionRus: "",
  });
  const [employeeImage, setemployeeImage] = useState([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleOnChange = (key: string, value: string) => {
    setemployee({ ...employee, [key]: value });
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const hasEmptyField = Object.values(employee).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField || employeeImage.length == 0) {
      return setToast(true, "შეავსეთ ყველა ველი", "error");
    }
    if (!isUploadLoading) {
      setIsUploadLoading(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("name", employee.nameGeo);
      formData.append("name_en", employee.nameEng);
      formData.append("name_ru", employee.nameRus);
      formData.append("position", employee.positionGeo);
      formData.append("position_en", employee.positionEng);
      formData.append("position_ru", employee.positionRus);
      try {
        const response = await axiosAdmin.post("/employ", formData);
        setToast(true, "თანამშრომელი წარმატებით აიტვირთა", "success");
        setemployee({
          nameGeo: "",
          nameEng: "",
          nameRus: "",
          positionGeo: "",
          positionEng: "",
          positionRus: "",
        });
        setemployeeImage([]);
        setHasUploaded(true);
      } catch (err) {
        setToast(true, "დაფიქსირდა შეცდომა", "error");
      } finally {
        setIsUploadLoading(false);
      }
    }
  };

  useEffect(() => {
    const hasOneValue = Object.values(employee).some(
      (value) => value.trim() !== ""
    );

    if (hasOneValue || employeeImage.length != 0) {
      setHasUploaded(false);
    }
  }, [employee, employeeImage]);

  return (
    <div className="sm:px-10 px-6 lg:py-[50px] pb-[50px] py-6 w-full flex flex-col sm:gap-10 gap-6 ">
      <h1 className="sm:text-[28px] text-[20px] text-mainColor">
        თანამშრომლის დამატება
      </h1>
      <form
        className="flex flex-col sm:gap-8 gap-6 xl:w-[70%] w-full"
        onSubmit={handleUpload}
      >
        <Input
          placeholder={"სახელი"}
          onChange={handleOnChange}
          value={employee.nameGeo}
          title="სახელი ქართულად"
          inputKey="nameGeo"
        />
        <Input
          placeholder={"სახელი"}
          onChange={handleOnChange}
          value={employee.nameEng}
          title="სახელი ინგლისურად"
          inputKey="nameEng"
        />
        <Input
          placeholder={"სახელი"}
          onChange={handleOnChange}
          value={employee.nameRus}
          title="სახელი რუსულად"
          inputKey="nameRus"
        />
        <Input
          placeholder={"პოზიცია"}
          onChange={handleOnChange}
          value={employee.positionGeo}
          title="პოზიცია ქართულად"
          inputKey="positionGeo"
        />
        <Input
          placeholder={"პოზიცია"}
          onChange={handleOnChange}
          value={employee.positionEng}
          title="პოზიცია ინგლისურად"
          inputKey="positionEng"
        />
        <Input
          placeholder={"პოზიცია"}
          onChange={handleOnChange}
          value={employee.positionRus}
          title="პოზიცია რუსულად"
          inputKey="positionRus"
        />

        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px]">თანამშრომლის ფოტო</p>
          <PhotoUpload
            name="image"
            image={employeeImage}
            setImage={setemployeeImage}
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

"use client";

import Image from "next/legacy/image";
import Input from "../input/Input";
import SelectComp from "../input/SelectComp";
import Button from "../button/Button";
import { BsArrowDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const [projects, setProjects] = useState<Building[]>([]);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/project`
        );
        const data = response.data;
        setProjects(data);
      } catch (err) {
      } finally {
      }
    })();
  }, []);

  const handleOnChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleUpload = async () => {
    setIsSubmited(true);
    const hasEmptyField = Object.keys(values).some(
      (value) => value.trim() === ""
    );
    console.log(hasEmptyField);

    if (hasEmptyField) return;

    if (!isLoading) {
      setIsLoading(true);
      try {
        // const response = await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_URL}/project`,
        //   {
        //     name: values.name,
        //     phone: values.phone,
        //     email: values.email,
        //     project: values.project,
        //   }
        // );
      } catch {
      } finally {
        setIsLoading(false);
      }
    }
  };

  console.log(values);

  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 grid lg:grid-cols-2">
      <div className="w-full lg:h-[500px] md500:h-[400px] h-[350px] relative">
        <Image
          src={"/images/contact.jpg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          className="rounded-tl-[10px] lg:rounded-bl-[10px] rounded-tr-[10px] lg:rounded-tr-[0px]"
        />
      </div>
      <div className="w-full h-full bg-blue lg:rounded-tr-[10px] rounded-bl-[10px] lg:rounded-bl-[0px] rounded-br-[10px] flex justify-center flex-col gap-5 xxl:px-[100px] md500:px-10 px-6 py-10 lg:py-0">
        <p className="sm:text-[28px] text-[20px] font-bold text-white">
          დაგვიტოვეთ საკონტაქტო
        </p>
        <p className="text-[14px] text-white font-light">
          ჩვენი მენეჯერი დაგიკავშირდებათ 15 წუთის განმავლობაში
        </p>
        <div className="w-full grid md500:grid-cols-2 gap-5">
          <Input
            placeholder={"მაგ. დავითი"}
            title="სახელი და გვარი"
            color="text-white"
            onChange={handleOnChange}
            value={values["name"]}
            inputKey="name"
          />
          <Input
            placeholder={"+995"}
            title="ტელეფონის ნომერი"
            color="text-white"
            onChange={handleOnChange}
            value={values["phone"]}
            inputKey="phone"
            type="number"
          />
          <Input
            placeholder={"Example@apexd.ge"}
            title="ელექტრონული ფოსტა"
            color="text-white"
            onChange={handleOnChange}
            value={values["email"]}
            inputKey="email"
          />
          <SelectComp
            placeholder={"აირჩიეთ"}
            title="პროექტები"
            color="text-white"
            filterKey={"project"}
            selectedValues={values}
            onClick={handleOnChange}
            data={projects.map((item) => item.name)}
          />
        </div>
        <Button
          title={"გაგზავნა"}
          onClick={handleUpload}
          width={"w-full"}
          color="text-white"
          bgColor="bg-lightBlue"
          right={true}
          icon={BsArrowDown}
          height="h-[45px]"
          rounded="rounded-[12px]"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

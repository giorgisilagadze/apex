"use client";

import Image from "next/legacy/image";
import Input from "../input/Input";
import SelectComp from "../input/SelectComp";
import Button from "../button/Button";
import { BsArrowDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import useApexAdmin from "@/utils/ApexAdmin";
import { useTranslations } from "next-intl";

interface Props {
  isPopUp?: boolean;
  setIsContactClicked?: (arg1: boolean) => void;
}

export default function sContact({ isPopUp, setIsContactClicked }: Props) {
  const { setToast } = useApexAdmin();
  const [projects, setProjects] = useState<Building[]>([]);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const t = useTranslations("LeaveContact");
  const f = useTranslations("Filter");

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
    const hasEmptyField = Object.values(values).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField) return;

    if (!isLoading) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/lead`,
          {
            name: values.name,
            phone: values.phone,
            mail: values.email,
            project: values.project,
          }
        );
        setValues({ name: "", phone: "", email: "", project: "" });
        setIsSubmited(false);
        setIsContactClicked?.(false);
        setToast(true, t("success"), "success");
      } catch {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className={`w-full ${
        !isPopUp
          ? "xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6"
          : ""
      } grid lg:grid-cols-2`}
    >
      <div
        className={`w-full ${
          !isPopUp
            ? "lg:h-[500px] md500:h-[400px] h-[350px]"
            : "lg:h-[500px] md600:h-[300px] h-[0px]"
        } relative`}
      >
        <Image
          src={"/images/contact.jpg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          className="rounded-tl-[10px] lg:rounded-bl-[10px] rounded-tr-[10px] lg:rounded-tr-[0px]"
        />
      </div>
      <div
        className={`w-full h-full bg-blue ${
          !isPopUp
            ? "lg:rounded-tr-[10px] rounded-bl-[10px] lg:rounded-bl-[0px] rounded-br-[10px]"
            : "lg:rounded-tr-[10px] rounded-bl-[10px] lg:rounded-bl-[0px] rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] md600:rounded-tl-[0px] md600:rounded-tr-[0px]"
        } flex justify-center flex-col gap-5 xxl:px-[100px] md500:px-10 px-6 py-10 lg:py-0`}
      >
        <p className="sm:text-[28px] text-[20px] font-bold text-white">
          {t("title")}
        </p>
        <p className="text-[14px] text-white font-light">{t("subtitle")}</p>
        <div className="w-full grid md500:grid-cols-2 gap-5">
          <Input
            placeholder={t("namePlaceholder")}
            title={t("name")}
            color={isSubmited && !values.name ? "text-[red]" : "text-white"}
            onChange={handleOnChange}
            value={values["name"]}
            inputKey="name"
          />

          <Input
            placeholder={t("phonePlaceholder")}
            title={t("phone")}
            color={isSubmited && !values.phone ? "text-[red]" : "text-white"}
            onChange={handleOnChange}
            value={values["phone"]}
            inputKey="phone"
            type="number"
          />

          <Input
            placeholder={t("emailPlaceholder")}
            title={t("email")}
            color={isSubmited && !values.email ? "text-[red]" : "text-white"}
            onChange={handleOnChange}
            value={values["email"]}
            inputKey="email"
          />

          <SelectComp
            placeholder={t("choose")}
            title={t("projects")}
            color={isSubmited && !values.project ? "text-[red]" : "text-white"}
            filterKey={"project"}
            selectedValues={values}
            onClick={handleOnChange}
            data={projects.map((item) => item.name)}
          />
        </div>
        <Button
          title={t("send")}
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

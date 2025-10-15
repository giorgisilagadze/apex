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
import { motion } from "framer-motion";
import { GoClock } from "react-icons/go";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { LuBriefcaseBusiness } from "react-icons/lu";

interface Props {
  isPopUp?: boolean;
  setIsContactClicked?: (arg1: boolean) => void;
}

export default function Contact({ isPopUp, setIsContactClicked }: Props) {
  const { setToast } = useApexAdmin();
  const [projects, setProjects] = useState<Building[]>([]);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    hours: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const t = useTranslations("LeaveContact");
  const f = useTranslations("Filter");

  const about = [
    {
      id: 1,
      icon: <GoClock className="text-[20px] text-blue" />,
      title: t("working hours"),
      text: t("hours1"),
    },
    {
      id: 2,
      icon: <LuBriefcaseBusiness className="text-[20px] text-blue" />,
      title: t("marketing"),
      text: "Marketing@apexd.ge",
    },
    {
      id: 3,
      icon: <PiBuildingOfficeLight className="text-[20px] text-blue" />,
      title: t("sale"),
      text: "Contact@apexd.ge",
    },
  ];

  const hours = ["09:00 - 13:00", "14:00 - 18:00", "19:00 - 22:00"];

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
            time: values.hours,
          }
        );
        setValues({ name: "", phone: "", email: "", project: "", hours: "" });
        setIsSubmited(false);
        setIsContactClicked?.(false);
        setToast(true, t("success"), "success");
      } catch {
        setToast(true, t("error"), "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`w-full ${!isPopUp ? "" : ""} grid`}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className={`w-full bg-white relative lg:h-[700px] md500:h-[670px] rounded-[10px] ${
          isPopUp ? "h-[550px] overflow-y-scroll" : "h-[994px]"
        } `}
      >
        <div className="w-[70%] h-full relative mx-auto">
          <Image
            src={"/images/tree.png"}
            alt="about"
            layout="fill"
            className="opacity-70"
          />
        </div>

        <div
          className={`w-full flex justify-start flex-col gap-5 ${
            isPopUp
              ? "lg1250:px-10  px-6"
              : "xl1600:px-[140px] lg1250:px-[100px] sm:px-[64px] px-6"
          } py-10 absolute top-0 left-0 z-[1]`}
        >
          <div className="w-full flex items-center xl1600:gap-8 gap-4">
            {!isPopUp && (
              <div className="relative md500:!w-[100px] md500:!h-[100px] w-[50px] h-[50px]">
                <Image src={"/images/logo1.png"} alt="about" layout="fill" />
              </div>
            )}

            <h1 className="xl:text-[30px] lg1110:text-[26px] md500:text-[20px] text-[18px] font-bold text-purple whitespace-nowrap">
              {t("title")}
            </h1>
          </div>

          {/* <p className="text-[14px] text-blue font-light">{t("subtitle")}</p> */}
          <div className="w-full grid md500:grid-cols-2 gap-5">
            <Input
              placeholder={t("namePlaceholder")}
              title={t("name")}
              color={isSubmited && !values.name ? "text-[red]" : "text-blue"}
              onChange={handleOnChange}
              value={values["name"]}
              inputKey="name"
              bgColor="bg-[rgb(241,244,247)]"
              height="h-[56px]"
            />

            <Input
              placeholder={t("phonePlaceholder")}
              title={t("phone")}
              color={isSubmited && !values.phone ? "text-[red]" : "text-blue"}
              onChange={handleOnChange}
              value={values["phone"]}
              inputKey="phone"
              type="number"
              bgColor="bg-[rgb(241,244,247)]"
              height="h-[56px]"
            />

            <Input
              placeholder={t("emailPlaceholder")}
              title={t("email")}
              color={isSubmited && !values.email ? "text-[red]" : "text-blue"}
              onChange={handleOnChange}
              value={values["email"]}
              inputKey="email"
              bgColor="bg-[rgb(241,244,247)]"
              height="h-[56px]"
            />

            <SelectComp
              placeholder={t("choose")}
              title={t("projects")}
              color={isSubmited && !values.project ? "text-[red]" : "text-blue"}
              filterKey={"project"}
              selectedValues={values}
              onClick={handleOnChange}
              data={projects.map((item) => item.name)}
              bgColor="bg-[rgb(241,244,247)]"
              height="h-[56px]"
            />
          </div>
          <SelectComp
            placeholder={t("choose")}
            title={t("when")}
            color={isSubmited && !values.hours ? "text-[red]" : "text-blue"}
            filterKey={"hours"}
            selectedValues={values}
            onClick={handleOnChange}
            data={hours}
            bgColor="bg-[rgb(241,244,247)]"
            height="h-[56px]"
            isTranslated={true}
          />
          <Button
            title={t("send")}
            onClick={handleUpload}
            width={"w-full"}
            color="text-white"
            bgColor="bg-blue"
            right={true}
            icon={BsArrowDown}
            height="h-[56px]"
            rounded="rounded-[12px]"
            isLoading={isLoading}
          />
          <div className="w-full flex md500:items-start md500:justify-between md500:flex-row flex-col md500:gap-0 gap-5 items-center justify-center">
            {about.map((item) => (
              <div
                className="flex flex-col items-center gap-[2px]"
                key={item.id}
              >
                {item.icon}
                <h1
                  className={`${
                    isPopUp
                      ? "xl1550:text-[16px] text-[12px]"
                      : "lg1250:text-[16px] text-[14px]"
                  } text-blue`}
                >
                  {item.title}
                </h1>
                <div>
                  <p
                    className={`${
                      isPopUp
                        ? "xl1550:text-[15px] text-[12px]"
                        : "lg1250:text-[15px] text-[13px]"
                    } text-center`}
                  >
                    {item.text}
                  </p>
                  {item.id == 1 && (
                    <p
                      className={`${
                        isPopUp
                          ? "xl1550:text-[15px] text-[12px]"
                          : "lg1250:text-[15px] text-[13px]"
                      } text-center`}
                    >
                      {t("hours2")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {!isPopUp && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`w-full lg:h-[700px] md500:h-[400px] h-[350px] relative`}
        >
          <Image
            src={"/images/contact.png"}
            alt="project-image"
            layout="fill"
            objectFit="cover"
            className={`${
              !isPopUp
                ? ""
                : "rounded-tl-[0px] lg:rounded-br-[10px] rounded-tr-[0px] lg:rounded-tr-[10px]"
            }`}
          />
        </motion.div>
      )}
    </div>
  );
}

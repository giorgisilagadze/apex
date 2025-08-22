"use client";

import Image from "next/legacy/image";
import Input from "../input/Input";
import SelectComp from "../input/SelectComp";
import Button from "../button/Button";
import { BsArrowDown } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useApexAdmin from "@/utils/ApexAdmin";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GoClock } from "react-icons/go";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";

export default function ContactForReplace() {
  const { setToast } = useApexAdmin();
  const [projects, setProjects] = useState<Building[]>([]);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
  });
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleOpenInput = () => {
    inputRef.current !== null && inputRef?.current.click();
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleOnChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsSubmited(true);
    const hasEmptyField = Object.values(values).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField || file == null) return;

    const form = e.target;
    const formData = new FormData(form);

    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("mail", values.email);
    formData.append("comment", values.description);

    if (!isLoading) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/lead`,
          formData
        );
        setValues({ name: "", phone: "", email: "", description: "" });
        setFile(null);
        setIsSubmited(false);
        setToast(true, t("success"), "success");
      } catch {
        setToast(true, t("error"), "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`w-full grid lg:grid-cols-2`}>
      <form className="w-full" onSubmit={handleUpload}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`w-full bg-white relative  h-[770px]`}
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
            className={`w-full flex justify-start flex-col gap-5 xl1600:px-[140px] lg1250:px-[100px] sm:px-[64px] px-6 py-10 absolute top-0 left-0 z-[1]`}
          >
            <div className="w-full flex items-center xl1600:gap-8 gap-4">
              <div className="relative md500:!w-[100px] md500:!h-[100px] w-[50px] h-[50px]">
                <Image src={"/images/logo1.png"} alt="about" layout="fill" />
              </div>

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
            </div>
            <div className="w-full flex flex-col gap-[6px]">
              <h1
                className={`text-[14px] font-medium whitespace-nowrap ${
                  isSubmited && !values.description ? "text-[red]" : "text-blue"
                }`}
              >
                {t("comment")}
              </h1>
              <textarea
                className="w-full bg-[rgb(241,244,247)] h-[140px] rounded-[10px] outline-none font-light text-[14px] p-4 resize-none placeholder:text-black"
                placeholder={t("commentPlaceholder")}
                key={"description"}
                onChange={(e) => handleOnChange("description", e.target.value)}
                value={values.description}
              />
            </div>
            <div className="w-full flex flex-col gap-[6px]">
              <h1
                className={`text-[14px] font-medium whitespace-nowrap ${
                  isSubmited && !file ? "text-[red]" : "text-blue"
                }`}
              >
                {t("presentation")}
              </h1>
              <div className="md500:w-[50%] w-full relative">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  name="presentation"
                  ref={inputRef}
                />
                <div
                  className="w-full h-[56px] bg-[rgb(241,244,247)] flex items-center justify-between px-4 rounded-[10px] absolute top-0 left-0 cursor-pointer hover:opacity-70 duration-300"
                  onClick={handleOpenInput}
                >
                  <p className="text-[14px] ">{t("uploadFile")}</p>
                  <FiUpload className="text-[20px] text-blue" />
                </div>
                {file && (
                  <p className="text-[14px] text-blue absolute top-[60px] left-2">
                    {file.name}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full mt-[60px]"></div>
            <Button
              title={t("send")}
              onClick={() => {}}
              width={"w-full"}
              color="text-white"
              bgColor="bg-blue"
              right={true}
              icon={BsArrowDown}
              height="h-[56px]"
              rounded="rounded-[12px]"
              isLoading={isLoading}
              type="submit"
            />
          </div>
        </motion.div>
      </form>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className={`w-full  md500:h-[770px] h-[350px] relative`}
      >
        <Image
          src={"/images/contactreplace.png"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
    </div>
  );
}

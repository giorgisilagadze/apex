"use client";

import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import { useLocale, useTranslations } from "next-intl";
import Input from "@/components/input/Input";
import useApexAdmin from "@/utils/ApexAdmin";

//        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/

export default function Admin() {
  const { adminToken, setAdminToken, setToast } = useApexAdmin();

  const locale = useLocale();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const route = useRouter();

  useEffect(() => {
    adminToken && route.push(`/${locale}/admin/adminPanel/news`);
  }, [adminToken]);

  const onChange = (inputKey: string, value: string) => {
    setData({ ...data, [inputKey]: value });
  };

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmited(true);
    if (!data.email || !data.password) return;
    if (!isLoading) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/adminAuth/login`,
          {
            email: data.email,
            password: data.password,
          }
        );
        route.push(`/${locale}/admin/adminPanel/news`);
        setAdminToken(response.data.access_token);
        localStorage.setItem("adminTokenApex", response.data.access_token);
      } catch (err: any) {
        setIsLoading(false);
        setToast(true, "მეილი ან პაროლი არასწორია", "error");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("adminTokenApex");
      token !== null && route.push(`/${locale}/admin/adminPanel/news`);
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-6 px-5">
        <h1 className="text-[18px] leading-6 text-blue text-center">
          გაიარეთ ავტორიზაცია გასაგრძელებლად
        </h1>
        <div className="md600:w-[500px] w-full h-[81px]">
          <Input
            placeholder={"example@gmail.com"}
            title={"ელ. ფოსტა"}
            inputKey="email"
            onChange={onChange}
            value={data.email}
            color="text-blue"
            onKeyDown={handleKeyPress}
          />
          {isSubmited && !data.email && (
            <div className="ml-2">
              <p className="text-[10px] text-[red]">{"მიუთითეთ მეილი"}</p>
            </div>
          )}
        </div>
        <div className="md600:w-[500px] w-full h-[81px]">
          <Input
            placeholder={"********"}
            title={"პაროლი"}
            inputKey="password"
            onChange={onChange}
            value={data.password}
            color="text-blue"
            onKeyDown={handleKeyPress}
            isPassword={true}
            type="password"
          />
          {isSubmited && !data.password && (
            <div className="ml-2">
              <p className="text-[10px] text-[red]">{"მიუთითეთ პაროლი"}</p>
            </div>
          )}
        </div>
        <Button
          title={"შესვლა"}
          onClick={() => {}}
          width="md600:w-[500px] w-full"
          bgColor="bg-blue"
          type="submit"
        />
      </div>
    </form>
  );
}

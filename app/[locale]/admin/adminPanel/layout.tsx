"use client";

import { GiExitDoor } from "react-icons/gi";

import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/legacy/image";
import AdminSideMenu from "@/components/admin/AdminSideMenu";
import { axiosAdmin } from "@/utils/AxiosToken";
import useApexAdmin from "@/utils/ApexAdmin";

export default function Layout({ children }: any) {
  const locale = useLocale();

  const navigation = [
    {
      id: 1,
      title: "სიახლეები",
      link: `/${locale}/admin/adminPanel/news`,
    },
    {
      id: 2,
      title: "ლიდები",
      link: `/${locale}/admin/adminPanel/leads`,
    },
    {
      id: 3,
      title: "პარტნიორები",
      link: `/${locale}/admin/adminPanel/partners`,
    },
    {
      id: 4,
      title: "პროექტები",
      link: `/${locale}/admin/adminPanel/projects`,
    },
  ];

  const route = useRouter();
  const pathname = usePathname();
  const { setAdminToken } = useApexAdmin();

  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const logOut = async () => {
    try {
      const response = await axiosAdmin.get("/admin/logOut");

      setAdminToken(null);
      localStorage.removeItem("adminTokenApex");
      route.push(`/${locale}/admin`);
    } catch (err) {}
  };
  return (
    <>
      <div className="bg-blue">
        <div className="w-full px-5 py-3 flex justify-between bg-blue items-center">
          <div className="flex items-center gap-4">
            <RxHamburgerMenu
              className="block lg1110:hidden text-[24px] text-white"
              onClick={() => setIsSideMenuVisible(true)}
            />
            <Link href={`/${locale}`} className="relative lg1110:block hidden">
              <Image src={"/images/logo.png"} width={50} height={50} />
            </Link>
          </div>
          <div className="h-[57px] flex justify-end items-center">
            <div
              className="p-2 rounded-[50%] hover:bg-white text-white hover:text-black duration-200 cursor-pointer"
              onClick={logOut}
            >
              <GiExitDoor className="text-[24px]" />
            </div>
          </div>
        </div>
        <div className="flex items-start w-full h-full">
          <div className="w-[300px] h-[calc(100vh-80px)] px-5 py-10  flex-col gap-2 bg-blue sticky top-0 hidden lg1110:flex">
            {navigation.map((item) => (
              <Link key={item.id} href={item.link}>
                <div
                  className={`flex items-center gap-5 py-3 px-5 duration-300 cursor-pointer rounded-[10px] ${
                    pathname == item.link
                      ? "bg-white text-black"
                      : " text-white hover:bg-[#eee] hover:text-black"
                  }`}
                >
                  <p className="text-[14px] leading-[22px]">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="lg1110:w-[calc(100%-300px)] w-full bg-white min-h-[calc(100vh-70px)] lg1110:rounded-tl-[10px]">
            {children}
          </div>
        </div>
      </div>
      <AdminSideMenu
        isSideMenuVisible={isSideMenuVisible}
        setIsSideMenuVisible={setIsSideMenuVisible}
        nav={navigation}
      />
    </>
  );
}

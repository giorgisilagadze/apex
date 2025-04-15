import Button from "@/components/button/Button";
import PopUpComp from "@/components/popUp/PopUpComp";
import { axiosAdmin } from "@/utils/AxiosToken";
import { useLocale } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { PiPencil } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  item: Partner;
  forRender: number;
  setForRender: (forRender: number) => void;
}

export default function PartnerCard({ item, forRender, setForRender }: Props) {
  const [isDeletePopUpVis, setIsDeletePopUpVis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const locale = useLocale();

  const handleDelete = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const response = await axiosAdmin.delete(`/partner/${item.id}`);
        setForRender(forRender + 1);
        setIsDeletePopUpVis(false);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className=" w-full flex flex-col border-x border-b border border-[#eee] mt-4 rounded-[5px]">
        <div className="w-full p-6 grid grid-cols-4 gap-5 items-center border-b border-[#eee]">
          <div className="relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
              width={100}
              height={80}
              objectFit="cover"
              className="rounded-[5px]"
            />
          </div>
          <p className="text-[14px] font-medium">{item.title}</p>
          <p className="text-[14px] font-medium">
            {item.created_at.slice(0, 10)}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/admin/adminPanel/partners/${item.id}`}
              className="w-10 h-10 rounded-[5px] flex items-center justify-center bg-[#eee] hover:shadow-dropDown duration-300 cursor-pointer"
            >
              <PiPencil className="text-[20px] text-black" />
            </Link>
            <div
              className="w-10 h-10 rounded-[5px] flex items-center justify-center bg-[red] hover:shadow-dropDown duration-300 cursor-pointer"
              onClick={() => setIsDeletePopUpVis(true)}
            >
              <RiDeleteBin6Line className="text-[20px] text-white" />
            </div>
          </div>
        </div>
      </div>
      <PopUpComp
        width="sm:w-[450px] w-[80%]"
        isPopUpVisible={isDeletePopUpVis}
        setIsPopUpVisible={setIsDeletePopUpVis}
      >
        <div className="bg-white rounded-[10px] flex flex-col gap-5 p-5 items-center">
          <p>ნადმვილად გსურთ წაშლა?</p>
          <div className="w-full grid grid-cols-2 gap-5">
            <Button
              title={"არა"}
              onClick={() => setIsDeletePopUpVis(false)}
              width={"w-full"}
              bgColor="bg-[#cdc9c9]"
            />
            <Button
              title={"დიახ"}
              onClick={handleDelete}
              width={"w-full"}
              isLoading={isLoading}
              bgColor="bg-[red]"
            />
          </div>
        </div>
      </PopUpComp>
    </>
  );
}

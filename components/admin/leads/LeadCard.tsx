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
  item: Lead;
  forRender: number;
  setForRender: (forRender: number) => void;
}

export default function LeadCard({ item, forRender, setForRender }: Props) {
  const [isDeletePopUpVis, setIsDeletePopUpVis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusPopUpVis, setIsStatusPopUpVis] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const locale = useLocale();

  const handleDelete = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const response = await axiosAdmin.delete(`/lead/${item.id}`);
        setForRender(forRender + 1);
        setIsDeletePopUpVis(false);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChangeStatus = async () => {
    if (!isStatusLoading) {
      setIsStatusLoading(true);
      try {
        const response = await axiosAdmin.put(`/lead/${item.id}`, {
          status: "approved",
          id: item.id,
        });
        setForRender(forRender + 1);
        setIsStatusPopUpVis(false);
      } catch (err) {
      } finally {
        setIsStatusLoading(false);
      }
    }
  };

  return (
    <>
      <div className=" w-full flex flex-col border-x border-b border border-[#eee] mt-4 rounded-[5px] p-6 gap-4">
        <div className="w-full grid grid-cols-6 gap-5 items-center">
          <p className="text-[14px] font-medium">{item.name}</p>
          <p className="text-[14px] font-medium">{item.phone}</p>
          <p className="text-[14px] font-medium">{item.mail}</p>
          <p className="text-[14px] font-medium">{item.project}</p>
          <p className="text-[14px] font-medium">{item.status}</p>
          <p className="text-[14px] font-medium">
            {item.created_at.slice(0, 10)}
          </p>
        </div>
        <hr className="w-full h-[1px] border-none bg-[#eee]" />
        <div className="flex items-center gap-5">
          {item.status == "waiting" && (
            <Button
              title={"დადასტურება"}
              onClick={() => setIsStatusPopUpVis(true)}
              width={"w-[150px]"}
              bgColor="bg-[green]"
            />
          )}
          <Button
            title={"წაშლა"}
            onClick={() => setIsDeletePopUpVis(true)}
            width={"w-[150px]"}
            bgColor="bg-[red]"
          />
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
      <PopUpComp
        width="sm:w-[450px] w-[80%]"
        isPopUpVisible={isStatusPopUpVis}
        setIsPopUpVisible={setIsStatusPopUpVis}
      >
        <div className="bg-white rounded-[10px] flex flex-col gap-5 p-5 items-center">
          <p>ნადმვილად გსურთ დადასტურება?</p>
          <div className="w-full grid grid-cols-2 gap-5">
            <Button
              title={"არა"}
              onClick={() => setIsStatusPopUpVis(false)}
              width={"w-full"}
              bgColor="bg-[#cdc9c9]"
            />
            <Button
              title={"დიახ"}
              onClick={handleChangeStatus}
              width={"w-full"}
              isLoading={isStatusLoading}
              bgColor="bg-[green]"
            />
          </div>
        </div>
      </PopUpComp>
    </>
  );
}

import Image from "next/legacy/image";
import Button from "../button/Button";

import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function FilterCard() {
  const route = useRouter();
  const locale = useLocale();

  return (
    <>
      <div className="w-full pl-3 pr-8 py-4 lg1110:flex justify-between items-start rounded-[10px] bg-blueOpacityLight hidden">
        <div className="flex items-center gap-3">
          <div className="w-[80px] h-[80px] relative">
            <Image
              src={"/images/apartament.png"}
              alt="apartament"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[14px]">სტუდიო</h1>
            <p className="text-[14px]">#135</p>
            <p className="text-[14px]">57.4მ2</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">ბინის ID: </h1>
            <p className="text-[14px]">4457684</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">სართული: </h1>
            <p className="text-[14px]">11</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="text-[14px]">სტატუსი: </h1>
          <p className="text-[14px]">ხელმისაწვდომი</p>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="text-[14px]">ფასი: </h1>
          <p className="text-[14px]">134.595GEL</p>
        </div>
        <div className="flex self-center ">
          <Button
            title="ბინის ნახვა"
            bgColor="bg-blue"
            color="text-white"
            icon={IoEye}
            onClick={() => route.push(`/${locale}/projects/11/15/12`)}
            width={"w-[150px]"}
            height="h-[40px]"
          />
        </div>
      </div>
      <div className="w-full sm:pl-3 pl-4 sm:pr-8 pr-4 py-4 lg1110:hidden justify-between sm:items-start rounded-[10px] bg-blueOpacityLight sm:flex grid md500:grid-cols-2 grid-cols-1 md600:gap-10 gap-3 items-center">
        <div className="flex items-start gap-3">
          <div className="sm:w-[100px] w-full sm:h-[100px] md600:h-[200px] md500:h-[150px] h-[220px] relative">
            <Image
              src={"/images/apartament.png"}
              alt="apartament"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="sm:flex flex-col gap-3 hidden">
            <h1 className="text-[14px]">სტუდიო</h1>
            <p className="text-[14px]">#135</p>
            <p className="text-[14px]">57.4მ2</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="sm:hidden items-center gap-3 flex">
            <h1 className="text-[14px]">სტუდიო</h1>
            <p className="text-[14px]">#135</p>
            <p className="text-[14px]">57.4მ2</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">ბინის ID: </h1>
            <p className="text-[14px]">4457684</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">სართული: </h1>
            <p className="text-[14px]">11</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">სტატუსი: </h1>
            <p className="text-[14px]">ხელმისაწვდომი</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">ფასი: </h1>
            <p className="text-[14px]">134.595GEL</p>
          </div>
          <div className="sm:hidden self-start flex w-full">
            <Button
              title="ბინის ნახვა"
              bgColor="bg-blue"
              color="text-white"
              icon={IoEye}
              onClick={() => route.push(`/${locale}/projects/11/15/12`)}
              width={"md500:w-[180px] w-full"}
              height="h-[40px]"
            />
          </div>
        </div>
        <div className="sm:flex self-end hidden">
          <Button
            title="ბინის ნახვა"
            bgColor="bg-blue"
            color="text-white"
            icon={IoEye}
            onClick={() => route.push(`/${locale}/projects/11/15/12`)}
            width={"w-[120px]"}
            height="h-[40px]"
          />
        </div>
      </div>
    </>
  );
}

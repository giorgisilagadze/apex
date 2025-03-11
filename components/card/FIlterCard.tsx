import Image from "next/image";
import Button from "../button/Button";

import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function FilterCard() {
  const route = useRouter();
  const locale = useLocale();

  return (
    <div className="w-full pl-3 pr-8 py-4 grid grid-cols-5 items-start gap-3 rounded-[10px] bg-blueOpacityLight">
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
      <div className="w-full h-full flex items-center justify-end">
        <Button
          title="ბინის ნახვა"
          bgColor="bg-blue"
          color="text-white"
          icon={IoEye}
          onClick={() => route.push(`/${locale}/projects/11/15`)}
          width={"w-[150px]"}
          height="h-[40px]"
        />
      </div>
    </div>
  );
}

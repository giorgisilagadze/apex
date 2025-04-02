import Image from "next/legacy/image";
import Button from "../button/Button";

import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface Props {
  item: Apartment;
  selectedCurr: string;
}

export default function FilterCard({ item, selectedCurr }: Props) {
  const route = useRouter();
  const locale = useLocale();

  return (
    <>
      <div className="w-full pl-3 pr-8 py-4 lg1110:flex justify-between items-start rounded-[10px] bg-blueOpacityLight hidden">
        <div className="flex items-center gap-3 w-[246px]">
          <div className="w-[80px] h-[80px] relative">
            <Image
              src={"/images/apartament.png"}
              alt="apartament"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[14px]">{item.type}</h1>
            <p className="text-[14px]">#{item.id}</p>
            <p className="text-[14px]">
              {parseInt(item.area).toFixed(0)}მ<sup>2</sup>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">ბინის ID: </h1>
            <p className="text-[14px]">{item.id}</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">სართული: </h1>
            <p className="text-[14px]">{item.floor}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="text-[14px]">სტატუსი: </h1>
          <p className="text-[14px]">{item.status}</p>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="text-[14px]">ფასი: </h1>
          <p className="text-[14px]">
            {parseInt(
              selectedCurr == "ლარი" ? item.price : item.price2
            ).toFixed(0)}{" "}
            {selectedCurr == "ლარი" ? "GEL" : "USD"}
          </p>
        </div>
        <div className="flex self-center ">
          <Button
            title="ბინის ნახვა"
            bgColor="bg-blue"
            color="text-white"
            icon={IoEye}
            onClick={() =>
              route.push(
                `/${locale}/projects/${item.building_id}/${item.floor_id}/${item.id}`
              )
            }
            width={"w-[150px]"}
            height="h-[40px]"
          />
        </div>
      </div>
      <div className="w-full sm:pl-3 pl-4 sm:pr-8 pr-4 py-4 lg1110:hidden justify-between sm:items-start rounded-[10px] bg-blueOpacityLight sm:flex grid md500:grid-cols-2 grid-cols-1 md600:gap-10 gap-3 items-center">
        <div className="flex items-start gap-3 sm:w-[266px] w-full">
          <div className="sm:w-[100px] w-full sm:h-[100px] md600:h-[200px] md500:h-[150px] h-[220px] relative">
            <Image
              src={"/images/apartament.png"}
              alt="apartament"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="sm:flex flex-col gap-3 hidden">
            <h1 className="text-[14px]">{item.type}</h1>
            <p className="text-[14px]">#{item.id}</p>
            <p className="text-[14px]">
              {parseInt(item.area).toFixed(0)}მ<sup>2</sup>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="sm:hidden items-center gap-3 flex">
            <h1 className="text-[14px]">{item.type}</h1>
            <p className="text-[14px]">#{item.id}</p>
            <p className="text-[14px]">
              {parseInt(item.area).toFixed(0)}მ<sup>2</sup>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">ბინის ID: </h1>
            <p className="text-[14px]">{item.id}</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">სართული: </h1>
            <p className="text-[14px]">{item.floor}</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">სტატუსი: </h1>
            <p className="text-[14px]">{item.status}</p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[14px]">ფასი: </h1>
            <p className="text-[14px]">{parseInt(item.price).toFixed(0)}GEL</p>
          </div>
          <div className="sm:hidden self-start flex w-full">
            <Button
              title="ბინის ნახვა"
              bgColor="bg-blue"
              color="text-white"
              icon={IoEye}
              onClick={() =>
                route.push(
                  `/${locale}/projects/${item.building_id}/${item.floor_id}/${item.id}`
                )
              }
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
            onClick={() =>
              route.push(
                `/${locale}/projects/${item.building_id}/${item.floor_id}/${item.id}`
              )
            }
            width={"w-[120px]"}
            height="h-[40px]"
          />
        </div>
      </div>
    </>
  );
}

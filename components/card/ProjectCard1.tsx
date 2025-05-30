import { useLocale, useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsArrowDown } from "react-icons/bs";

import { IoLocationSharp } from "react-icons/io5";
import { MdSell } from "react-icons/md";

interface Props {
  item: Building;
}

export default function ProjectCard1({ item }: Props) {
  const locale = useLocale();
  const t = useTranslations("ProjectsPage.card");
  const route = useRouter();
  return (
    <div
      className="w-full lg:h-[500px] h-[450px] relative cursor-pointer"
      onClick={() => route.push(`/${locale}/projects/${item.id}`)}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
        alt="image"
        layout="fill"
        objectFit="cover"
        className="rounded-[10px]"
      />

      <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blueOpacity to-transparent rounded-[10px]"></div>
      <div className="w-full h-full absolute top-0 left-0 md500:p-7 p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[30px] text-white font-semibold">
            {locale == "ge"
              ? item.title
              : locale == "en"
              ? item.title_en
              : item.title_ru}
          </p>
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-[16px] text-white" />
            <p className="text-[14px] text-white font-light">
              {locale == "ge" ? item.address : item.address_en}
            </p>
          </div>
        </div>
        <div className="flex lg:items-center sm:items-start md500:items-center justify-between lg:flex-row sm:flex-col md500:flex-row flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p className="text-[22px] text-white font-semibold">
              {t(item.status)}
            </p>
            <div className="w-full h-[1px] bg-white"></div>
            <div className="flex items-center gap-2">
              <MdSell className="text-[16px] text-white" />
              <p className="text-[14px] text-white font-light">
                {t("sold")} {item.sold_percent}%
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/projects/${item.id}`}
            className="px-5 py-3 lg:w-auto sm:w-full w-auto flex items-center gap-5 border border-white rounded-[30px] cursor-pointer hover:opacity-50 duration-300 justify-center"
          >
            <p className="text-[14px] text-white font-light">{t("seeMore")}</p>
            <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-white cursor-pointer">
              <BsArrowDown className="text-white ml-[-26px] text-[26px] -rotate-90" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

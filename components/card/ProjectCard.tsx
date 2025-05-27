import { useLocale, useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";

interface Props {
  item: NewsItem;
  isWhite?: boolean;
}

export default function ProjectCard({ item, isWhite }: Props) {
  const locale = useLocale();
  const t = useTranslations("HomePage.News");
  return (
    <div className="w-full flex flex-col gap-4">
      <Link href={`/${locale}/news/${item.id}`} className="w-full">
        <div className="w-full xl:h-[350px] lg1250:h-[300px] lg:h-[350px] md600:h-[300px] h-[350px] relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
            alt="card-image"
            layout="fill"
            objectFit="cover"
            className="rounded-[10px] cursor-pointer"
          />
          <div
            className={`absolute top-0 right-0 rounded-tr-[10px] rounded-bl-[10px] ${
              isWhite ? "bg-white" : "bg-black"
            } px-5 py-2`}
          >
            <p
              className={`text-[14px] font-light ${
                isWhite ? "text-blue" : "text-white"
              }`}
            >
              {t(item.type)}
            </p>
          </div>
        </div>
      </Link>
      <div className="w-full flex flex-col gap-1">
        <p className={`text-[14px] ${isWhite ? "text-white" : "text-blue"}`}>
          {item.created_at.slice(0, 10).replaceAll("-", ".")}
        </p>
        <p
          className={`text-[20px] font-bold sm:truncate sm:text-ellipsis ${
            isWhite ? "text-white" : "text-black"
          }`}
        >
          {locale == "ge"
            ? item.title
            : locale == "en"
            ? item.title_en
            : item.text_ru}
        </p>
        <Link href={`/${locale}/news/${item.id}`}>
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-50 duration-300">
            <div
              className={`w-[30px] h-[1px] mt-[3px] ${
                isWhite ? "bg-white" : "bg-black"
              }`}
            ></div>
            <p
              className={`text-[14px] font-light ${
                isWhite ? "text-white" : "text-black"
              }`}
            >
              {t("more")}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

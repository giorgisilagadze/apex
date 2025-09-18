import { useLocale, useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";

interface Props {
  item: NewsItem;
  isWhite?: boolean;
  height?: string;
  isSingle?: boolean;
}

export default function ProjectCard({
  item,
  isWhite,
  height,
  isSingle,
}: Props) {
  const locale = useLocale();
  const t = useTranslations("HomePage.News");
  return (
    <div className={`w-full ${height} flex flex-col gap-4 relative`}>
      <Link href={`/${locale}/news/${item.id}`} className="w-full">
        <div className={`w-full ${height} relative`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
            alt="card-image"
            layout="fill"
            objectFit="cover"
            className="rounded-[10px] cursor-pointer"
          />
          {/* <div
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
          </div> */}
        </div>
      </Link>
      <div
        className={`w-full flex flex-col gap-1 absolute ${
          isSingle ? "bottom-8 pl-8 pr-5" : "bottom-5 pl-5 pr-5"
        }`}
      >
        <p
          className={`text-[14px] opacity-70 ${
            isWhite ? "text-white" : "text-blue"
          }`}
        >
          {item.created_at.slice(0, 10).replaceAll("-", ".")}
        </p>
        <h1
          className={`${
            isSingle ? "text-[26px]" : "sm:text-[22px] text-[18px]"
          } font-bold ${isWhite ? "text-white" : "text-black"}`}
          style={{ textShadow: "3px 3px 3px black" }}
        >
          {locale == "ge"
            ? item.title
            : locale == "en"
            ? item.title_en
            : item.text_ru}
        </h1>
        {/* <Link href={`/${locale}/news/${item.id}`}>
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
        </Link> */}
      </div>
    </div>
  );
}

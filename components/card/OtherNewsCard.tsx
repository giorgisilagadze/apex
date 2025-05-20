import { useLocale, useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";

interface Props {
  item: NewsItem;
}

export default function OtherNewsCard({ item }: Props) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/news/${item.id}`}
      className="w-full flex item gap-3 hover:opacity-50 duration-300"
    >
      <div className="w-[90px] h-[80px] relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          className="rounded-[10px]"
        />
      </div>
      <div className="flex flex-col gap-1 sm:max-w-[180px] max-w-[70%]">
        <p className="text-[14px] font-light line-clamp-3">
          {locale == "ge"
            ? item.title
            : locale == "en"
            ? item.title_en
            : item.title_ru}
        </p>
        <p className="text-[14px] text-blue">
          {" "}
          {item.created_at.slice(0, 10).replaceAll("-", ".")}
        </p>
      </div>
    </Link>
  );
}

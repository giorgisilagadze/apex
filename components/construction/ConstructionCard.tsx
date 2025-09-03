import { useLocale, useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

interface Props {
  item: Construction;
}

export default function ConstructionCard({ item }: Props) {
  const t = useTranslations("constructionPage");
  const locale = useLocale();
  return (
    <div className="w-full sm:h-[350px] md600:h-[300px] h-[350px] relative">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
        alt="project-image"
        layout="fill"
        objectFit="cover"
        className="rounded-[10px]"
      />
      <div className="w-full h-full flex flex-col items-center justify-between py-8">
        <h1 className="sm:text-[26px] text-[20px] text-white z-[1]">
          {locale == "ge"
            ? item.title
            : locale == "en"
            ? item.title_en
            : item.title_ru}
        </h1>
        <Link href={`/${locale}/construction/${item.id}`}>
          <div className="sm:w-[220px] sm:h-[50px] w-[180px] h-[44px] rounded-[30px] flex items-center justify-center gap-1 bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] hover:opacity-80 duration-300 cursor-pointer">
            <p className="sm:text-[14px] text-[12px] text-white">
              {t("seeTheProcess")}
            </p>
            <IoArrowForwardCircleOutline className="text-[20px] text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
}

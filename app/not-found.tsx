import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations("404");
  return (
    <div className="w-full h-[calc(100vh-137px)] rounded-tl-[50px] rounded-tr-[50px] flex items-center justify-center flex-col sm:gap-7 gap-5 mt-[-50px] bg-white px-6">
      <h1 className="lg:text-[180px] text-[100px] text-blue">404</h1>
      <p className="lg:text-[32px] text-[24px]  text-mainColor mt-[-40px] text-center">
        {t("text")}
      </p>
      <Link href={`/${locale}`}>
        <button
          className={`w-[250px] bg-blue text-white h-[54px] rounded-[10px] flex items-center justify-center gap-2  hover:shadow-dropDown duration-300 `}
        >
          <div className="flex items-center justify-center gap-2">
            <p className="text-[14px]">{t("button")}</p>
          </div>
        </button>
      </Link>
    </div>
  );
}

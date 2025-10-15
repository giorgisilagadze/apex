import { useLocale, useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";

export default function Change() {
  const t = useTranslations("Change");
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}/replace-with-new`}
      className="fixed xl1600:top-3/4 xl1600:-translate-y-3/4 top-[90%] -translate-y-[90%] right-[50px] z-[4] lg:flex hidden cursor-pointer duration-300 w-[110px] h-[110px] rounded-[50%] bg-[#01bc54] hover:bg-[#019e47]"
    >
      <div className="w-full flex flex-col gap-1 items-center pt-5">
        <h1 className="text-[16px] text-white text-center">{t("title")}</h1>
        <div className="relative">
          <Image src={"/images/change.png"} width={50} height={50} />
        </div>
      </div>
    </Link>
  );
}

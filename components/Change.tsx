import { useTranslations } from "next-intl";
import Image from "next/legacy/image";

export default function Change() {
  const t = useTranslations("Change");
  return (
    <div className="fixed xl1600:top-3/4 xl1600:-translate-y-3/4 top-[90%] -translate-y-[90%] right-[50px] z-[4] lg:flex hidden cursor-pointer hover:opacity-80 duration-300">
      <div className="relative">
        <Image src={"/images/green.png"} width={150} height={150} />
      </div>
      <h1 className="text-[16px] text-white absolute top-1/2 -translate-y-1/2 left-6 max-w-[110px] text-center">
        {t("title")}
      </h1>
    </div>
  );
}

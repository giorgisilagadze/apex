import { useTranslations } from "next-intl";
import Image from "next/legacy/image";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export default function ConstructionCard() {
  const t = useTranslations("constructionPage");
  return (
    <div className="w-full sm:h-[350px] md600:h-[300px] h-[350px] relative">
      <Image
        src={"/images/contact.png"}
        alt="project-image"
        layout="fill"
        objectFit="cover"
        className="rounded-[10px]"
      />
      <div className="w-full h-full flex flex-col items-center justify-between py-8">
        <h1 className="sm:text-[26px] text-[20px] text-white z-[1]">
          აპექს დიდი დიღომი
        </h1>
        <div className="sm:w-[220px] sm:h-[50px] w-[180px] h-[44px] rounded-[30px] flex items-center justify-center gap-1 bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] hover:opacity-80 duration-300 cursor-pointer">
          <p className="sm:text-[14px] text-[12px] text-white">
            {t("seeTheProcess")}
          </p>
          <IoArrowForwardCircleOutline className="text-[20px] text-white" />
        </div>
      </div>
    </div>
  );
}

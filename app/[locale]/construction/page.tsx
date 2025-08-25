import ConstructionCard from "@/components/construction/ConstructionCard";
import { useTranslations } from "next-intl";
import Image from "next/legacy/image";

export default function Construction() {
  const t = useTranslations("constructionPage");
  return (
    <div className="w-full">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/construction.jpg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            {t("title")}
          </h1>
          <p className="text-[14px] text-white sm:self-center">{t("page")}</p>
        </div>
      </div>
      <div className="w-full sm:py-[60px] py-10  xl1600:px-[140px] lg1250:px-[100px] lg:px-[100px] sm:px-[64px] px-6 grid lg1250:grid-cols-3 md600:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ConstructionCard key={item} />
        ))}
      </div>
    </div>
  );
}

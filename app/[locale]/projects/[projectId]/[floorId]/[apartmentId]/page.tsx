import SendEmail from "@/components/SendEmail";
import Info from "@/components/apartment/Info";
import ROICalculator from "@/components/calculator/ROICalculator";
import Contact from "@/components/home/Contact";
import GallerySwiper from "@/components/singleProject/GallerySwiper";
import { FetchSingleApartment } from "@/serverside/FetchSingleApartment";
import { getTranslations } from "next-intl/server";
import Image from "next/legacy/image";

export default async function Apartment({
  params,
}: {
  params: Promise<{ apartmentId: string }>;
}) {
  const apartmentId = (await params).apartmentId;

  const apartment: Apartment1 = await FetchSingleApartment(apartmentId);

  const t = await getTranslations("SingleApartmnet");

  return (
    <div className="w-full">
      <div className="w-full pb-[80px] lg1110:pt-[200px] pt-[150px] bg-blue flex justify-between flex-col lg1110:flex-row xl1600:pr-[140px] lg1110:pr-[80px] sm:pr-6 lg1110:items-center gap-6">
        <div className="lg1250:w-[650px] sm:w-[550px] w-full col-span-2 ">
          <Info apartment={apartment} />
        </div>
        <div className="xl:w-[700px] xl:h-[680px] lg1110:w-[550px] lg1110:h-[450px] w-full aspect-[630/550] sm:aspect-[450/350] lg1110:aspect-auto relative col-span-3 self-center">
          <Image
            // src={"/images/apartament.png"}
            src={`${process.env.NEXT_PUBLIC_API_URL}/${apartment.img}`}
            alt="apartament"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      {/* <div
          className={`w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 relative sm:py-[80px] py-[60px] bg-blueOpacityLight`}
        >
          <Image
            src={"/images/pattern_bg.png"}
            alt="bg"
            layout="fill"
            objectFit="cover"
            className="z-[-1]"
          />
          <ROICalculator apartment={apartment} />
        </div> */}
      {/* <SendEmail /> */}
      {apartment.buildingR.galery.length !== 0 && (
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex flex-col gap-8 items-center sm:py-[60px] py-10">
          <h1 className="sm:text-[30px] text-[24px]">{t("projectGallery")}</h1>
          <GallerySwiper images={apartment.buildingR.galery} />
        </div>
      )}
      <Contact />
    </div>
  );
}

import SendEmail from "@/components/SendEmail";
import Button from "@/components/button/Button";
import Filter from "@/components/filter/Filter";
import Contact from "@/components/home/Contact";
import GallerySwiper from "@/components/singleProject/GallerySwiper";
import MapImage from "@/components/singleProject/MapImage";
import OtherProjects from "@/components/singleProject/OtherProjects";
import SaleInfo from "@/components/singleProject/SaleInfo";

import Image from "next/image";

export default async function SingleProject({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;

  return (
    <div className="w-full">
      <div className="w-full sm:h-[900px] h-[300px] grid grid-cols-5">
        <SaleInfo
          title="აპექს
დიდი დიღომი"
          subtitle="მიმდინარე"
        />
        <div className="w-full h-full col-span-3">
          <MapImage />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[60px]">
        <div className="w-full py-[80px] bg-blueOpacityLight">
          <Filter />
        </div>
        <div className="w-full flex items-center">
          <div className="w-[70%] h-[650px] relative">
            <Image
              src={"/images/apartment2.jpeg"}
              alt="project-image"
              layout="fill"
              objectFit="cover"
              className="rounded-tr-[10px] rounded-br-[10px]"
            />
          </div>
          <div className="p-[60px] max-w-[550px] flex flex-col gap-4 bg-[rgba(237,240,244,1)] ml-[-100px] z-[1] rounded-[10px]">
            <div className="flex items-center gap-3">
              <div className="w-[50px] h-[1px] bg-blue"></div>
              <p className="text-[14px] text-blue font-light">
                პროექტის შესახებ
              </p>
            </div>
            <h1 className="sm:text-[30px] text-[24px] text-blue">
              რატომ აპექს დიდი დიღომი?
            </h1>
            <p className="text-[14px] text-blue">
              APEX Development-ში საშემოდგომო შეთავაზება დაიწყო! შეარჩიე
              სასურველი ბინა მშენებარე პროექტში 'აპექს ისანი' ან 'აპექს
              ნუცუბიძე' და ისარგებლე აქციის პირობით: ერთიანი გადახდისას მიიღეთ
              კვადრატულზე $150-იანი ფასდაკლება, ხოლო 50%-იანი წინასწარი
              შენატანისას ისარგებლეთ $75-იანი ფასდაკლებით. აქციია მოქმედებს
              შერჩეულ ბინებზე, როგორც ერთ-საძინებლიან, ასევე დიდ ბინებზე.
              შეგახსენებთ, რომ კომპლექსში 'აპექს ნუცუბიძე' ბინები 42,3კვ.მ-დან
              იწყება, ხოლო პროექტში 'აპექს ისანი' ბინები 47კვ.მ-დან შეგიძლიათ
              შეიძინოთ.
            </p>
          </div>
        </div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex flex-col gap-8 items-center">
          <h1 className="sm:text-[30px] text-[24px]">პროექტის გალერეა</h1>
          <GallerySwiper />
        </div>
        <div className="mt-[60px]">
          <OtherProjects />
        </div>
        <Contact />
        <SendEmail />
      </div>
    </div>
  );
}

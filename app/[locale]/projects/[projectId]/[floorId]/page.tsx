import SendEmail from "@/components/SendEmail";
import Filter from "@/components/filter/Filter";
import Contact from "@/components/home/Contact";
import SaleInfo from "@/components/singleProject/SaleInfo";
import Image from "next/legacy/image";

export default async function SingleFloor({
  params,
}: {
  params: Promise<{ floorId: string }>;
}) {
  const floorId = (await params).floorId;

  return (
    <div className="w-full">
      <div className="w-full">
        <SaleInfo
          title={`სართული ${floorId}`}
          subtitle="აპექს დიდი დიღომი"
          isfloor={true}
        />
        <div className="w-full py-[60px] xl1600:px-[240px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6">
          <div className="w-full h-[400px]  relative overflow-hidden">
            <Image
              src="/images/floor.png"
              alt="project-image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[100px]">
        <div className="w-full bg-blueOpacityLight">
          <Filter page="floor" />
        </div>
        <Contact />
        <SendEmail />
      </div>
    </div>
  );
}

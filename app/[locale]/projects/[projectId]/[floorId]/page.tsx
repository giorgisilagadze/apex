import SendEmail from "@/components/SendEmail";
import Filter from "@/components/filter/Filter";
import Contact from "@/components/home/Contact";
import MapImage from "@/components/singleProject/MapImage";
import SaleInfo from "@/components/singleProject/SaleInfo";
import { FetchSingleFloor } from "@/serverside/FetchSingleFloor";
import Image from "next/legacy/image";

export default async function SingleFloor({
  params,
}: {
  params: Promise<{ projectId: string; floorId: string }>;
}) {
  const floorId = (await params).floorId;
  const projectId = (await params).projectId;

  const floor = await FetchSingleFloor(floorId);

  return (
    <div className="w-full">
      <div className="w-full">
        <SaleInfo
          title={`სართული ${floor.title}`}
          subtitle="აპექს დიდი დიღომი"
          isfloor={true}
          donePerc="70"
          soldPerc="20"
        />
        <div className="w-full py-[60px] xl1600:px-[240px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6">
          <div className="w-full">
            <MapImage
              image={floor.img}
              id={`${projectId}/${floorId}`}
              map={floor.mapingJson}
              isFloor={true}
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

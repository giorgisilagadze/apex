import SendEmail from "@/components/SendEmail";
import Info from "@/components/apartment/Info";
import Contact from "@/components/home/Contact";
import Image from "next/image";

export default async function Apartment({
  params,
}: {
  params: Promise<{ apartmentId: string }>;
}) {
  const apartmentId = (await params).apartmentId;

  return (
    <div className="w-full">
      <div className="w-full pb-[80px] lg1110:pt-[200px] pt-[150px] bg-blue flex justify-between flex-col lg1110:flex-row xl1600:pr-[140px] lg1110:pr-[80px] sm:pr-6 lg1110:items-center gap-6">
        <div className="lg1250:w-[650px] sm:w-[550px] w-full col-span-2 ">
          <Info />
        </div>
        <div className="xl:w-[700px] xl:h-[680px] lg1110:w-[550px] lg1110:h-[450px] w-full aspect-[630/550] sm:aspect-[450/350] lg1110:aspect-auto relative col-span-3 self-center">
          <Image
            src={"/images/apartament.png"}
            alt="apartament"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[200px] pt-[100px]">
        <Contact />
        <SendEmail />
      </div>
    </div>
  );
}

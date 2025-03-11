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
      <div className="w-full pb-[80px] pt-[200px] bg-blue grid grid-cols-5 gap-[200px] pr-[140px] items-start">
        <div className="w-full col-span-2">
          <Info />
        </div>
        <div className="w-full h-[680px] relative col-span-3">
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

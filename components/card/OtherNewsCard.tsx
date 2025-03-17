import Image from "next/legacy/image";

export default function OtherNewsCard() {
  return (
    <div className="w-full flex item gap-3">
      <div className="w-[90px] h-[80px] relative">
        <Image
          src={"/images/swiper2.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          className="rounded-[10px]"
        />
      </div>
      <div className="flex flex-col gap-1 max-w-[180px]">
        <p className="text-[14px] font-light">
          აპექს დეველოპმენტის ახალი პროექტები
        </p>
        <p className="text-[14px] text-blue">07.02.2025</p>
      </div>
    </div>
  );
}

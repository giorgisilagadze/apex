import Image from "next/image";

export default function ProjectCard() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full h-[350px] relative">
        <Image
          src={"/images/card.png"}
          alt="card-image"
          layout="fill"
          objectFit="cover"
          className="rounded-[10px] cursor-pointer"
        />
        <div className="absolute top-0 right-0 rounded-tr-[10px] rounded-bl-[10px] bg-black px-5 py-2">
          <p className="text-[14px] text-white font-light">პროექტები</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1">
        <p className="text-[14px] text-blue">07.02.2025</p>
        <p className="text-[20px] font-bold">
          საშემოდგომო შეთავაზებები დაიწყო!
        </p>
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-50 duration-300">
          <div className="w-[30px] h-[1px] bg-black mt-[3px]"></div>
          <p className="text-[14px] font-light">მეტის ნახვა</p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/legacy/image";
import { PiPencil } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function NewsCard() {
  return (
    <div className=" w-full flex flex-col border-x border-b border border-[#eee] mt-4 rounded-[5px]">
      <div className="w-full p-6 grid grid-cols-4 gap-5 items-center border-b border-[#eee]">
        <div className="relative">
          <Image src={"/images/card.png"} width={80} height={80} />
        </div>
        <p className="text-[14px] font-medium">
          საშემოდგომო შეთავაზებები დაიწყო!
        </p>
        <p className="text-[14px] font-medium">07-02-2025</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[5px] flex items-center justify-center bg-[#eee] hover:shadow-dropDown duration-300 cursor-pointer">
            <PiPencil className="text-[20px] text-black" />
          </div>
          <div className="w-10 h-10 rounded-[5px] flex items-center justify-center bg-[red] hover:shadow-dropDown duration-300 cursor-pointer">
            <RiDeleteBin6Line className="text-[20px] text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

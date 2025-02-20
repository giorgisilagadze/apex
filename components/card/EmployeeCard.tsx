import Image from "next/image";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function EmployeeCard() {
  return (
    <div className="w-full h-[400px] relative">
      <Image
        src={"/images/employee.jpeg"}
        alt="employee"
        layout="fill"
        objectFit="cover"
        className="rounded-[10px]"
      />
      <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] rounded-[10px]"></div>
      <div className="absolute left-6 bottom-10 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <FaFacebookF className="text-[14px] text-white hover:opacity-50 duration-300 cursor-pointer" />
          <FaLinkedinIn className="text-[14px] text-white hover:opacity-50 duration-300 cursor-pointer" />
        </div>
        <p className="text-[12px] text-white font-light mt-1">
          გაყიდვების მენეჯერი
        </p>
        <p className="text-[14px] text-white font-bold">გიორგი ქევხიშვილი</p>
      </div>
    </div>
  );
}

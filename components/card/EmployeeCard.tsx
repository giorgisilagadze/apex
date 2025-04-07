import Image from "next/legacy/image";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

interface Employee {
  id: number;
  name: string;
  position: string;
  image: string;
}

interface Props {
  item: Employee;
}

export default function EmployeeCard({ item }: Props) {
  return (
    <div className="w-full xl1680:h-[400px] xl:h-[350px] lg:h-[400px] h-[350px] relative">
      <Image
        src={item.image}
        alt="employee"
        layout="fill"
        objectFit="cover"
        className="rounded-[10px]"
      />
      <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] rounded-[10px]"></div>
      <div className="absolute left-4 bottom-6 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <FaFacebookF className="text-[14px] text-white hover:opacity-50 duration-300 cursor-pointer" />
          <FaLinkedinIn className="text-[14px] text-white hover:opacity-50 duration-300 cursor-pointer" />
        </div>
        <p className="text-[12px] text-white font-light mt-1">
          {item.position}
        </p>
        <p className="text-[14px] text-white font-bold">{item.name}</p>
      </div>
    </div>
  );
}

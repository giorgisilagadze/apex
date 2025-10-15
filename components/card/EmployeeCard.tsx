import { useLocale } from "next-intl";
import Image from "next/legacy/image";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

interface Props {
  item: EmployeeProfile;
}

export default function EmployeeCard({ item }: Props) {
  const locale = useLocale();
  return (
    <div className="w-full xl1680:h-[400px] xl:h-[350px] lg:h-[400px] h-[350px] relative">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
        alt="employee"
        layout="fill"
        objectFit="cover"
        className="rounded-[10px]"
      />
      <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] rounded-[10px]"></div>
      <div className="absolute left-4 bottom-6 flex flex-col gap-1">
        {/* <div className="flex items-center gap-3">
          <FaFacebookF className="text-[14px] text-white hover:opacity-50 duration-300 cursor-pointer" />
          <FaLinkedinIn className="text-[14px] text-white hover:opacity-50 duration-300 cursor-pointer" />
        </div> */}
        <p className="text-[12px] text-white font-light mt-1">
          {locale == "ka" ? item.position : item.position_en}
        </p>
        <p className="text-[14px] text-white font-bold">
          {locale == "ka" ? item.name : item.name_en}
        </p>
      </div>
    </div>
  );
}

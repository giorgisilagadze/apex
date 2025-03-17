import ProjectCard from "../card/ProjectCard";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function News() {
  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[120px] py-[60px] flex flex-col gap-8 bg-blueOpacityLight sm:mt-[-100px] mt-[-60px]">
      <div className="w-full flex items-end justify-between">
        <div className="w-full flex flex-col gap-2">
          <div className="items-center gap-3 hidden sm:flex">
            <div className="w-[50px] h-[1px] bg-blue"></div>
            <p className="text-[14px] text-blue font-light">ბლოგი</p>
          </div>
          <h1 className="sm:text-[30px] text-[24px] font-semibold">
            სიახლეები
          </h1>
        </div>
        <div className="flex items-center sm:gap-3 gap-1">
          <div className="w-[50px] h-[1px] bg-black mt-[3px] hidden sm:block"></div>
          <MdOutlineRemoveRedEye className="sm:hidden mt-[-2px]" />
          <p className="text-[14px] font-light whitespace-nowrap">
            ყველას ნახვა
          </p>
        </div>
      </div>
      <div className="w-full grid lg1250:grid-cols-3 md600:grid-cols-2 gap-x-5 gap-y-8">
        {[1, 2, 3].map((item) => (
          <ProjectCard key={item} />
        ))}
      </div>
    </div>
  );
}

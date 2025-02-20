import ProjectCard from "../card/ProjectCard";

export default function News() {
  return (
    <div className="w-full px-[330px] py-[120px] flex flex-col gap-8 bg-blueOpacityLight mt-[-100px]">
      <div className="w-full flex items-end justify-between">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[1px] bg-blue"></div>
            <p className="text-[14px] text-blue font-light">ბლოგი</p>
          </div>
          <h1 className="text-[30px] font-semibold">სიახლეები</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[50px] h-[1px] bg-black mt-[3px]"></div>
          <p className="text-[14px] font-light whitespace-nowrap">
            ყველას ნახვა
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <ProjectCard key={item} />
        ))}
      </div>
    </div>
  );
}

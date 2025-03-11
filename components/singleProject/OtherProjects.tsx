import ProjectCard1 from "../card/ProjectCard1";

export default function OtherProjects() {
  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 py-[80px] flex flex-col items-center gap-8 bg-blueOpacityLight sm:mt-[-100px] mt-[-60px]">
      <h1 className="sm:text-[30px] text-[24px]">სხვა პროექტები</h1>
      <div className="w-full grid sm:grid-cols-2 gap-x-5 gap-y-8">
        {[1, 2].map((item) => (
          <ProjectCard1 key={item} />
        ))}
      </div>
    </div>
  );
}

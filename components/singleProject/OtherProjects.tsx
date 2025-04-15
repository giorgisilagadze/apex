import { FetchProjects } from "@/serverside/FetchProjects";
import ProjectCard1 from "../card/ProjectCard1";

export default async function OtherProjects() {
  const projects: Building[] = await FetchProjects();
  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[80px] py-10 flex flex-col items-center gap-8 bg-blueOpacityLight sm:mt-[-100px] mt-[-60px]">
      <h1 className="sm:text-[30px] text-[24px]">სხვა პროექტები</h1>
      <div className="w-full grid sm:grid-cols-2 gap-x-5 gap-y-8">
        {projects.map((item) => (
          <ProjectCard1 key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

import { FetchProjects } from "@/serverside/FetchProjects";
import ProjectCard1 from "../card/ProjectCard1";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

interface Props {
  projectId: string;
}

export default async function OtherProjects({ projectId }: Props) {
  const projects: Building[] = await FetchProjects();
  const t = await getTranslations("ProjectsPage");
  return (
    <div className="w-full xl1600:px-[250px] lg:px-[80px] sm:px-[64px] px-6 sm:py-[80px] py-10 flex flex-col items-center gap-8 bg-blueOpacityLight sm:mt-[-100px] mt-[-60px]">
      <h1 className="sm:text-[30px] text-[24px]">{t("other")}</h1>
      <div className="w-full grid lg1250:grid-cols-3 md600:grid-cols-2 gap-x-5 gap-y-8">
        {projects
          .filter((item: Building) => item.id !== parseInt(projectId))
          .slice(0, 3)
          .map((item) => (
            <ProjectCard1 key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

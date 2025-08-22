import SendEmail from "@/components/SendEmail";
import Button from "@/components/button/Button";
import ROICalculator from "@/components/calculator/ROICalculator";
import Filter from "@/components/filter/Filter";
import Contact from "@/components/home/Contact";
import GallerySwiper from "@/components/singleProject/GallerySwiper";
import MapImage from "@/components/singleProject/MapImage";
import OtherProjects from "@/components/singleProject/OtherProjects";
import SaleInfo from "@/components/singleProject/SaleInfo";
import { FetchSingleProject } from "@/serverside/FetchSingleProject";
import { getLocale, getTranslations } from "next-intl/server";

import Image from "next/legacy/image";

export default async function SingleProject({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;
  const project: Building = await FetchSingleProject(projectId);
  const locale = await getLocale();
  const t = await getTranslations("SingleProject");

  console.log(project);

  return (
    <div className="w-full">
      <div className="w-full grid lg1110:grid-cols-5">
        <SaleInfo
          title={
            locale == "ge"
              ? project.title
              : locale == "en"
              ? project.title_en
              : project.title_ru
          }
          subtitle={t(project.status)}
          soldPerc={project.sold_percent}
          donePerc={project.finish_percent}
        />
        <div className="w-full lg1110:col-span-3">
          <MapImage
            image={project.img}
            id={projectId}
            map={project.mapingJson}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[60px]">
        <div className="w-full bg-blueOpacityLight">
          <Filter page="project" />
        </div>
        {project.galery.length !== 0 && (
          <div className="w-full flex items-center flex-col md500:flex-row">
            <div className="md500:w-[70%] w-full md600:h-[650px] h-[550px] relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${project.galery[0].url}`}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="md500:rounded-tr-[10px] md500:rounded-br-[10px]"
              />
              <div className="w-full h-full bg-[rgba(0,0,0,0.4)] backdrop-blur-[10px] z-[1] md500:rounded-tr-[10px] md500:rounded-br-[10px]"></div>
              <div className="w-[67%] z-[2] absolute top-1/2 -translate-y-1/2 left-[100px]">
                <ROICalculator
                  apartment={{} as Apartment1}
                  projectName={
                    locale == "ge"
                      ? project.title
                      : locale == "en"
                      ? project.title_en
                      : project.title_ru
                  }
                />
              </div>
            </div>
            <div className="sm:p-[60px] p-10 sm:max-w-[550px] max-w-[450px] flex flex-col gap-4 bg-[rgba(237,240,244,1)] lg:ml-[-100px] md600:ml-[-200px] md500:ml-[-300px] z-[1] md500:rounded-[10px]">
              <div className="flex items-center gap-3">
                <div className="w-[50px] h-[1px] bg-blue"></div>
                <p className="text-[14px] text-blue font-light">{t("about")}</p>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    locale == "ge"
                      ? project.text
                      : locale == "en"
                      ? project.text_en
                      : project.text_ru,
                }}
                className="editor text-blue"
              />
            </div>
          </div>
        )}
        {project.galery.length !== 0 && (
          <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex flex-col gap-8 items-center">
            <h1 className="sm:text-[30px] text-[24px]">
              {t("projectGallery")}
            </h1>
            <GallerySwiper images={project.galery} />
          </div>
        )}
        <div className="mt-[60px]">
          <OtherProjects projectId={projectId} />
        </div>
      </div>
      <Contact />
    </div>
  );
}

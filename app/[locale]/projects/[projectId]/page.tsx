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

  return (
    <div className="w-full">
      <div className="w-full grid lg1110:grid-cols-5">
        <SaleInfo
          title={
            locale == "ka"
              ? project.title
              : locale == "en"
              ? project.title_en
              : project.title_ru
          }
          subtitle={t(project.status)}
          soldPerc={project.sold_percent}
          donePerc={project.finish_percent}
          presentationGeo={project.presentation}
          presenatationEng={project.presentation_en}
          arcikadGeo={project.arcikadi}
          arcikadEng={project.arcikadi_en}
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
          <div className="w-full flex items-center flex-col lg1110:flex-row">
            <div className="lg1110:w-[70%] w-full lg1110:h-[650px] md500:h-[550px] h-[680px] relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${project.galery[0].url}`}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="md500:rounded-tr-[10px] md500:rounded-br-[10px]"
              />
              <div className="w-full h-full bg-[rgba(0,0,0,0.4)] backdrop-blur-[10px] z-[1] lg1110:rounded-tr-[10px] lg1110:rounded-br-[10px]"></div>
              <div className="sm:w-[67%] w-full z-[2] absolute top-1/2 -translate-y-1/2 lg1110:left-[100px] md500:px-10 px-6 lg1110:px-0">
                <ROICalculator
                  project={project}
                  projectName={
                    locale == "ka"
                      ? project.title
                      : locale == "en"
                      ? project.title_en
                      : project.title_ru
                  }
                />
              </div>
            </div>
            <div className="sm:p-[60px] p-10 lg1110:max-w-[550px] w-full flex flex-col gap-4 bg-[rgba(237,240,244,1)] lg1110:ml-[-100px] z-[1] lg1110:rounded-[10px]">
              <div className="flex items-center gap-3">
                <div className="w-[50px] h-[1px] bg-blue"></div>
                <p className="text-[14px] text-blue font-light">{t("about")}</p>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    locale == "ka"
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

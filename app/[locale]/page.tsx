import Change from "@/components/Change";
import SendEmail from "@/components/SendEmail";
import ROICalculatorMain from "@/components/calculator/ROICalculatorMain";
import Filter from "@/components/filter/Filter";
import AboutUsComp from "@/components/home/AboutUsComp";
import Contact from "@/components/home/Contact";
import Italy from "@/components/home/Italy";
import MainSwiper from "@/components/home/MainSwiper";
import News from "@/components/home/News";
import Partners from "@/components/home/Partners";
import Projects from "@/components/home/Projects";
import { FetchNews } from "@/serverside/FetchNews";
import { FetchProjects } from "@/serverside/FetchProjects";
import Image from "next/legacy/image";

export default async function Home() {
  const news = await FetchNews();
  const projects = await FetchProjects();

  return (
    <div className="w-full">
      <Change />
      <MainSwiper />
      <div className="w-full z-[2] relative lg1250:top-[-130px] top-[-220px] xl1600:px-[100px] lg1350:px-[140px] lg1110:px-[80px]">
        <Filter page="home" />
      </div>
      <div className="w-full mt-[-198px]">
        <Projects
          projects={projects.filter(
            (item: Building) => (item.status = "მიმდინარე")
          )}
        />
      </div>
      {/* <AboutUsComp /> */}
      <Italy />
      <News news={news.data.slice(0, 5)} />
      <Contact />
      {/* <Partners /> */}
      {/* <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6">
          <ROICalculatorMain projects={projects} />
        </div> */}
      {/* <SendEmail /> */}
    </div>
  );
}

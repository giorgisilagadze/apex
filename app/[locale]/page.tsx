import SendEmail from "@/components/SendEmail";
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
      <MainSwiper />
      <div className="w-full sm:py-[100px] py-[60px] relative">
        <div className="w-full z-[1] relative">
          <Filter page="home" />
        </div>
        <div className="absolute top-0 left-0 z-[0]">
          <div className="w-[300px] h-[200px] relative">
            <Image
              src={"/images/4.png"}
              alt="bg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-[0]">
          <div className="w-[500px] h-[200px] relative">
            <Image
              src={"/images/1.png"}
              alt="bg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col sm:gap-[100px] gap-[60px]">
        <Projects projects={projects} />
        <AboutUsComp />
        <Italy />
        <News news={news.data.slice(0, 3)} />
        <Contact />
        <Partners />
        <SendEmail />
      </div>
    </div>
  );
}

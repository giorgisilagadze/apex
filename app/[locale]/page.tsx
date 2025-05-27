import SendEmail from "@/components/SendEmail";
import Filter from "@/components/filter/Filter";
import AboutUsComp from "@/components/home/AboutUsComp";
import Contact from "@/components/home/Contact";
import Italy from "@/components/home/Italy";
import MainSwiper from "@/components/home/MainSwiper";
import News from "@/components/home/News";
import Projects from "@/components/home/Projects";
import { FetchNews } from "@/serverside/FetchNews";
import { FetchProjects } from "@/serverside/FetchProjects";

export default async function Home() {
  const news = await FetchNews();
  const projects = await FetchProjects();

  return (
    <div className="w-full flex flex-col sm:gap-[100px] gap-[60px]">
      <MainSwiper />
      <Filter page="home" />
      <Projects projects={projects} />
      <AboutUsComp />
      <Italy />
      <News news={news.data.slice(0, 3)} />
      <Contact />
      <SendEmail />
    </div>
  );
}

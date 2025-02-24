import SendEmail from "@/components/SendEmail";
import Filter from "@/components/filter/Filter";
import AboutUsComp from "@/components/home/AboutUsComp";
import Contact from "@/components/home/Contact";
import MainSwiper from "@/components/home/MainSwiper";
import News from "@/components/home/News";
import Projects from "@/components/home/Projects";

export default function Home() {
  return (
    <div className="w-full flex flex-col sm:gap-[100px] gap-[60px]">
      <MainSwiper />
      <Filter />
      <Projects />
      <AboutUsComp />
      <News />
      <Contact />
      <SendEmail />
    </div>
  );
}

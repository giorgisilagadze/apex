import SendEmail from "@/components/SendEmail";
import Filter from "@/components/filter/Filter";
import AboutUsComp from "@/components/home/AboutUsComp";
import Contact from "@/components/home/Contact";
import MainSwiper from "@/components/home/MainSwiper";
import News from "@/components/home/News";
import Projects from "@/components/home/Projects";

export default function Home() {
  const projects = [
    {
      id: 1,
      title: "აპექს ნუცუბიძე",
    },
    {
      id: 2,
      title: "აპექს დიდი დიღომი",
    },
    {
      id: 3,
      title: "აპექს ნუცუბიძე ||",
    },
  ];
  return (
    <div className="w-full flex flex-col sm:gap-[100px] gap-[60px]">
      <MainSwiper />
      <Filter sort={projects} />
      <Projects />
      <AboutUsComp />
      <News />
      <Contact />
      <SendEmail />
    </div>
  );
}

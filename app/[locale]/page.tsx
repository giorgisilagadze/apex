import SendEmail from "@/components/SendEmail";
import Filter from "@/components/filter/Filter";
import AboutUsComp from "@/components/home/AboutUsComp";
import Contact from "@/components/home/Contact";
import MainSwiper from "@/components/home/MainSwiper";
import News from "@/components/home/News";
import Projects from "@/components/home/Projects";
import { FetchNews } from "@/serverside/FetchNews";

export default async function Home() {
  const news = await FetchNews();

  console.log(news);

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
      <Filter page="home" />
      <Projects />
      <AboutUsComp />
      <News news={news.data.slice(0, 3)} />
      <Contact />
      <SendEmail />
    </div>
  );
}

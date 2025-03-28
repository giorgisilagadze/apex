"use client";

import Image from "next/legacy/image";
import Button from "../button/Button";
import ScreenSize from "@/hooks/ScreenSize";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function AboutUsComp() {
  const dimension = ScreenSize();

  const { ref, inView } = useInView({ triggerOnce: true });

  const data = [
    {
      id: 1,
      title: "კმაყოფილი მომხმარებელი",
      count: "5532",
    },
    {
      id: 2,
      title: "წელი ბაზარზე",
      count: "15",
    },
    {
      id: 3,
      title: "დასრულებული პროექტი",
      count: "25",
    },
    {
      id: 4,
      title: "მიმდინარე პროექტი",
      count: "6",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="w-full grid lg:grid-cols-2 items-center gap-8 xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[1px] bg-blue"></div>
            <p className="text-[14px] text-blue font-light">ჩვენ შესახებ</p>
          </div>
          <h1 className="sm:text-[30px] text-[24px] font-semibold">
            კომპანიის შესახებ
          </h1>
          <p className="text-[14px] leading-6 text-grey font-light lg1350:w-[480px] w-full mt-2">
            სამშენებლო კომპანია აპექს დეველოპმენტი ბაზარზე 2012 წლიდან
            ფუნქციონირებს. კომპანია სთავაზობს მომხმარებელს მაღალი ხარისხის
            პროდუქტსა და მომსახურებას და ქმნის თითოეული ინდივიდისთვის სასურველს
            კომფორტს. ამჟამად, აპექს დეველოპმენტი 10 დასრულებულ და 3 მიმდინარე
            პროექტს ითვლის თბილისის მასშტაბით. სამშენებლო კომპანია აპექს
            დეველოპმენტი ბაზარზე 2012 წლიდან ფუნქციონირებს. კომპანია სთავაზობს
            მომხმარებელს მაღალი ხარისხის პროდუქტსა და მომსახურებას და ქმნის
            თითოეული ინდივიდისთვის სასურველს კომფორტს.
          </p>
          <div className="mt-4">
            <Button
              title="ჩვენ შესახებ"
              height="h-[54px]"
              bgColor="bg-blue"
              color="text-white"
              onClick={() => {}}
              width={"w-[200px]"}
            />
          </div>
        </div>
        <div className="w-full h-full relative">
          <div className="xl1680:w-[530px] xl1680:h-[600px] lg1350:w-[400px] lg1350:h-[500px] md500:w-[350px] h-[350px] w-[90%] relative">
            <Image
              src={"/images/about.jpeg"}
              alt="about"
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>

          <div className="xl1680:w-[430px] xl1680:h-[530px] lg1350:w-[350px] lg1350:h-[430px] md500:w-[300px] md500:h-[350px]  w-[250px] h-[300px] rounded-[10px] border-[5px] border-white bg-blue flex items-center justify-center absolute xl1680:left-[250px] lg1350:left-[200px] md500:left-[150px] right-[0px] md500:bottom-[-100px] bottom-[-50px]">
            <Image
              src={"/images/logo.png"}
              alt="about"
              width={dimension[0] > 500 ? 210 : 160}
              height={dimension[0] > 500 ? 230 : 175}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:py-[120px] py-[80px] bg-[rgba(250,250,250,1)] lg:flex items-center justify-between grid md600:grid-cols-2 grid-cols-1"
      >
        {data.map((item, index) => (
          <div
            className="flex items-center lg:justify-start md500:justify-center justify-start gap-4"
            key={item.id}
          >
            <div
              className={`relative ${
                index == 0 &&
                "xl:!w-[240px] md600:!w-[180px] md500:!w-[220px] !w-[210px]"
              } `}
            >
              <span
                className="xl:text-[90px] lg1250:text-[75px] md600:text-[60px] text-[80px] font-bold text-transparent stroke-gray-300"
                style={{ WebkitTextStroke: "1px #d3cece" }}
              >
                {/* {item.count} */}
                <CountUp
                  start={0}
                  end={inView ? parseInt(item.count) : 0}
                  duration={2}
                />
              </span>
              <p className="lg1250:text-[38px] text-[30px] font-bold absolute top-[50%] translate-y-[-50%] right-0">
                {/* {item.count} */}
                <CountUp
                  start={0}
                  end={inView ? parseInt(item.count) : 0}
                  duration={2}
                />
              </p>
            </div>

            <p className="text-[14px] max-w-[90px]">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

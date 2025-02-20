"use client";

import Image from "next/image";
import Button from "../button/Button";

export default function AboutUsComp() {
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
      <div className="w-full grid grid-cols-2 items-center gap-8 px-[330px]">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[1px] bg-blue"></div>
            <p className="text-[14px] text-blue font-light">ჩვენ შესახებ</p>
          </div>
          <h1 className="text-[30px] font-semibold">კომპანიის შესახებ</h1>
          <p className="text-[14px] leading-6 text-grey font-light w-[480px] mt-2">
            სამშენებლო კომპანია აპექს დეველოპმენტი ბაზარზე 
            2012 წლიდან ფუნქციონირებს. კომპანია სთავაზობს მომხმარებელს მაღალი
            ხარისხის პროდუქტსა და მომსახურებას და ქმნის თითოეული ინდივიდისთვის
            სასურველს კომფორტს.  ამჟამად, აპექს დეველოპმენტი 10 დასრულებულ და 3
            მიმდინარე პროექტს ითვლის თბილისის მასშტაბით.
            სამშენებლო კომპანია აპექს დეველოპმენტი ბაზარზე
             2012 წლიდან ფუნქციონირებს. კომპანია სთავაზობს მომხმარებელს მაღალი
            ხარისხის პროდუქტსა და მომსახურებას და ქმნის თითოეული ინდივიდისთვის
            სასურველს კომფორტს.
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
          <div className="w-[530px] h-[600px] relative">
            <Image
              src={"/images/about.jpeg"}
              alt="about"
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>

          <div className="w-[430px] h-[530px] rounded-[10px] border-[5px] border-white bg-blue flex items-center justify-center absolute left-[250px] bottom-[-100px]">
            <Image
              src={"/images/logo.png"}
              alt="about"
              width={200}
              height={150}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-[330px] py-[120px] bg-[rgba(250,250,250,1)] flex items-center justify-between">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <div className="relative">
              <span
                className="text-[100px] font-bold text-transparent stroke-gray-300"
                style={{ WebkitTextStroke: "1px #d3cece" }}
              >
                {item.count}
              </span>
              <p className="text-[38px] font-bold absolute top-[50%] translate-y-[-50%] right-0">
                {item.count}
              </p>
            </div>

            <p className="text-[14px] max-w-[90px]">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

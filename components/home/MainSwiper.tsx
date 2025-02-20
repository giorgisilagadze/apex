"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BsArrowDown } from "react-icons/bs";

export default function MainSwiper() {
  const [shownProject, setShownProject] = useState(1);

  const projects = [
    {
      id: 1,
      image: "/images/banner1.jpeg",
      title1: "შიდა 0%-იანი განვადება",
      title2: "აპექს ნუცუბიძე",
    },
    {
      id: 2,
      image: "/images/banner1.jpeg",
      title1: "შიდა 0%-იანი განვადება",
      title2: "აპექსი დიდი დიღომი",
    },
    {
      id: 3,
      image: "/images/banner2.png",
      title1: "შიდა 0%-იანი განვადება",
      title2: "აპექს ნუცუბიძე ||",
    },
  ];

  const socials = [
    {
      id: 1,
      title: ".Facebook",
    },
    {
      id: 2,
      title: ".Instagram",
    },
    {
      id: 3,
      title: ".TikTok",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShownProject((prev) => (prev < projects.length ? prev + 1 : 1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [shownProject]);

  return (
    <div className="w-full h-[878px] relative">
      {projects.map((item) => (
        <div
          className={`absolute w-full h-full top-0 left-0 transition-opacity ease-in-out transform ${
            shownProject == item.id
              ? "z-[2] opacity-100 duration-[1000ms]"
              : "z-[-1] opacity-0 duration-[2500ms]"
          }`}
          key={item.id}
        >
          <Image
            src={item.image}
            alt="banner"
            layout="fill"
            // objectFit="cover"
          />
          <div
            className={`flex flex-col gap-4 z-[3] absolute top-[300px] max-w-[440px] ${
              shownProject == item.id
                ? " left-[250px] opacity-100 duration-[1500ms]"
                : "left-[500px] opacity-0 duration-[2500ms]"
            }`}
          >
            <p className="text-[20px] text-white font-light">{item.title1}</p>
            <h1 className="text-[66px] leading-[70px] text-white font-bold">
              {item.title2}
            </h1>
          </div>
          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blueOpacity to-transparent"></div>
        </div>
      ))}
      <div className="absolute top-[50%] translate-y-[-50%] left-[60px] z-[3] flex items-start">
        <p className="text-[14px] text-white font-extralight w-5">
          0{shownProject}
        </p>
        <p className="text-[14px] text-white font-extralight">/</p>
        <p className="text-[32px] text-white">0{projects.length}</p>
      </div>
      <div className="absolute bottom-10 left-[60px] z-[3] flex items-center gap-10">
        {projects.map((item) => (
          <div
            className={`flex flex-col gap-3 max-w-[90px] duration-500 cursor-pointer ${
              shownProject == item.id ? "" : "opacity-50"
            }`}
            key={item.id}
            onMouseOver={() => setShownProject(item.id)}
          >
            <p className="text-[14px] text-white">{"0" + item.id}</p>
            <p className="text-[14px] text-white font-light">{item.title2}</p>
            <div
              className={`w-full h-[1px] ${
                shownProject == item.id ? "bg-white" : "bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="absolute top-[50%] translate-y-[-50%] right-[10px] z-[3] flex items-start gap-4 rotate-90">
        {socials.map((item) => (
          <p
            className="text-[14px] text-white font-extralight cursor-pointer hover:opacity-50 duration-300"
            key={item.id}
          >
            {item.title}
          </p>
        ))}
      </div>
      <div className="absolute left-[50%] translate-x-[-50%] bottom-[40px] z-[3] flex flex-col gap-4 bounce">
        <p className="text-[14px] text-white font-extralight">Scroll</p>
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-white">
          <BsArrowDown className="text-white mt-[-26px] text-[26px]" />
        </div>
      </div>
    </div>
  );
}

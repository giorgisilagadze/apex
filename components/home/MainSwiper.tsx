"use client";

import Image from "next/legacy/image";
import { useEffect, useState } from "react";

import { BsArrowDown } from "react-icons/bs";

export default function MainSwiper() {
  const [shownProject, setShownProject] = useState(1);

  const projects = [
    {
      id: 1,
      image: "/images/video.mp4",
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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShownProject((prev) => (prev < projects.length ? prev + 1 : 1));
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [shownProject]);

  return (
    <div className="w-full lg1250:h-[878px] sm:h-[700px] h-[600px] relative">
      {projects.map((item, index) => (
        <div
          className={`absolute w-full h-full top-0 left-0 transition-opacity ease-in-out transform ${
            shownProject == item.id
              ? "z-[2] opacity-100 duration-[1000ms]"
              : "z-[-1] opacity-0 duration-[2500ms]"
          }`}
          key={item.id}
        >
          {index !== 0 ? (
            <Image
              src={item.image}
              alt="banner"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loop
              autoPlay
              muted
            >
              <source src={item.image} type="video/mp4" />
            </video>
          )}
          {/* <Image
            src={item.image}
            alt="banner"
            layout="fill"
            objectFit="cover"
          /> */}
          <div
            className={`flex flex-col md500:gap-4 gap-3 z-[3] absolute lg1250:top-[300px] sm:top-[200px] md500:top-[150px] lg:max-w-[440px] md500:max-w-[300px] w-[280px] md500:w-auto top-[50%] translate-y-[-50%] md500:translate-y-0 ${
              shownProject == item.id
                ? "lg1250:left-[250px] sm:left-[175px] md500:left-[120px] left-[40px] opacity-100 duration-[1500ms]"
                : "lg1250:left-[500px] sm:left-[425px] md600:left-[325px] md500:left-[200px] left-[80px] opacity-0 duration-[2500ms]"
            }`}
          >
            <p className="sm:text-[20px] md500:text-[16px] text-[14px] text-white font-light">
              {item.title1}
            </p>
            <h1 className="sm:text-[66px] text-[44px] sm:leading-[70px] leading-[55px] text-white font-bold">
              {item.title2}
            </h1>
          </div>
          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-blueOpacity to-transparent"></div>
        </div>
      ))}
      <div className="absolute top-[50%] translate-y-[-50%] sm:left-[60px] left-6 z-[3] items-start md500:flex hidden">
        <p className="text-[14px] text-white font-extralight w-5">
          0{shownProject}
        </p>
        <p className="text-[14px] text-white font-extralight">/</p>
        <p className="text-[32px] text-white">0{projects.length}</p>
      </div>
      <div className="absolute bottom-10 sm:left-[60px] left-6 z-[3] flex items-start sm:gap-10 gap-4">
        {projects.map((item) => (
          <div
            className={`flex flex-col gap-3 max-w-[100px] duration-500 cursor-pointer ${
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
      <div className="absolute top-[50%] translate-y-[-50%] right-[-60px] z-[3] items-start gap-4 rotate-90 hidden sm:flex">
        {socials.map((item) => (
          <p
            className="text-[14px] text-white font-extralight cursor-pointer hover:opacity-50 duration-300"
            key={item.id}
          >
            {item.title}
          </p>
        ))}
      </div>
      <div className="absolute left-[50%] translate-x-[-50%] sm:bottom-[40px] bottom-6 z-[3] flex-col gap-4 bounce hidden sm:flex">
        <p className="text-[14px] text-white font-extralight">Scroll</p>
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-white">
          <BsArrowDown className="text-white mt-[-26px] text-[26px]" />
        </div>
      </div>
    </div>
  );
}

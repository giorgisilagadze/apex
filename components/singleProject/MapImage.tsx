"use client";

import { useLocale } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  image: string;
  id: string;
  map: Maping[];
  isFloor?: boolean;
}

export default function MapImage({ image, id, map, isFloor }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  const [hoveredId, setHoveredId] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0,
  });

  const locale = useLocale();

  // const mapAreas = [
  //   {
  //     id: "area1",
  //     coords: "406,943,3396,1318,3400,1456,409,1098",
  //     shape: "poly",
  //     href: "#",
  //     title: "სართული: 13",
  //   },
  //   {
  //     id: "area2",
  //     coords: "409,1131,3400,1479,3400,1607,409,1282",
  //     shape: "poly",
  //     href: "",
  //     title: "სართული: 12",
  //   },
  //   {
  //     id: "area3",
  //     coords: "403,1305,3396,1634,3396,1762,403,1453",
  //     shape: "poly",
  //     href: "",
  //     title: "სართული: 11",
  //   },
  //   {
  //     id: "area4",
  //     coords: "399,1482,3400,1782,3400,1906,403,1637",
  //     shape: "poly",
  //     href: "",
  //     title: "სართული: 10",
  //   },
  //   {
  //     id: "area5",
  //     coords: "399,1660,3400,1933,3400,2058,403,1814",
  //     shape: "poly",
  //     href: "#",
  //     title: "სართული: 9",
  //   },
  //   {
  //     id: "area6",
  //     coords: "399,1837,3406,2081,3400,2206,406,1992",
  //     shape: "poly",
  //     href: "",
  //     title: "სართული: 8",
  //   },
  //   {
  //     id: "area7",
  //     coords: "399,2018,3400,2229,3400,2353,403,2169",
  //     shape: "poly",
  //     href: "",
  //     title: "სართული: 7",
  //   },
  //   {
  //     id: "area8",
  //     coords: "409,2192,3403,2376,3400,2505,409,2340",
  //     shape: "poly",
  //     href: "#",
  //     title: "სართული: 6",
  //   },
  //   {
  //     id: "area9",
  //     coords: "403,2370,3403,2528,3403,2649,403,2521",
  //     shape: "poly",
  //     href: "/",
  //     title: "სართული: 5",
  //   },
  //   {
  //     id: "area10",
  //     coords: "403,2547,3403,2679,3403,2800,409,2699",
  //     shape: "poly",
  //     href: "/",
  //     title: "სართული: 4",
  //   },
  //   {
  //     id: "area11",
  //     coords: "399,2725,3400,2827,3400,2952,403,2879",
  //     shape: "poly",
  //     href: "/",
  //     title: "სართული: 3",
  //   },
  //   {
  //     id: "area12",
  //     coords: "403,2902,3406,2978,3403,3100,403,3050",
  //     shape: "poly",
  //     href: "/",
  //     title: "სართული: 2",
  //   },
  //   {
  //     id: "area13",
  //     coords: "396,3080,3403,3126,3406,3254,393,3228",
  //     shape: "poly",
  //     href: "/",
  //     title: "სართული: 1",
  //   },
  // ];

  const convertCoordsToScaled = (coords: string) => {
    const { width, height, naturalWidth, naturalHeight } = dimensions;

    if (!naturalWidth || !naturalHeight)
      return { clipPath: "", centerX: 0, centerY: 0 };

    const scaleX = width / naturalWidth;
    const scaleY = height / naturalHeight;
    const coordsArray = coords.split(",").map(Number);
    const pairs = [];
    let totalX = 0;
    let totalY = 0;
    let pointsCount = coordsArray.length / 2;

    for (let i = 0; i < coordsArray.length; i += 2) {
      const x = coordsArray[i] * scaleX;
      const y = coordsArray[i + 1] * scaleY;
      pairs.push(`${x}px ${y}px`);
      totalX += x;
      totalY += y;
    }

    const centerX = totalX / pointsCount;
    const centerY = totalY / pointsCount;

    return {
      clipPath: pairs.join(", "),
      centerX,
      centerY,
    };
  };

  useEffect(() => {
    setIsImageLoaded(true);
    const updateDimensions = () => {
      if (imageRef.current) {
        const { width, height } = imageRef.current.getBoundingClientRect();
        const { naturalWidth, naturalHeight } = imageRef.current;
        setDimensions({ width, height, naturalWidth, naturalHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  console.log(hoveredId);

  return (
    <div className="w-full relative">
      <img
        // src={"/images/single-project.jpeg"}
        src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
        alt="project-image"
        // useMap="#image-map"
        ref={imageRef}
        onLoad={() => {
          setIsImageLoaded(true);
          if (imageRef.current) {
            const { width, height } = imageRef.current.getBoundingClientRect();
            const { naturalWidth, naturalHeight } = imageRef.current;
            setDimensions({ width, height, naturalWidth, naturalHeight });
          }
        }}
        className={`w-full ${
          !isFloor ? (isImageLoaded ? "h-auto" : "aspect-[40/41]") : "h-auto"
        } `}
      />
      {/* 
      <map name="image-map">
        <area
          target=""
          alt=""
          title="13"
          coords="406,943,3396,1318,3400,1456,409,1098"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="12"
          coords="409,1131,3400,1479,3400,1607,409,1282"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="11"
          coords="403,1305,3396,1634,3396,1762,403,1453"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="10"
          coords="399,1482,3400,1782,3400,1906,403,1637"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="9"
          coords="399,1660,3400,1933,3400,2058,403,1814"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="8"
          coords="399,1837,3406,2081,3400,2206,406,1992"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="7"
          coords="399,2018,3400,2229,3400,2353,403,2169"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="6"
          coords="409,2192,3403,2376,3400,2505,409,2340"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="5"
          coords="403,2370,3403,2528,3403,2649,403,2521"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="4"
          coords="403,2547,3403,2679,3403,2800,409,2699"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="3"
          coords="399,2725,3400,2827,3400,2952,403,2879"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="2"
          coords="403,2902,3406,2978,3403,3100,403,3050"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title="1"
          coords="396,3080,3403,3126,3406,3254,393,3228"
          shape="poly"
        />
      </map> */}
      {isImageLoaded &&
        dimensions.width &&
        map.map((item) => {
          const { clipPath, centerX, centerY } = convertCoordsToScaled(
            item.coords
          );
          return (
            <div className="w-full h-full" key={item.title}>
              {item.href !== "#" ? (
                <Link href={`/${locale}/projects/${id}/${item.id}`}>
                  <div
                    className={`${
                      !isFloor ? "bg-blueOpacity" : "bg-[rgba(0,136,16,0.7)]"
                    } duration-300 absolute top-0 left-0 cursor-pointer flex items-center justify-center`}
                    style={{
                      clipPath: `polygon(${clipPath})`,
                      width: "100%",
                      height: "100%",
                      opacity: hoveredId == item.title ? 100 : 0,
                    }}
                    onMouseOver={() => setHoveredId(item.title)}
                    onMouseLeave={() => setHoveredId("")}
                  ></div>
                </Link>
              ) : (
                <div
                  className={`${
                    !isFloor ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(199,0,0,0.7)]"
                  } duration-300 absolute top-0 left-0 cursor-pointer flex items-center justify-center`}
                  style={{
                    clipPath: `polygon(${clipPath})`,
                    width: "100%",
                    height: "100%",
                    opacity: hoveredId == item.title ? 100 : 0,
                  }}
                  onMouseOver={() => setHoveredId(item.title)}
                  onMouseLeave={() => setHoveredId("")}
                >
                  {" "}
                </div>
              )}
              {!isFloor ? (
                <div
                  className={`flex items-center flex-col sm:flex-row lg:gap-5 sm:gap-3 gap-1 absolute ${
                    item.href == "#" ? "bg-black" : "bg-blue"
                  } text-white lg1250:px-6 px-3 lg1250:py-4 py-2 rounded-[8px] pointer-events-none ${
                    hoveredId == item.title ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    top: `${centerY - 50}px`,
                    left: `${centerX}px`,
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.3s ease, visibility 0.3s ease", // Add a smooth transition for opacity and visibility
                  }}
                >
                  <p className="lg1250:text-[16px] sm:text-[14px] text-[12px]">
                    სართული {item.title}
                  </p>
                  <div className="w-[1px] h-3 bg-white sm:block hidden"></div>
                  <p className="lg1250:text-[16px] sm:text-[14px] text-[12px]">
                    თავისუფალი ბინა: {item.freeApartmentCount}
                  </p>
                </div>
              ) : item.href !== "#" ? (
                <Link href={`/${locale}/projects/${id}/${item.id}`}>
                  <p
                    className={`text-white lg1250:text-[14px] lg:text-[12px] text-[8px] hidden sm:block absolute ${
                      hoveredId == item.title ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      top: `${centerY}px`,
                      left: `${centerX}px`,
                      transform: "translate(-50%, -50%)",
                      transition: "opacity 0.3s ease, visibility 0.3s ease", // Add a smooth transition for opacity and visibility
                    }}
                    onMouseMove={() => setHoveredId(item.title)}
                  >
                    "თავისუფალი
                  </p>
                </Link>
              ) : (
                <p
                  className={`text-white lg1250:text-[14px] lg:text-[12px] text-[8px] hidden sm:block absolute cursor-pointer ${
                    hoveredId == item.title ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    top: `${centerY}px`,
                    left: `${centerX}px`,
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.3s ease, visibility 0.3s ease", // Add a smooth transition for opacity and visibility
                  }}
                  onMouseMove={() => setHoveredId(item.title)}
                >
                  გაყიდული
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
}

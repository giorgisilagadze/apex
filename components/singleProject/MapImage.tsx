"use client";

import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("SingleProject");

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

  return (
    <div className="w-full relative">
      <div className={`w-full ${isFloor ? "" : "aspect-[40/41]"}`}>
        <img
          // src={"/images/single-project.jpeg"}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
          alt="project-image"
          // useMap="#image-map"
          ref={imageRef}
          onLoad={() => {
            setIsImageLoaded(true);
            if (imageRef.current) {
              const { width, height } =
                imageRef.current.getBoundingClientRect();
              const { naturalWidth, naturalHeight } = imageRef.current;
              setDimensions({ width, height, naturalWidth, naturalHeight });
            }
          }}
          className={`w-full h-full`}
          // ${!isFloor ? (isImageLoaded ? "h-auto" : "aspect-[40/41]") : "h-auto"}
        />
      </div>

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
                    {t("floor")} {item.title}
                  </p>
                  <div className="w-[1px] h-3 bg-white sm:block hidden"></div>
                  <p className="lg1250:text-[16px] sm:text-[14px] text-[12px]">
                    {t("available")}: {item.freeApartmentCount}
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
                    {t("available1")}
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
                  {t("sold1")}
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
}

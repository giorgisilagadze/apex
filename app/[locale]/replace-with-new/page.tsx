"use client";

import ContactForReplace from "@/components/replace/ContactForReplace";
import GallerySwiper from "@/components/singleProject/GallerySwiper";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/legacy/image";
import { useState } from "react";

export default function ReplaceWithNew() {
  const t = useTranslations("replacePage");

  const [hoveredImage, setHoveredImage] = useState<number>();

  const aboutData1 = [
    {
      id: 4,
      image: "/images/replace1.jpg",
    },
    {
      id: 5,
      image: "/images/replace2.jpg",
    },
    {
      id: 6,
      image: "/images/replace3.jpg",
    },
    {
      id: 7,
      image: "/images/replace4.jpg",
    },
  ];

  const gallery = [
    {
      building_id: 1,
      created_at: "1",
      deleted_at: null,
      id: 1,
      updated_at: "1",
      url: "/images/replace5.jpg",
    },
    {
      building_id: 1,
      created_at: "1",
      deleted_at: null,
      id: 2,
      updated_at: "1",
      url: "/images/replace6.jpg",
    },
    {
      building_id: 1,
      created_at: "1",
      deleted_at: null,
      id: 3,
      updated_at: "1",
      url: "/images/replace7.jpg",
    },
    {
      building_id: 1,
      created_at: "1",
      deleted_at: null,
      id: 4,
      updated_at: "1",
      url: "/images/replace8.jpg",
    },
    {
      building_id: 1,
      created_at: "1",
      deleted_at: null,
      id: 5,
      updated_at: "1",
      url: "/images/replace9.jpg",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/replace.jpg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            {t("title")}
          </h1>
          <p className="text-[14px] text-white sm:self-center">{t("page")}</p>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full grid lg:grid-cols-2 items-center gap-[80px] xl1600:px-[140px] lg1250:px-[100px] sm:px-[64px] px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full h-full relative"
          >
            <div className="w-full grid grid-cols-2 aspect-square gap-4">
              {
                aboutData1.map((item) => (
                  <div
                    className="w-full aspect-square relative rounded-[10px]"
                    key={item.id}
                    onMouseEnter={() => setHoveredImage(item.id)}
                    onMouseLeave={() => setHoveredImage(undefined)}
                  >
                    <Image
                      src={item.image}
                      alt="about"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[10px] "
                    />
                    <motion.div
                      animate={{ opacity: hoveredImage === item.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0 w-full h-full backdrop-grayscale backdrop-brightness-75 bg-white/10 transition duration-500 z-[2] rounded-[10px]"
                    />
                    {hoveredImage === item.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-1/2 left-0 w-full h-full z-[3] pointer-events-none"
                      >
                        <motion.div
                          initial={{ scaleY: 0, opacity: 1 }}
                          animate={{ scaleY: 1, opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                          }}
                          style={{ originY: 0.5 }}
                          className="absolute bottom-1/2 left-0 w-full h-full bg-gradient-to-t from-white/30 to-transparent"
                        />
                      </motion.div>
                    )}
                  </div>
                ))
                // )
              }
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full flex flex-col gap-2"
          >
            <h1 className="sm:text-[30px] text-[24px] font-semibold text-blue">
              {t("subtitle")}
            </h1>
            <div className="w-full flex flex-col gap-[2px]">
              <div className="w-full">
                <p className="text-[12px] leading-5 text-grey font-light lg1350:w-[480px] w-full mt-2">
                  {t("text")}
                </p>
                <p className="text-[12px] leading-5 text-grey font-light lg1350:w-[480px] w-full mt-2">
                  {t("text1")}
                </p>
              </div>
              <div className="w-full">
                <p className="text-[12px] leading-5 text-grey font-light lg1350:w-[480px] w-full mt-2">
                  {t("text2")}
                </p>
                <p className="text-[12px] leading-5 text-grey font-light lg1350:w-[480px] w-full mt-2">
                  {t("text3")}
                </p>
              </div>
            </div>

            {/* <div className="mt-4">
            <Button
              title={t("aboutUs")}
              height="h-[54px]"
              bgColor="bg-blue"
              color="text-white"
              onClick={() => {}}
              width={"w-[200px]"}
            />
          </div> */}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex flex-col gap-8 items-center bg-blue py-10">
            <h1 className="sm:text-[30px] text-[24px] text-white">
              {t("projectGallery")}
            </h1>
            <GallerySwiper images={gallery} isReplace={true} />
          </div>
        </motion.div>
        <ContactForReplace />
      </div>
    </div>
  );
}

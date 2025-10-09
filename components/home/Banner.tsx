"use client";

import ScreenSize from "@/hooks/ScreenSize";
import Image from "next/legacy/image";

export default function Banner() {
  const dimension = ScreenSize();
  return (
    <div className="w-full h-[126px] relative" style={{display: 'none'}}>
      <Image
        src={
          dimension[0] >= 600 ? "/images/banner.jpeg" : "/images/bannermob.jpeg"
        }
        layout="fill"
      />
    </div>
  );
}

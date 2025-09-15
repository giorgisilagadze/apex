"use client";

import Image from "next/legacy/image";
import { useEffect, useState } from "react";

export default function FlashOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000); // 2s
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-white">
      <div className="w-[160px] h-[160px] relative animate-scale">
        <Image src={"/images/logo1.png"} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}

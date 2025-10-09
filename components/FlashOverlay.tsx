"use client";

import { useEffect, useState } from "react";

export default function FlashOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-white">
      <img
        src={"/images/logo11.webp"}
        className="w-[160px] h-[160px] object-cover animate-scale"
      />
    </div>
  );
}

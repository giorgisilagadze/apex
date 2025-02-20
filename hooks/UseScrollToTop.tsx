"use client";

import { useEffect } from "react";

export const UseScrollToTop = () => {
  useEffect(() => {
    if (typeof window !== undefined) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return <div></div>;
};

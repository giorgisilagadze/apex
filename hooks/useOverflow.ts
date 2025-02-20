"use client";

import { useEffect } from "react";

export default function UseOverflow(state: boolean) {
  useEffect(() => {
    if (state) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);
}

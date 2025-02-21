import { useState, useEffect } from "react";

const ScreenSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      };

      window.addEventListener("resize", handleWindowResize);

      setWindowSize([window.innerWidth, window.innerHeight]);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  return windowSize;
};

export default ScreenSize;

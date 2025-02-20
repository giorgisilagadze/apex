import { useEffect } from "react";

const useMotion = (setIsVisible: (arg: boolean) => void, id: string) => {
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(id);
      if (section) {
        const topPosition = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (topPosition < windowHeight * 0.85) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsVisible, id]);
};

export default useMotion;

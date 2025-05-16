"use client";

import UseOverflow from "@/hooks/useOverflow";

interface Props {
  children: React.ReactNode;
  isPopUpVisible: boolean;
  setIsPopUpVisible: (isPopUpVisible: boolean) => void;
  width: string;
  bg?: string;
}

export default function PopUpComp({
  isPopUpVisible,
  setIsPopUpVisible,
  width,
  children,
  bg,
}: Props) {
  UseOverflow(isPopUpVisible);

  return (
    <div
      className={`fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center duration-300 ${
        isPopUpVisible
          ? "bg-[rgba(0,0,0,0.5)] opacity-100 !z-[4]"
          : "bg-transparent opacity-0 -z-[1]"
      }`}
    >
      <div
        className={`${
          isPopUpVisible ? "w-[100vw] h-[100vh]" : "w-0 h-[100vh]"
        } top-0 right-0 z-[5] absolute`}
        onClick={() => {
          setIsPopUpVisible(false);
        }}
      ></div>
      <div className={`${width} rounded-[10px] ${bg ? bg : "bg-white"} z-[6]`}>
        {children}
      </div>
    </div>
  );
}

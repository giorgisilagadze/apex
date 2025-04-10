"use client";

import { IconType } from "react-icons";

interface Props {
  icon?: IconType;
  title: string;
  onClick: VoidFunction;
  width: string;
  border?: boolean;
  bgColor?: string;
  color?: string;
  height?: string;
  rounded?: string;
  fontWeight?: string;
  right?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
}

export default function Button({
  icon: Icon,
  title,
  onClick,
  width,
  border,
  bgColor,
  color,
  height,
  rounded,
  fontWeight,
  right,
  type,
  isLoading,
}: Props) {
  return (
    <button
      className={`${width} ${border ? "border border-[#eee]" : ""} ${
        bgColor ? bgColor : "bg-black"
      } ${color ? `${color}` : "text-white"} ${height ? height : "!h-[54px]"} ${
        rounded ? rounded : "rounded-[10px]"
      } ${
        fontWeight ? fontWeight : ""
      }   flex items-center justify-center gap-2  hover:shadow-dropDown duration-300 `}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {isLoading ? (
        <div
          className="loader"
          style={
            {
              "--loader-color": "rgba(255, 255, 255, 0.6)",
            } as React.CSSProperties
          }
        ></div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {Icon && !right && <Icon className="mt-[2px]" />}
          <p className="text-[14px]">{title}</p>
          {Icon && right && <Icon className="mt-[2px] -rotate-[135deg]" />}
        </div>
      )}
    </button>
  );
}

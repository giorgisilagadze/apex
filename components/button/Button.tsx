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
}: Props) {
  return (
    <button
      className={`${width} ${border ? "border border-[#eee]" : ""} ${
        bgColor ? bgColor : "bg-black"
      } ${color ? `${color}` : "text-white"} ${height ? height : "!h-[54px]"} ${
        rounded ? rounded : "rounded-[10px]"
      } ${
        fontWeight ? fontWeight : ""
      }   flex items-center justify-center gap-2  hover:shadow-dropDown duration-300`}
      onClick={onClick}
    >
      {Icon && !right && <Icon className="mt-[2px]" />}
      <p className="text-[14px]">{title}</p>
      {Icon && right && <Icon className="mt-[2px] -rotate-[135deg]" />}
    </button>
  );
}

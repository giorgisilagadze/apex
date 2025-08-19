import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface Props {
  title?: string;
  placeholder: string;
  color?: string;
  bgColor?: string;
  inputKey?: string;
  onChange: (inputKey: string, value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  value: string;
  type?: string;
  readonly?: boolean;
  isPassword?: boolean;
  height?: string;
  isFilter?: boolean;
  isRoi?: boolean;
}

export default function Input({
  title,
  placeholder,
  color,
  bgColor,
  inputKey,
  onChange,
  onKeyDown,
  value,
  type,
  readonly,
  isPassword,
  height,
  isFilter,
  isRoi,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="w-full flex flex-col gap-[6px]">
      {title && (
        <h1
          className={`text-[14px] font-medium whitespace-nowrap ${
            color ? color : "text-black"
          }`}
        >
          {title}
        </h1>
      )}
      <div className="w-full relative">
        <input
          type={(isPasswordVisible ? "text" : type) || "text"}
          placeholder={placeholder}
          className={`w-full ${
            height ? height : "h-[44px]"
          }  rounded-[10px] outline-none font-light text-[14px]  ${
            bgColor
              ? `${bgColor} placeholder:text-black`
              : "border border-blue bg-white"
          } ${
            isFilter
              ? "text-blue placeholder:text-blue selectInput"
              : "text-black px-4"
          } ${isRoi && "border border-white text-white"}`}
          value={value}
          onChange={(e) => onChange(inputKey as string, e.target.value)}
          onKeyDown={onKeyDown}
          onWheel={(e) => e.currentTarget.blur()}
          readOnly={readonly}
        />
        {isPassword &&
          (isPasswordVisible ? (
            <IoEyeOutline
              className="absolute top-[14px] right-4 cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          ) : (
            <IoEyeOffOutline
              className="absolute top-[14px] right-4 cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          ))}
      </div>
    </div>
  );
}

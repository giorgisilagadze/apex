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
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="w-full flex flex-col gap-[6px]">
      {title && (
        <p
          className={`text-[14px] font-medium whitespace-nowrap ${
            color ? color : "text-black"
          }`}
        >
          {title}
        </p>
      )}
      <div className="w-full relative">
        <input
          type={(isPasswordVisible ? "text" : type) || "text"}
          placeholder={placeholder}
          className={`w-full h-[44px] rounded-[10px] outline-none px-3 font-light text-[14px] ${
            bgColor ? `${bgColor}` : "border border-blue bg-white"
          }`}
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

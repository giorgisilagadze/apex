import useClickOutside from "@/hooks/useClickOutside";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

interface Props {
  title?: string;
  placeholder: string;
  color?: string;
  data?: string[];
  onClick?: (filterKey: string, value: string) => void;
  filterKey: string;
  selectedValues: SelectedValues | any;
  isTranslated?: boolean;
}

export default function SelectComp({
  title,
  placeholder,
  color,
  data,
  onClick,
  filterKey,
  selectedValues,
  isTranslated,
}: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const selectRef = useRef(null);

  useClickOutside(selectRef, () => setIsClicked(false));

  const t = useTranslations("Filter");
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col gap-[6px]">
      {title && (
        <p
          className={`text-[14px] font-medium ${color ? color : "text-black"}`}
        >
          {title}
        </p>
      )}
      <div className="w-full relative" ref={selectRef}>
        <div
          className="w-full flex items-center justify-between px-3 h-[44px] rounded-[10px] border border-blue cursor-pointer bg-white"
          onClick={() => setIsClicked(!isClicked)}
        >
          <p className="text-[14px] font-light whitespace-nowrap truncate">
            {filterKey
              ? selectedValues[filterKey as keyof SelectedValues]
                ? !pathname.includes("/admin") && !isTranslated
                  ? t(selectedValues[filterKey as keyof SelectedValues])
                  : selectedValues[filterKey as keyof SelectedValues]
                : placeholder
              : placeholder}
          </p>
          <div className="flex items-center gap-2">
            {selectedValues[filterKey as keyof SelectedValues] && (
              <RxCross1
                className={`text-[14px] cursor-pointer hover:opacity-60 duration-300`}
                onClick={() => onClick?.(filterKey, "")}
              />
            )}
            <MdKeyboardArrowDown
              className={`text-[18px] ${
                isClicked && "rotate-180"
              } duration-300`}
            />
          </div>
        </div>
        <div
          className={`${
            isClicked
              ? "opacity-100 pointer-events-auto scale-100"
              : "opacity-0 pointer-events-none scale-95"
          } duration-300 w-full max-h-[170px] rounded-[10px] border border-[#eee] absolute top-[50px] left-0 z-[1] overflow-y-scroll bg-white`}
        >
          {data?.map((item) => (
            <div
              className={`w-full py-3 px-4 hover:px-5 hover:bg-blue bg-white hover:text-white duration-300 cursor-pointer text-[14px] whitespace-nowrap truncate `}
              key={item}
              onClick={() => {
                onClick?.(filterKey, item);
                setIsClicked(false);
              }}
            >
              {!pathname.includes("/admin") && !isTranslated ? t(item) : item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

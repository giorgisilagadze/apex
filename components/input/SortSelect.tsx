"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Props {
  title: string;
  data: { id: number; value: string }[];
  selected: string;
  setSelected: (selected: string) => void;
}

export default function SortSelect({
  title,
  data,
  selected,
  setSelected,
}: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useClickOutside(divRef, () => setIsClicked(false));

  return (
    <div className="relative" ref={divRef}>
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setIsClicked(!isClicked)}
      >
        <h1 className={`text-[14px] text-blue`}>{title}</h1>
        <p className="text-[14px] text-blue">{selected}</p>
        <MdKeyboardArrowDown
          className={`mt-[-2px] text-blue ${
            isClicked && "rotate-180"
          } duration-300`}
        />
      </div>
      <div
        className={`${
          isClicked
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        } duration-300 w-full max-h-[170px] rounded-[10px] border border-[#eee] absolute top-[30px] left-0 z-[1] overflow-y-scroll bg-white`}
      >
        {data.map((item) => (
          <div
            className={`w-full py-3 px-4 hover:px-5 hover:bg-blue bg-white hover:text-white duration-300 cursor-pointer text-[14px]`}
            key={item.id}
            onClick={() => {
              setSelected(item.value);
              setIsClicked(false);
            }}
          >
            <p className="text-[14px]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

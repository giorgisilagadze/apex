import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Props {
  title?: string;
  placeholder: string;
  color?: string;
}

export default function SelectComp({ title, placeholder, color }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeholder);
  const selectRef = useRef(null);

  useClickOutside(selectRef, () => setIsClicked(false));
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
          className="w-full flex items-center justify-between px-3 h-[40px] rounded-[10px] border border-blue cursor-pointer bg-white"
          onClick={() => setIsClicked(!isClicked)}
        >
          <p className="text-[14px] font-light">{selectedItem}</p>
          <MdKeyboardArrowDown
            className={`text-[18px] ${isClicked && "rotate-180"} duration-300`}
          />
        </div>
        <div
          className={`${
            isClicked
              ? "opacity-100 pointer-events-auto scale-100"
              : "opacity-0 pointer-events-none scale-95"
          } duration-300 w-full h-[170px] rounded-[10px] border border-[#eee] absolute top-[50px] left-0 z-[1] overflow-y-scroll bg-white`}
        >
          {["ბლოკი 1", "ბლოკი 2", "ბლოკი 3", "ბლოკი 4", "ბლოკი 5"].map(
            (item) => (
              <div
                className={`w-full py-3 px-4 hover:px-5 hover:bg-blue bg-white hover:text-white duration-300 cursor-pointer text-[14px]`}
                key={item}
                onClick={() => {
                  setSelectedItem(item);
                  setIsClicked(false);
                }}
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

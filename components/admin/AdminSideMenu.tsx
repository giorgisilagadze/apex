import { RxCross1 } from "react-icons/rx";
import Link from "next/link";

interface Props {
  isSideMenuVisible: boolean;
  setIsSideMenuVisible: (isSideMenuVisible: boolean) => void;
  nav: { id: number; title: string; link: string }[];
}

export default function AdminSideMenu({
  isSideMenuVisible,
  setIsSideMenuVisible,
  nav,
}: Props) {
  return (
    <div
      className={`fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center ${
        isSideMenuVisible
          ? "opacity-100 !z-[11] "
          : "opacity-0 -z-[1] duration-500"
      }`}
    >
      <div
        className={`w-[100vw] h-[100vh] fixed top-0 left-0 z-[12] transition-opacity ${
          isSideMenuVisible
            ? "backdrop-blur-md opacity-100 duration-0"
            : "opacity-0"
        }`}
        onClick={() => {
          setIsSideMenuVisible(false);
        }}
      ></div>
      <div
        className={`md500:w-[300px] w-full h-full bg-blue fixed top-0 left-0 duration-300 z-[13] overflow-y-auto md500:m-4 p-6 flex flex-col gap-6 ${
          isSideMenuVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full flex items-center justify-between pr-8">
          <div
            className="flex items-center gap-2 text-white"
            onClick={() => {
              setIsSideMenuVisible(false);
            }}
          >
            <RxCross1 className="text-[18px]" />
            <p className="text-[14px] mt-[3px]">გათიშვა</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          {nav.map((item) => (
            <Link
              key={item.id}
              className={`cursor-pointer border-b border-[#dcdcdc] pb-3`}
              href={item.link}
              onClick={() => setIsSideMenuVisible(false)}
            >
              <p className="text-[14px] inline-block text-white">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

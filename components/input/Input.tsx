interface Props {
  title?: string;
  placeholder: string;
  color?: string;
  bgColor?: string;
}

export default function Input({ title, placeholder, color, bgColor }: Props) {
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
          type="text"
          placeholder={placeholder}
          className={`w-full h-[44px] rounded-[10px] outline-none px-3 font-light text-[12px] ${
            bgColor ? `${bgColor}` : "border border-blue bg-white"
          }`}
        />
      </div>
    </div>
  );
}

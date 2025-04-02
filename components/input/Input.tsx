interface Props {
  title?: string;
  placeholder: string;
  color?: string;
  bgColor?: string;
  inputKey?: string;
  onChange: (inputKey: string, value: string) => void;
  value: string;
  type?: string;
  readonly?: boolean;
}

export default function Input({
  title,
  placeholder,
  color,
  bgColor,
  inputKey,
  onChange,
  value,
  type,
  readonly,
}: Props) {
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
          type={type || "text"}
          placeholder={placeholder}
          className={`w-full h-[44px] rounded-[10px] outline-none px-3 font-light text-[14px] ${
            bgColor ? `${bgColor}` : "border border-blue bg-white"
          }`}
          value={value}
          onChange={(e) => onChange(inputKey as string, e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          readOnly={readonly}
        />
      </div>
    </div>
  );
}

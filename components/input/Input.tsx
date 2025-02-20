interface Props {
  title?: string;
  placeholder: string;
  color?: string;
}

export default function Input({ title, placeholder, color }: Props) {
  return (
    <div className="w-full flex flex-col gap-[6px]">
      {title && (
        <p
          className={`text-[14px] font-medium ${color ? color : "text-black"}`}
        >
          {title}
        </p>
      )}
      <div className="w-full relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-[40px] rounded-[10px] border border-blue outline-none px-3 font-light text-[14px]"
        />
      </div>
    </div>
  );
}

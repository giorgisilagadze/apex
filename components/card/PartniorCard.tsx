import Image from "next/legacy/image";

interface Props {
  isreverse?: boolean;
  item: Partner;
}

export default function PartniorCard({ isreverse, item }: Props) {
  return (
    <div className="w-full grid sm:grid-cols-2 sm:gap-[60px] gap-10 lg:items-start items-center">
      <div
        className={`w-full lg:h-[450px] h-[350px] relative ${
          isreverse && "sm:order-2"
        }`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
          alt="partnior-image"
          layout="fill"
          objectFit="cover"
          className="rounded-[10px]"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-blueOpacity rounded-[10px]"></div>
        <div className="absolute left-8 bottom-6 flex flex-col gap-2">
          <div className="w-full h-[1px] bg-white"></div>
          <p className="text-[22px] text-white font-bold">{item.title}</p>
        </div>
      </div>
      <div
        className={`w-full flex flex-col sm:gap-6 gap-4 ${
          isreverse && "sm:order-1"
        }`}
      >
        <div className="w-[230px] h-[50px] rounded-[30px] border border-[#eee] flex items-center justify-center">
          <p className="text-[14px] font-bold">პარტნიორის შესახებ</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: item.text }}
          className="editor !text-[14px]"
        />
      </div>
    </div>
  );
}

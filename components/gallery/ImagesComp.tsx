import Image from "next/legacy/image";

interface Props {
  data: { id: number; src: string }[];
}

export default function ImagesComp({ data }: Props) {
  console.log(data);

  return (
    <div className="w-full grid sm:grid-cols-2 gap-1">
      <div className="w-full grid grid-cols-1 gap-1">
        {data[0] && (
          <div className="w-full aspect-[6/4] relative">
            <Image
              src={data[0].src}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>
        )}

        <div className="w-full grid grid-cols-2 gap-1">
          {data[1] && (
            <div className="w-full aspect-[5/4] relative">
              <Image
                src={data[1].src}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
          )}
          {data[2] && (
            <div className="w-full aspect-[5/4] relative">
              <Image
                src={data[2].src}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-1">
        <div className="w-full grid grid-cols-2 gap-1">
          {data[3] && (
            <div className="w-full aspect-[5/4] relative">
              <Image
                src={data[3].src}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
          )}
          {data[4] && (
            <div className="w-full aspect-[5/4] relative">
              <Image
                src={data[4].src}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
          )}
        </div>
        {data[5] && (
          <div className="w-full aspect-[6/4] relative">
            <Image
              src={data[5].src}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

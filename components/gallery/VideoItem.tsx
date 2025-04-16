import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function VideoItem({
  item,
  className,
}: {
  item: any;
  className: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`${className} relative group`} key={item.id}>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 10,
        }}
        loop
        muted
        playsInline
      >
        <source
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
          type="video/mp4"
        />
      </video>

      <div
        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${
          !isPlaying && "bg-[rgba(0,0,0,0.4)]"
        }  rounded-[10px] cursor-pointer`}
        onClick={handleTogglePlay}
      >
        {isPlaying ? (
          <FaPause className="text-white text-[30px] opacity-0 group-hover:opacity-100 duration-300" />
        ) : (
          <FaPlay className="text-white text-[30px]" />
        )}
      </div>
    </div>
  );
}

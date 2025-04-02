interface Props {
  height: string;
  width?: string;
  rounded?: string;
}

export default function Shimmer({ height, width, rounded }: Props) {
  return (
    <div
      className={`shimmer ${width ? width : "w-full"} ${height} ${rounded}`}
    ></div>
  );
}

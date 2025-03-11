"use client";

import Image from "next/image";
import { useState } from "react";

export default function MapImage() {
  const [hovered, setHovered] = useState("");

  const areas = [
    { id: "floor1", coords: [50, 50, 100, 100], href: "#floor1" },
    { id: "floor2", coords: [200, 200, 100, 100], href: "#floor2" },
  ];
  return (
    <div className="w-full h-full relative">
      <Image
        src={"/images/single-project.jpeg"}
        alt="project-image"
        layout="fill"
        objectFit="cover"
        useMap="#image-map"
      />
      {areas.map((area) => (
        <a
          key={area.id}
          href={area.href}
          onMouseEnter={() => setHovered(area.id)}
          onMouseLeave={() => setHovered("")}
          className="absolute border border-transparent"
          style={{
            left: `${area.coords[0]}px`,
            top: `${area.coords[1]}px`,
            width: `${area.coords[2]}px`,
            height: `${area.coords[3]}px`,
            backgroundColor:
              hovered === area.id ? "rgba(255, 0, 0, 0.3)" : "transparent",
            borderColor: hovered === area.id ? "red" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { useRef } from "react";
import { FiUpload } from "react-icons/fi";

interface Props {
  name: string;
  title: string;
  isMultiply?: boolean;
  file: any;
  setFile: (file: any) => void;
  backFile?: string;
}

export default function PdfFileUpload({
  name,
  title,
  isMultiply,
  file,
  setFile,
  backFile,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenInput = () => {
    inputRef.current !== null && inputRef?.current.click();
  };

  const handleFileChange = (e: any) => {
    console.log(e.target.files[0], "asas");
    setFile(e.target.files[0]);
  };

  const getFilenameFromPath = (path: string): string => {
    const lastSlashIndex = path.lastIndexOf("/");

    if (lastSlashIndex !== -1) {
      return path.substring(lastSlashIndex + 1);
    }

    return path;
  };

  return (
    <div className="w-full relative">
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        name={name}
        ref={inputRef}
      />
      <div
        className="w-full h-[56px] bg-[rgb(241,244,247)] flex items-center justify-between px-4 rounded-[10px] absolute top-0 left-0 cursor-pointer hover:opacity-70 duration-300"
        onClick={handleOpenInput}
      >
        <p className="text-[14px] ">{title}</p>
        <FiUpload className="text-[20px] text-blue" />
      </div>
      {file ? (
        <p className="text-[14px] text-blue absolute top-[58px] left-2">
          {file.name}
        </p>
      ) : (
        backFile && (
          <p className="text-[14px] text-blue absolute top-[58px] left-2">
            {getFilenameFromPath(backFile)}
          </p>
        )
      )}
    </div>
  );
}

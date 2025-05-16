"use client";

import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

interface Props {
  name: string;
  image: any;
  setImage: (image: any) => void;
  backImage?: string;
  isMultiply?: boolean;
}

export default function PhotoUpload({
  name,
  setImage,
  image,
  backImage,
  isMultiply,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenInput = () => {
    inputRef.current !== null && inputRef?.current.click();
  };

  const handleMultipleFilesChange = (event: any) => {
    let tmpImageList: any = isMultiply ? [...image] : [];
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (isMultiply) {
        const isDuplicate = tmpImageList.some(
          (photo: any) => photo.file.name === file.name
        );

        if (!isDuplicate) {
          tmpImageList.push({ file, id: Date.now() + i });
        }
      } else {
        // Ensure the file is wrapped in an object to maintain consistency
        tmpImageList = [{ file, id: Date.now() }];
      }
    }
    setImage(tmpImageList);
  };

  const handleDelete = (id: number) => {
    const newPhotoes = image.filter((item: any) => item.id !== id);
    setImage(newPhotoes);
  };

  console.log(image);

  return (
    <div className="w-full flex flex-col gap-5">
      {backImage && (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${backImage}`}
          alt="uploaded photo"
          className="md500:w-[190px] w-full h-[170px] object-cover rounded-[10px]"
        />
      )}
      <div className="w-full flex flex-wrap gap-4">
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          name={name}
          onChange={handleMultipleFilesChange}
          accept="image/*"
          multiple={isMultiply}
        />
        <div
          className="md500:w-[190px] w-full h-[170px] p-5 border border-blue rounded-[10px] border-dotted bg-lightblue flex items-center justify-center flex-col gap-3 cursor-pointer hover:shadow-dropDown duration-200"
          onClick={handleOpenInput}
        >
          <FiUpload className="text-[30px] text-blue" />
          <p className="text-[14px] text-blue font-bold">ატვირთვა</p>
        </div>
        <div className="flex gap-4 flex-wrap">
          {image &&
            image.length !== 0 &&
            image.map((item: any, index: number) => {
              let fileUrl = URL.createObjectURL(item.file);
              return (
                <div key={item.id} draggable className="relative">
                  <img
                    src={fileUrl}
                    alt="uploaded photo"
                    className="md500:w-[190px] w-full h-[170px] object-cover duration-300 rounded-[10px]"
                  />
                  <div
                    className="w-5 h-5 bg-black rounded-[50%] absolute top-2 right-2 flex items-center justify-center cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  >
                    <RxCross1 className="text-white text-[12px]" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

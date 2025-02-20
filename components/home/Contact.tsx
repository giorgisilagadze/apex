"use client";

import Image from "next/image";
import Input from "../input/Input";
import SelectComp from "../input/SelectComp";
import Button from "../button/Button";
import { BsArrowDown } from "react-icons/bs";

export default function Contact() {
  return (
    <div className="w-full px-[330px] grid grid-cols-2">
      <div className="w-full h-[550px] relative">
        <Image
          src={"/images/contact.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          className="rounded-tl-[10px] rounded-bl-[10px]"
        />
      </div>
      <div className="w-full h-full bg-blue rounded-tr-[10px] roudned-br-[10px] flex items-center justify-center flex-col gap-5 px-[100px]">
        <p className="text-[28px] font-bold text-white">
          დაგვიტოვეთ საკონტაქტო
        </p>
        <p className="text-[14px] text-white font-light">
          ჩვენი მენეჯერი დაგიკავშირდებათ 15 წუთის განმავლობაში
        </p>
        <div className="w-full grid grid-cols-2 gap-5">
          <Input
            placeholder={"მაგ. დავითი"}
            title="სახელი და გვარი"
            color="text-white"
          />
          <Input
            placeholder={"+995"}
            title="ტელეფონის ნომერი"
            color="text-white"
          />
          <Input
            placeholder={"Example@apexd.ge"}
            title="ელექტრონული ფოსტა"
            color="text-white"
          />
          <SelectComp
            placeholder={"აპექს ნუცუბიძე"}
            title="პროექტები"
            color="text-white"
          />
        </div>
        <Button
          title={"გაგზავნა"}
          onClick={() => {}}
          width={"w-full"}
          color="text-white"
          bgColor="bg-lightBlue"
          right={true}
          icon={BsArrowDown}
          height="h-[45px]"
          rounded="rounded-[12px]"
        />
      </div>
    </div>
  );
}

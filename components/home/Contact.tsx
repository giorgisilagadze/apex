"use client";

import Image from "next/image";
import Input from "../input/Input";
import SelectComp from "../input/SelectComp";
import Button from "../button/Button";
import { BsArrowDown } from "react-icons/bs";

export default function Contact() {
  return (
    <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 grid lg:grid-cols-2">
      <div className="w-full lg:h-[550px] md500:h-[400px] h-[350px] relative">
        <Image
          src={"/images/contact.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          className="rounded-tl-[10px] lg:rounded-bl-[10px] rounded-tr-[10px] lg:rounded-tr-[0px]"
        />
      </div>
      <div className="w-full h-full bg-blue lg:rounded-tr-[10px] rounded-bl-[10px] lg:rounded-bl-[0px] rounded-br-[10px] flex items-center justify-center flex-col gap-5 xxl:px-[100px] md500:px-10 px-6 py-10 lg:py-0">
        <p className="sm:text-[28px] text-[22px] font-bold text-white">
          დაგვიტოვეთ საკონტაქტო
        </p>
        <p className="text-[14px] text-white font-light text-center">
          ჩვენი მენეჯერი დაგიკავშირდებათ 15 წუთის განმავლობაში
        </p>
        <div className="w-full grid md500:grid-cols-2 gap-5">
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

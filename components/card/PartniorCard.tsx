import Image from "next/image";

interface Props {
  isreverse?: boolean;
}

export default function PartniorCard({ isreverse }: Props) {
  return (
    <div className="w-full grid sm:grid-cols-2 sm:gap-[60px] gap-10 lg:items-start items-center">
      <div
        className={`w-full lg:h-[450px] h-[350px] relative ${
          isreverse && "sm:order-2"
        }`}
      >
        <Image
          src={"/images/tbc.png"}
          alt="partnior-image"
          layout="fill"
          objectFit="cover"
          className="rounded-[10px]"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-blueOpacity rounded-[10px]"></div>
        <div className="absolute left-8 bottom-6 flex flex-col gap-2">
          <div className="w-full h-[1px] bg-white"></div>
          <p className="text-[22px] text-white font-bold">თიბისი ბანკი</p>
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
        <p className="text-[14px] font-light leading-6">
          თიბისი ბანკი, რომელიც არსებობს მომხმარებლებისთვის, იცნობს მათ და
          ზრუნავს მათზე. ჰყავთ  საუკეთესო გუნდი, რომელსაც არ ეშინია შეცდომების
          და ინოვაციურად აზროვნებს. თიბისი ადამიანების ყოველდღიურობის
          მნიშვნელოვანი ნაწილია და ემსახურება მათ ციფრულად. თიბისის კულტურა
          დაფუძნებულია გუნდზე, რომელიც არის: გამარჯვებული, ბედნიერი,
          ცნობისმოყვარე, შედეგზე ორიენტირებული, ღია ახალი შესაძლებლობებისთვის,
          კეთილსინდისიერი და ყოველთვის ასრულებს დანაპირებს. თიბისი ბანკის
          მისიაა: გაუმარტივოს ადამიანებს ცხოვრება!
        </p>
      </div>
    </div>
  );
}

"use client";

import PagePagination from "@/components/PagePagination";
import SendEmail from "@/components/SendEmail";
import PartniorCard from "@/components/card/PartniorCard";
import Image from "next/image";

export default function Partniors() {
  return (
    <div className="w-full ">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/partniors.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            პარტნიორები
          </h1>
          <p className="text-[14px] text-white self-end sm:self-center">
            მთავარი / პარტნიორები
          </p>
        </div>
      </div>
      <div className="w-full sm:mt-[100px] mt-[60px]">
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex flex-col gap-[60px] items-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[22px] font-bold text-center">
              პარტნიორების როლი ჩვენს საქმიანობაში
            </h1>
            <p className="text-[14px] font-light text-center">
              პარტნიორები ჩვენთვის ძალიან მნიშვნელოვანია ბევრ მიზეზთა გამო.
              ისინი გვთავაზობენ მრავალ სარგებელს, რაც ხელს უწყობს კომპანიის
              ზრდას, ინოვაციასა და საერთო ჯამში ჩვენს წარმატებას. პარტნიორობა
              ხშირად გულისხმობს თანამშრომლობას ოგრანიზაციებთან, რომლებსაც აქვთ
              დამატებითი უნარები, გამოცდილება და ძლიერი მხარეები. ჩვენი
              თანამშრომლობა პარტნიორებთან გვეხმარება, რომ უკეთესად დავნერგოთ
              ინოვაციური კულტურა. გარდა ამისა, მსგავსი ორგანიზაციები
              გვეხმარებიან, რომ გავაძლიეროთ სანდოობა და რეპუტაცია, რაც ძალიან
              მნიშვნელოვანია ჩვენი კომპანიისთვის.
            </p>
          </div>
          <PagePagination
            dataLength={20}
            itemsPerPage={3}
            both={false}
            currentPage={0}
            setCurrentPage={() => {}}
            onClick={() => {}}
          >
            <div className="w-full flex flex-col gap-[60px]">
              {[1, 2, 3].map((item) => (
                <PartniorCard
                  key={item}
                  isreverse={item % 2 == 0 ? true : false}
                />
              ))}
            </div>
          </PagePagination>
        </div>
        <div className="mt-[60px] w-full">
          <SendEmail />
        </div>
      </div>
    </div>
  );
}

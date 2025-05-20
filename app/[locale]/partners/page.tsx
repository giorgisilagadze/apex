import SendEmail from "@/components/SendEmail";
import PartniorCard from "@/components/card/PartniorCard";
import { FetchPartners } from "@/serverside/FetchPartners";
import { getTranslations } from "next-intl/server";
import Image from "next/legacy/image";

export default async function Partniors() {
  const partners: Partner[] = await FetchPartners();

  const t = await getTranslations("Partners");

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
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            {t("title")}
          </h1>
          <p className="text-[14px] text-white sm:self-center">{t("page")}</p>
        </div>
      </div>
      <div className="w-full sm:mt-[100px] mt-[60px]">
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 flex flex-col gap-[60px] items-center">
          <div className="flex flex-col sm:items-center gap-4">
            <h1 className="sm:text-[22px] text-[20px] font-bold sm:text-center">
              {t("text1")}
            </h1>
            <p className="text-[14px] font-light sm:text-center">
              {t("text2")}
            </p>
          </div>
          {/* <PagePagination
            dataLength={20}
            itemsPerPage={3}
            both={false}
            currentPage={0}
            setCurrentPage={() => {}}
            onClick={() => {}}
          > */}
          <div className="w-full flex flex-col gap-[60px]">
            {partners.map((item, index) => (
              <PartniorCard
                key={item.id}
                isreverse={(index + 1) % 2 == 0 ? true : false}
                item={item}
              />
            ))}
          </div>
          {/* </PagePagination> */}
        </div>
        <div className="mt-[100px] w-full">
          <SendEmail />
        </div>
      </div>
    </div>
  );
}

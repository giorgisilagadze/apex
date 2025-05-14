import SendEmail from "@/components/SendEmail";
import OtherNewsCard from "@/components/card/OtherNewsCard";
import { FetchNews } from "@/serverside/FetchNews";
import { FetchSingleNews } from "@/serverside/FetchSingleNews";
import { getLocale } from "next-intl/server";
import Image from "next/legacy/image";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default async function SingleNews({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const newsId = (await params).newsId;
  const singleNews: NewsItem = await FetchSingleNews(newsId);
  const news: { data: NewsItem[]; total: number } = await FetchNews();

  const locale = await getLocale();

  const socIcons = [
    {
      id: 1,
      icon: <FaFacebookF className="text-[14px]" />,
    },
    {
      id: 2,
      icon: <RiInstagramFill className="text-[15px]" />,
    },
    {
      id: 3,
      icon: <FaLinkedinIn className="text-[14px]" />,
    },
    {
      id: 4,
      icon: <FaYoutube className="text-[15px]" />,
    },
  ];

  const types = [
    {
      id: 1,
      title: "პროექტი",
      count: news.data.filter((item) => item.type == "პროექტი").length,
    },
    {
      id: 2,
      title: "ღონისძიება",
      count: news.data.filter((item) => item.type == "ღონისძიება").length,
    },
    {
      id: 3,
      title: "გამოფენა",
      count: news.data.filter((item) => item.type == "გამოფენა").length,
    },
  ];

  return (
    <div className="w-full ">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/contact.jpeg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <h1 className="lg:text-[60px] text-[40px] font-light text-white">
            სიახლეები
          </h1>
          <p className="text-[14px] text-white sm:self-center">
            მთავარი / სიახლეები
          </p>
        </div>
      </div>
      <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 sm:mt-[100px] mt-[60px] grid lg:grid-cols-6 lg:gap-[60px] gap-y-8">
        <div className="w-full  lg:col-span-4 flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full xl:h-[500px] h-[400px] relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${singleNews.img}`}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
              <div className="absolute top-0 right-0 rounded-tr-[10px] rounded-bl-[10px] bg-black px-5 py-2">
                <p className="text-[14px] text-white font-light">
                  {singleNews.type}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <p className="text-[14px] text-blue">
                {singleNews.created_at.slice(0, 10).replaceAll("-", ".")}
              </p>
              <p className="text-[22px] font-bold">
                {locale == "ge"
                  ? singleNews.title
                  : locale == "en"
                  ? singleNews.title_en
                  : singleNews.text_ru}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    locale == "ge"
                      ? singleNews.text
                      : locale == "en"
                      ? singleNews.text_en
                      : singleNews.text_ru,
                }}
                className="editor"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-3 mt-4">
              <p className="text-[12px] font-bold">გაზიარება</p>
              {socIcons.map((item) => (
                <div
                  key={item.id}
                  className="w-8 h-8 rounded-[50%] flex items-center justify-center hover:text-blue hover:border hover:border-blue duration-300 cursor-pointer"
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-full md600:w-[50%] w-full flex flex-col gap-6 lg:col-span-2">
          <h1 className="font-bold text-[18px]">კატეგორიები</h1>
          <div className="flex flex-col gap-4 w-full">
            {types.map((item) => (
              <div
                className="w-full flex items-center justify-between"
                key={item.id}
              >
                <div>
                  <p className="text-[14px] text-grey font-light hover:text-blue duration-300 cursor-pointer">
                    {item.title}
                  </p>
                </div>
                <p className="text-[14px] text-grey font-light">{`(${item.count})`}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full gap-4">
            <h1 className="font-bold text-[18px]">სხვა სიახლეები</h1>
            {news.data
              .filter((item) => item.id !== parseInt(newsId))
              .map((item) => (
                <OtherNewsCard key={item.id} item={item} />
              ))}
          </div>
        </div>
      </div>
      <div className="w-full  mt-[100px]">
        <SendEmail />
      </div>
    </div>
  );
}

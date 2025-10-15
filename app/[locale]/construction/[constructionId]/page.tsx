import { FetchSingleConstruction } from "@/serverside/FetchSingleConstruction";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/legacy/image";

export default async function SingleConstruction({
  params,
}: {
  params: Promise<{ constructionId: string }>;
}) {
  const constructionId = (await params).constructionId;
  const singleConstruction: Construction = await FetchSingleConstruction(
    constructionId
  );
  const locale = await getLocale();
  const t = await getTranslations("constructionPage");

  return (
    <div className="w-full">
      <div className="w-full sm:h-[400px] h-[300px] relative">
        <Image
          src={"/images/construction.jpg"}
          alt="project-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 absolute top-[50%] translate-y-[-50%] left-0 flex sm:items-center justify-between sm:flex-row flex-col sm:gap-4">
          <div>
            <p className="text-[15px] text-white">
              {locale == "ka"
                ? singleConstruction.title
                : locale == "en"
                ? singleConstruction.title_en
                : singleConstruction.title_ru}
            </p>
            <h1 className="lg:text-[60px] text-[40px] font-light text-white">
              {t("title")}
            </h1>
          </div>

          <p className="text-[14px] text-white sm:self-center">{t("page")}</p>
        </div>
      </div>
      <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 py-[60px] sm:py-10 flex flex-col gap-10">
        {singleConstruction.news.map((item) => (
          <div className="w-full flex flex-col gap-2" key={item.id}>
            <h1 className="text-[16px] text-blue">
              {item.created_at.slice(0, 10).replaceAll("-", ".")}
            </h1>
            <h1 className="sm:text-[24px] text-[20px]">
              {locale == "ka"
                ? item.text
                : locale == "en"
                ? item.text_en
                : item.text_ru}
            </h1>
            <div className="w-full aspect-[8/4] relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img1}`}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  locale == "ka"
                    ? (item.sub_text as string)
                    : locale == "en"
                    ? (item.sub_text_en as string)
                    : (item.sub_text_ru as string),
              }}
              className="editor sm:text-[14px] text-[12px] mt-2"
            />
            <div className="w-full grid sm:grid-cols-2 gap-5 mt-2">
              <div className="w-full aspect-[6/4] relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img2}`}
                  alt="project-image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px]"
                />
              </div>
              <div className="w-full aspect-[6/4] relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img3}`}
                  alt="project-image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px]"
                />
              </div>
            </div>
            <div className="w-full mt-4 flex flex-col gap-4">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    locale == "ka"
                      ? (item.sub_text1 as string)
                      : locale == "en"
                      ? (item.sub_text1_en as string)
                      : (item.sub_text1_ru as string),
                }}
                className="editor sm:text-[14px] text-[12px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

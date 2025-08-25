import Image from "next/legacy/image";

export default async function SingleConstruction({
  params,
}: {
  params: Promise<{ constructionId: string }>;
}) {
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
            <p className="text-[15px] text-white">აპექს ნუცუბიძე</p>
            <h1 className="lg:text-[60px] text-[40px] font-light text-white">
              მშენებლობა
            </h1>
          </div>

          <p className="text-[14px] text-white sm:self-center">
            მთავარი / მშენებლობა
          </p>
        </div>
      </div>
      <div className="w-full xl1600:px-[330px] lg1250:px-[200px] lg:px-[100px] sm:px-[64px] px-6 py-[60px] sm:py-10 flex flex-col gap-10">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-[16px] text-blue">07.02.2025</h1>
          <h1 className="sm:text-[24px] text-[20px]">
            აპექს ნუცუბიძის მეორე კორპუსის სამუშაოები
          </h1>
          <div className="w-full aspect-[8/4] relative">
            <Image
              src={"/images/const1.jpg"}
              alt="project-image"
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>
          <p className="sm:text-[14px] text-[12px] text-grey mt-2">
            APEX Development-ში საშემოდგომო შეთავაზება დაიწყო! შეარჩიე სასურველი
            ბინა მშენებარე პროექტში 'აპექს ისანი' ან 'აპექს ნუცუბიძე' და
            ისარგებლე აქციის პირობით: ერთიანი გადახდისას მიიღეთ კვადრატულზე
            $150-იანი ფასდაკლება, ხოლო 50%-იანი წინასწარი შენატანისას ისარგებლეთ
            $75-იანი ფასდაკლებით. აქციია მოქმედებს შერჩეულ ბინებზე, როგორც
            ერთ-საძინებლიან, ასევე დიდ ბინებზე. შეგახსენებთ, რომ კომპლექსში
            'აპექს ნუცუბიძე' ბინები 42,3კვ.მ-დან იწყება, ხოლო პროექტში 'აპექს
            ისანი' ბინები 47კვ.მ-დან შეგიძლიათ შეიძინოთ.
          </p>
          <div className="w-full grid sm:grid-cols-2 gap-5 mt-2">
            <div className="w-full aspect-[6/4] relative">
              <Image
                src={"/images/const1.jpg"}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
            <div className="w-full aspect-[6/4] relative">
              <Image
                src={"/images/const1.jpg"}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
          </div>
          <div className="w-full mt-4 flex flex-col gap-4">
            <h1 className="text-[18px]">სამშენებლო პროცესი</h1>
            <p className="sm:text-[14px] text-[12px] text-grey">
              APEX Development-ში საშემოდგომო შეთავაზება დაიწყო! შეარჩიე
              სასურველი ბინა მშენებარე პროექტში 'აპექს ისანი' ან 'აპექს
              ნუცუბიძე' და ისარგებლე აქციის პირობით: ერთიანი გადახდისას მიიღეთ
              კვადრატულზე $150-იანი ფასდაკლება, ხოლო 50%-იანი წინასწარი
              შენატანისას ისარგებლეთ $75-იანი ფასდაკლებით. აქციია მოქმედებს
              შერჩეულ ბინებზე, როგორც ერთ-საძინებლიან, ასევე დიდ ბინებზე.
              შეგახსენებთ, რომ კომპლექსში 'აპექს ნუცუბიძე' ბინები 42,3კვ.მ-დან
              იწყება, ხოლო პროექტში 'აპექს ისანი' ბინები 47კვ.მ-დან შეგიძლიათ
              შეიძინოთ.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-[16px] text-blue">07.21.2025</h1>
          <h1 className="sm:text-[24px] text-[20px]">
            აპექს ნუცუბიძის პირველი კორპუსის მშენებლობა დასრულდა
          </h1>
          <div className="w-full grid sm:grid-cols-2 gap-5 mt-4">
            <div className="w-full aspect-[6/4] relative">
              <Image
                src={"/images/const1.jpg"}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
            <div className="w-full aspect-[6/4] relative">
              <Image
                src={"/images/const1.jpg"}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
          </div>
          <p className="sm:text-[14px] text-[12px] text-grey mt-4">
            APEX Development-ში საშემოდგომო შეთავაზება დაიწყო! შეარჩიე სასურველი
            ბინა მშენებარე პროექტში 'აპექს ისანი' ან 'აპექს ნუცუბიძე' და
            ისარგებლე აქციის პირობით: ერთიანი გადახდისას მიიღეთ კვადრატულზე
            $150-იანი ფასდაკლება, ხოლო 50%-იანი წინასწარი შენატანისას ისარგებლეთ
            $75-იანი ფასდაკლებით. აქციია მოქმედებს შერჩეულ ბინებზე, როგორც
            ერთ-საძინებლიან, ასევე დიდ ბინებზე. შეგახსენებთ, რომ კომპლექსში
            'აპექს ნუცუბიძე' ბინები 42,3კვ.მ-დან იწყება, ხოლო პროექტში 'აპექს
            ისანი' ბინები 47კვ.მ-დან შეგიძლიათ შეიძინოთ.
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-[16px] text-blue">07.21.2025</h1>
          <h1 className="sm:text-[24px] text-[20px]">
            აპექს ნუცუბიძის პირველი კორპუსის მშენებლობა დასრულდა
          </h1>
          <div className="w-full grid sm:grid-cols-2 gap-5 mt-4">
            <div className="w-full aspect-[6/4] relative">
              <Image
                src={"/images/const1.jpg"}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
            <div className="w-full aspect-[6/4] relative">
              <Image
                src={"/images/const1.jpg"}
                alt="project-image"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
          </div>
          <p className="sm:text-[14px] text-[12px] text-grey mt-4">
            APEX Development-ში საშემოდგომო შეთავაზება დაიწყო! შეარჩიე სასურველი
            ბინა მშენებარე პროექტში 'აპექს ისანი' ან 'აპექს ნუცუბიძე' და
            ისარგებლე აქციის პირობით: ერთიანი გადახდისას მიიღეთ კვადრატულზე
            $150-იანი ფასდაკლება, ხოლო 50%-იანი წინასწარი შენატანისას ისარგებლეთ
            $75-იანი ფასდაკლებით. აქციია მოქმედებს შერჩეულ ბინებზე, როგორც
            ერთ-საძინებლიან, ასევე დიდ ბინებზე. შეგახსენებთ, რომ კომპლექსში
            'აპექს ნუცუბიძე' ბინები 42,3კვ.მ-დან იწყება, ხოლო პროექტში 'აპექს
            ისანი' ბინები 47კვ.მ-დან შეგიძლიათ შეიძინოთ.
          </p>
        </div>
      </div>
    </div>
  );
}

import { useClientTranslation } from "@/i18n/client";
import Image from "next/image";

export default function Section2(){
  const { t } = useClientTranslation("Common");

  return (
    <section className="container mx-auto py-16 px-[40px] ">
    <h2 className="text-3xl font-bold text-gray-800 mb-12">{t("partnership.section2.title01")}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <Image src="/images/Review.png" alt="Icon" className="h-16 w-16" width={22} height={22}/>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{t("partnership.section2.title02")}</h3>
        <p className="text-sm text-gray-500">
        {t("partnership.section2.title02")}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <Image src="/images/Puzzle.png" alt="Icon" className="h-16 w-16" width={22} height={22}/>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{t("partnership.section3.title03")}</h3>
        <p className="text-sm text-gray-500">
        {t("partnership.section4.title04")}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <Image src="/images/Search.png" alt="Icon" className="h-16 w-16" width={22} height={22}/>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{t("partnership.section5.title05")}</h3>
        <p className="text-sm text-gray-500">
        {t("partnership.section6.title06")}
        </p>
      </div>
    </div>
  </section>
  )
}

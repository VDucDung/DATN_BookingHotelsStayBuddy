import { useClientTranslation } from "@/i18n/client";
import Image from "next/image";

export default function Section3(){
  const { t } = useClientTranslation("Common");

  return (
    <section className="container mx-auto py-16 px-[40px]">
    <h2 className="text-3xl font-bold text-gray-800 mb-12">{t("partnership.section3.title01")}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <div className="bg-white border-2 border-yellow-400 rounded-lg p-6">
        <p className="text-gray-600 italic mb-4">{t("partnership.section3.title02")}</p>
        <div className="flex items-center space-x-4">
          <Image src="/images/booking-icon.jpg" alt="Avatar" className="h-12 w-12 rounded-full" width={22} height={22}/>
          <div>
            <h4 className="text-sm font-bold text-gray-700">{t("partnership.section3.title03")}</h4>
            <p className="text-sm text-gray-500">{t("partnership.section3.title04")}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-2 border-yellow-400 rounded-lg p-6">
        <p className="text-gray-600 italic mb-4">{t("partnership.section3.title05")}</p>
        <div className="flex items-center space-x-4">
          <Image src="/images/booking-icon.jpg" alt="Avatar" className="h-12 w-12 rounded-full" width={22} height={22}/>
          <div>
            <h4 className="text-sm font-bold text-gray-700">{t("partnership.section3.title06")}</h4>
            <p className="text-sm text-gray-500">{t("partnership.section3.title07")}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-2 border-yellow-400 rounded-lg p-6">
        <p className="text-gray-600 italic mb-4">{t("partnership.section3.title08")}</p>
        <div className="flex items-center space-x-4">
          <Image src="/images/booking-icon.jpg" alt="Avatar" className="h-12 w-12 rounded-full"width={22} height={22}/>
          <div>
            <h4 className="text-sm font-bold text-gray-700">{t("partnership.section3.title09")}</h4>
            <p className="text-sm text-gray-500">{t("partnership.section3.title10")}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-2 border-yellow-400 rounded-lg p-6">
        <p className="text-gray-600 italic mb-4">{t("partnership.section3.title11")}</p>
        <div className="flex items-center space-x-4">
          <Image src="/images/booking-icon.jpg" alt="Avatar" className="h-12 w-12 rounded-full" width={22} height={22}/>
          <div>
            <h4 className="text-sm font-bold text-gray-700">{t("partnership.section3.title12")}</h4>
            <p className="text-sm text-gray-500">{t("partnership.section3.title13")}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-2 border-yellow-400 rounded-lg p-6">
        <p className="text-gray-600 italic mb-4">{t("partnership.section3.title14")}</p>
        <div className="flex items-center space-x-4">
          <Image src="/images/booking-icon.jpg" alt="Avatar" className="h-12 w-12 rounded-full" width={22} height={22}/>
          <div>
            <h4 className="text-sm font-bold text-gray-700">{t("partnership.section3.title15")}</h4>
            <p className="text-sm text-gray-500">{t("partnership.section3.title16")}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-2 border-yellow-400 rounded-lg p-6">
        <p className="text-gray-600 italic mb-4">{t("partnership.section3.title17")}</p>
        <div className="flex items-center space-x-4">
          <Image src="/images/booking-icon.jpg" alt="Avatar" className="h-12 w-12 rounded-full" width={22} height={22}/>
          <div>
            <h4 className="text-sm font-bold text-gray-700">{t("partnership.section3.title18")}</h4>
            <p className="text-sm text-gray-500">{t("partnership.section3.title19")}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
  )
}

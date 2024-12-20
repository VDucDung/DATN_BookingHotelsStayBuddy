import { useClientTranslation } from "@/i18n/client";

export default function Section1(){
  const { t } = useClientTranslation("Common");
  return (
  <section className="container mx-auto py-12 px-[40px]">
  <h1 className="text-3xl font-bold mb-8">{t("partnership.section1.title01")}</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">✔️ {t("partnership.section1.title02")}</h2>
      <p>{t("partnership.section1.title03")}</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">✔️ {t("partnership.section1.title04")}</h2>
      <p>{t("partnership.section1.title05")} <a href="#" className="text-blue-600 underline">{t("partnership.section1.title06")}</a>.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">✔️ {t("partnership.section1.title07")}</h2>
      <p>{t("partnership.section1.title08")}</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">✔️ {t("partnership.section1.title09")}</h2>
      <p>{t("partnership.section1.title10")} <a href="#" className="text-blue-600 underline">{t("partnership.section1.title11")}</a>.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">✔️ {t("partnership.section1.title12")}</h2>
      <p>{t("partnership.section1.title13")} <a href="#" className="text-blue-600 underline">{t("partnership.section1.title14")}</a> {t("partnership.section1.title15")}</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">✔️ {t("partnership.section1.title15")}</h2>
      <p>{t("partnership.section1.title16")}</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">✔️ {t("partnership.section1.title17")}</h2>
      <p>{t("partnership.section1.title18")}</p>
    </div>
  </div>
</section>
  )
}

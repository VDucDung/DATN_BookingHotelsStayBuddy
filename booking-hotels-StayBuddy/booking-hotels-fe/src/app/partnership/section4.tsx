import { useClientTranslation } from "@/i18n/client";
import Accordion from "./Accordion";

export default function Section4() {
  const { t } = useClientTranslation("Common");

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto space-y-6 px-[40px]">
        <div className="flex space-x-6">       
          <div>
          <Accordion
            title={t("partnership.section4.title01")}
            content={t("partnership.section4.title02")}
          /></div>
          <div>
            <Accordion
              title={t("partnership.section4.title03")}
              content={t("partnership.section4.title04")}
            />
          </div>
          </div>
        <div className="text-sm">
        {t("partnership.section4.title05")} <a href="#" className="text-blue-600 underline">{t("partnership.section4.title06")}</a> {t("partnership.section4.title07")}
        </div>
      </div>

    </div>
  )
}

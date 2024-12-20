import { ArrowRightIcon, CheckIcon } from "@/assets/icons";
import { useClientTranslation } from "@/i18n/client";
import Link from "next/link";

export function Banner() {
  const { t } = useClientTranslation("Common");

  return (
    <div className="bg-[#00ba51] text-white mt-[115px]">
      <div className="container mx-auto p-10 flex">
        <div className="mt-8 px-4">
          <h2 className="text-4xl font-bold mb-4">{t("partnership.banner.title01")}</h2>
          <p className="text-lg mb-4">{t("partnership.banner.title02")}</p>
        </div>

        <div className="mt-8 bg-gray-100 p-6 rounded-md text-black mx-3">
          <h3 className="text-2xl font-bold mb-4">{t("partnership.banner.title03")}</h3>
          <ul className="space-y-4">
            <li className="flex">
              <CheckIcon className='text-green-700 mr-3 w-6 h-6' width={22} height={22} />
              <span>{t("partnership.banner.title04")}</span>
            </li>
            <li className="flex">
              <CheckIcon className='text-green-700  mr-3 w-6 h-6' width={22} height={22} />
              <span>{t("partnership.banner.title05")}</span>
            </li>
            <li className="flex">
              <CheckIcon className='text-green-700 mr-3 w-6 h-6' width={22} height={22} />
              <span>{t("partnership.banner.title06")}</span>
            </li>
          </ul>
          <Link href={'partnership/signup'}>
            <button className="w-full bg-[#00ba51] hover:bg-green-700 text-white px-6 py-3 rounded-md mt-4 flex items-center text-center justify-center">
            {t("partnership.banner.title07")}
              <ArrowRightIcon className='w-6 h-6 text-white' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

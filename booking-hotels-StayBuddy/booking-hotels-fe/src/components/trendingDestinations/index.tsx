
"use client";
import { useClientTranslation } from "@/i18n/client";
import CustomButton from "../button/CustomButton";
import { useAppDispatch, useAppSelector } from "@/redux";
import { useEffect } from "react";
import { getCategories } from "@/api/categoryService";
import Loading from "../loading";
import { getRandomElements } from "@/utils/getRandomElements";
import { PATH } from "@/configs";
import Link from "next/link";

function Trendingdestinations(): JSX.Element {
  const { t } = useClientTranslation('Common');
  const dispatch = useAppDispatch()
  const { categories, loading, error } = useAppSelector((state) => state.categories)

  const trendingCategories = getRandomElements(categories, 3)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  if (loading) {
    return <Loading className="mt-5 mx-auto" />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-5">
        {error}
      </div>
    );
  }

  return (
    <section className="container grid grid-cols-1 xl:grid-cols-3 xl:grid-rows-2 grid-rows-3 gap-6">
      <div className="col-span-1 xl:col-span-2 row-span-1 xl:row-span-2 overflow-hidden rounded-xl relative">
        <div className="relative w-full xl:aspect-[5/4] aspect-[3/2] overflow-hidden">
          <div
            className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
            style={{
              backgroundImage: `url(${trendingCategories[0]?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute p-4 md:p-6 text-left">
            <h2 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-white">
              {t(`${trendingCategories[0]?.name}`)}
            </h2>
            <p className="text-sm md:text-lg font-medium text-white mt-2">
              {t("home.trendingDestinations.desc1")}
            </p>
            <CustomButton
              rounded
              bgColor="white"
              textColor="emerald-700"
              bgHoverColor="yellow-500"
              href={PATH.SEARCH}
              className="font-medium mt-4 w-fit"
            >
              <Link href={`/search?address=${trendingCategories[0]?.name}`}>
                {t("pageTitle.other")}
              </Link>
            </CustomButton>
          </div>
        </div>
      </div>

      <div className="relative w-full xl:aspect-[5/4] aspect-[3/2] rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
          style={{
            backgroundImage: `url(${trendingCategories[1]?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute p-4 md:p-6">
          <h2 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-white">
            {t(`${trendingCategories[1]?.name}`)}
          </h2>
          <CustomButton
            rounded
            bgColor="white"
            textColor="emerald-700"
            className="font-medium mt-2 w-fit"
            bgHoverColor="yellow-500"
          >
            <Link href={`/search?address=${trendingCategories[1]?.name}`}>
              {t("pageTitle.other")}
            </Link>
          </CustomButton>
        </div>
      </div>

      <div className="relative w-full xl:aspect-[5/4] aspect-[3/2] rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
          style={{
            backgroundImage: `url(${trendingCategories[2]?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute p-4 md:p-6">
          <h2 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-white">
            {t(`${trendingCategories[2]?.name}`)}
          </h2>
          <CustomButton
            rounded
            bgColor="white"
            textColor="emerald-700"
            className="font-medium mt-2 w-fit"
            bgHoverColor="yellow-500"
          >
            <Link href={`/search?address=${trendingCategories[2]?.name}`}>
              {t("pageTitle.other")}
            </Link>
          </CustomButton>
        </div>
      </div>
    </section>
  );
}

export default Trendingdestinations;

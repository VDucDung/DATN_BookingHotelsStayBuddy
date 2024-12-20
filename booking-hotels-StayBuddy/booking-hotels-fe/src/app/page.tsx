"use client";
import React from 'react';
import Banner from '@/components/banner';
import Divider from '@/components/devider';
import Email from '@/components/email';
import Trendingdestinations from '@/components/trendingDestinations';
import Category from '@/components/category';
import { useClientTranslation } from '@/i18n/client';
import HotelFavoriteCardList from '@/components/hotelFavoriteCardList';
import HotelCardList from '@/components/hotelCardList';
import HotelOldCardList from '@/components/hotelOldCardList';
import RelatedProducts from '@/components/relatedProducts';

export default function Home() {
  const { t } = useClientTranslation('Common');
  return (
    <section>
      <Banner />
      <section>
        <div className="space-y-3 container mx-auto">
          <div className="col-span-12 sm:mt-14">
            <div className="text-black ">
              <h1 className='text-[35px] font-semibold mt-10'>{t('home.category.ca01')}</h1>
              <p className='font-normal text-[#595959]'>{t('home.category.ca02')}</p>
            </div>
            <Category />
          </div>
          <div className="col-span-12 sm:mt-14">
            <h2 className="text-emerald text-[35px] font-medium mt-10">
              {t('home.favoriteCardList.fa01')}
            </h2>
            <Divider color="emerald-500" height="2px" />
            <HotelFavoriteCardList />
          </div>
          <div className="col-span-12 sm:mt-14 ">
            <h2 className="text-emerald text-[35px] font-medium mt-10">
              {t('home.hotelCardList.ho01')}
            </h2>
            <Divider color="emerald-500" height="2px" />
            <HotelCardList />
          </div>
          <div className="col-span-12 sm:mt-14">
            <div className="mt-14">
              <h1>Điểm đến đang thịnh hành</h1>
              <p>Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này</p>
            </div>
            <Trendingdestinations />
          </div>
          <div className="col-span-12 sm:mt-14">
            <h2 className="text-emerald text-[35px] font-medium mt-10">
            {t('home.hotelOldCardList.ho01')}
            </h2>
            <p>{t('home.hotelOldCardList.ho02')}</p>
            <Divider color="emerald-500" height="2px" />
            <HotelOldCardList />
          </div>
          <div className="col-span-12 sm:mt-14">
            <h2 className="text-emerald text-[35px] font-medium  mt-10">
              {t('home.relatedProducts.re01')}
            </h2>
            <Divider color="emerald-500" height="2px" />
            <RelatedProducts />
          </div>
        </div>
        <Email />
      </section>
    </section>
  );
}

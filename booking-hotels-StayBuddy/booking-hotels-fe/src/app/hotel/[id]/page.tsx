"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Tabs } from 'antd';
import Overview from './overview';
import { useClientTranslation } from '@/i18n/client';
import Room from './room';
import Location from './location';
import Utilities from './utilities';
import Review from './review';
import Divider from '@/components/devider';
import { useAppDispatch, useAppSelector } from '@/redux';
import { getHotel } from '@/api/hotelService';
import Loading from '@/components/loading';

const { TabPane } = Tabs;

const HotelDetails = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const dispatch = useAppDispatch();

  const { hotel, loading, error } = useAppSelector((state) => state.hotels);

  useEffect(() => {
    dispatch(getHotel({ hotelId: id }));

  }, [dispatch, id]);


  const [activeKey, setActiveKey] = useState<string>('1');
  const { t } = useClientTranslation('Common');
  
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: section1Ref, key: '1' },
        { ref: section2Ref, key: '2' },
        { ref: section3Ref, key: '3' },
        { ref: section4Ref, key: '4' },
        { ref: section5Ref, key: '5' },
      ];

      const threshold = 100;

      sections.forEach(({ ref, key }) => {
        const sectionTop = ref.current?.getBoundingClientRect().top;
        
        if (sectionTop !== undefined && sectionTop <= threshold && sectionTop >= -threshold) {
          setActiveKey(key);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    
    switch (key) {
      case '1':
        section1Ref.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '2':
        section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '3':
        section3Ref.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '4':
        section4Ref.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '5':
        section5Ref.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  const scrollToRoom = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  if(hotel === null) return <div className="text-red-500 text-center mt-5">No Data</div>

  if (loading) {
    return <Loading className="mt-5 mx-auto" />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }
  return (
    <section className=''>
      <Tabs activeKey={activeKey} onChange={handleTabChange} className=" text-2xl font-semibold text-black shadow-md fixed w-full top-[115px]" centered>
        <TabPane tab={t('detailPage.de01')} key="1" />
        <TabPane tab={t('detailPage.de02')} key="2" />
        <TabPane tab={t('detailPage.de03')} key="3" />
        <TabPane tab={t('detailPage.de04')} key="4" />
        <TabPane tab={t('detailPage.de05')} key="5" />
      </Tabs>

      <section className='container mx-auto mt-[190px]'>
        <div ref={section1Ref}>
          <Overview hotel={hotel} scrollToRoom={scrollToRoom}/>
        </div>
        <Divider color="emerald-500" height="2px" />

        <div ref={section2Ref} >
          <Room hotel={hotel}/>
        </div>
        <Divider color="emerald-500" height="2px" />

        <div ref={section3Ref}>
         <Location address={hotel?.address}/>
        </div>
        <Divider color="emerald-500" height="2px" />

        <div ref={section4Ref}>
         <Utilities hotel={hotel}/>
        </div>
        <Divider color="emerald-500" height="2px" />

        <div ref={section5Ref}>
          <Review hotel={hotel}/>
        </div>
      </section>
    </section>
  );
};

export default HotelDetails;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react'; 
import { useAppDispatch, useAppSelector } from '@/redux';
import {  HotelCredentials } from '@/interfaces';
import ImageGallery from '@/components/imageGallery';
import { Button, Rate } from 'antd';
import { LocationIcon } from '@/assets/icons';
import CustomButton from '@/components/button/CustomButton';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { createFavorite, removeFavorite } from '@/api/favoriteService';
import { toast } from 'react-toastify';
import { useClientTranslation } from '@/i18n/client';
import { Phone } from 'lucide-react';
import Loading from '@/components/loading';
const Overview: React.FC<HotelCredentials & { scrollToRoom: () => void }> = ({ hotel, scrollToRoom }) => {
  const dispatch = useAppDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const {user, isLogin} = useAppSelector((state) => state.auth);
  const {reviews, loading} = useAppSelector((state) => state.reviews);
 const { t } = useClientTranslation('Common');

  useEffect(() => {
    if(hotel){
      if(isLogin && hotel?.favorites?.length > 0 
        ? hotel.favorites.some((favorite: any) => {
            return favorite?.user?.id === user?.id;
          })
        : false){
        setIsLiked(true);
      }else{
        setIsLiked(false);
      }
    }

  }, [hotel, isLogin, user?.id]);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if(isLiked){
      dispatch(removeFavorite({hotelId: hotel.id})).then((result: any) => {
        if(result.payload.statusCode === 200){
          setIsLiked(false)
          toast.success(result.payload.message);
        }
      });
    }else{
      dispatch(createFavorite({hotelId: hotel.id})).then((result: any) => {
        if(result.payload.statusCode === 201){
          setIsLiked(true)
          toast.success(result.payload.message);
        }
      });
    }
  };
  if(loading){
    return <Loading className='mx-auto mt-10'/>
  }

  const averageRating = reviews && reviews.length > 0 && reviews
  .map((review) => review.rating)  
  .reduce((total, rating) => total + rating, 0) 
  / reviews.length;  

  return (
    <section className="flex flex-col bg-gray-100">
      {hotel ? (
        <div className="container mx-auto px-4 py-6">
          <ImageGallery images={hotel.images} className="mb-8" />
          <div className="bg-white rounded-lg shadow-lg p-6">
           <div className='flex mb-4 items-center'>
           <h1 className="text-2xl font-bold">{hotel.hotelName}</h1>
           <h2 className="text-xl font-semibold ml-2"><Rate disabled value={averageRating || hotel?.avgRating || 0}/></h2>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mt-4">
                  <p className="text-gray-600 flex">
                    {hotel.address} <LocationIcon className="w-4 h-4 ml-1"/>
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 flex">
                  <Phone className="w-4 h-4 mr-1"/> {hotel.contactPhone} 
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-4'>
                <div className='col-start-3'>
                    <Button
                      type="text"
                      onClick={handleLike}
                      icon={isLiked ? <HeartFilled style={{ color: 'red', fontSize: '32px' }} />: <HeartOutlined style={{ fontSize: '32px' }} />}
                      style={{
                        position: 'relative',
                        top: 10,
                        right: -20,
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                </div>
                <div className='col-start-4'>
                  <CustomButton className='w-[140px] h-[50px]'  onClick={scrollToRoom}>
                    {t('hotelDetails.overview.title01')}
                  </CustomButton>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                {showFullDescription ? hotel.description : `${hotel.description && hotel.description.substring(0, 100)}...`} 
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-500 hover:underline mt-2"
              >
                {showFullDescription ? 'Xem ít hơn' : 'Xem thêm'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <div className="text-xl text-gray-600">No hotel information available</div>
        </div>
      )}
    </section>
  );
};

export default Overview;

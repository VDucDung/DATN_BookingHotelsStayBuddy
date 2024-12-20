/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { Card, Rate, Typography, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { HotelCardProps } from '@/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux';
import { createFavorite, removeFavorite } from '@/api/favoriteService';
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const HotelCard: React.FC<HotelCardProps> = ({id, hotelName, address, totalReviews, avgRating, images, className, favorites, onLikeSuccess }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if(isLiked){
      dispatch(removeFavorite({hotelId: id})).then((result: any) => {
        if(result.payload.statusCode === 200){
          setIsLiked(false)
          toast.success(result.payload.message);
          onLikeSuccess?.();
        }
      });
    }else{
      dispatch(createFavorite({hotelId: id})).then((result: any) => {
        if(result.payload.statusCode === 201){
          setIsLiked(true)
          toast.success(result.payload.message);
          onLikeSuccess?.();
        }
      });
    }
  };

  const handleDirection = () => {
    router.push(`/hotel/${id}`); 
  };

  useEffect(() => {
    if(favorites){
      setIsLiked(true);
    }else{
      setIsLiked(false);
    }
  }, [favorites]);

  return (
    <Card
      className={className}
      onClick={handleDirection}
      hoverable
      cover={
        <div style={{ position: 'relative' }}>
          <Image
            alt={hotelName}
            src={images as string}
            width={300}
            height={200}
            className='rounded-lg hover:rounded-lg'
          />
          <Button
            type="text"
            onClick={handleLike}
            icon={isLiked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'white',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </div>
      }
      style={{ width: 300}}
    >
      <Title level={5}>{hotelName}</Title>
      <Text>{address }</Text>
      <div style={{ marginTop: 8 }}>
        <Rate disabled value={avgRating}/>
        <Text> {avgRating > 3 ? ((avgRating  > 4)  ? 'Tuyệt vời': 'Tốt') : 'Tệ' } · {totalReviews || 0} đánh giá</Text>
      </div>
    </Card>
  );
}

export default HotelCard;

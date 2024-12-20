import React from 'react';
import HotelCard from "@/components/hotelCard";
import { Hotel } from '@/interfaces';
import Image from 'next/image';
import images from '@/assets/images';

interface HotelCardListProps {
  hotels: Hotel[];
  onLikeSuccess: () => void;
}

const HotelCards: React.FC<HotelCardListProps> = React.memo(({ hotels, onLikeSuccess }) => {
  HotelCards.displayName = 'HotelCardList'; // Add this line
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.length > 0 ? (
        hotels.map((item) => (
          <HotelCard
            key={item.id}
            avgRating={item.avgRating}
            id={item.id}
            hotelName={item.hotelName}
            address={item.address}
            totalReviews={item.totalReviews ?? 0}
            images={item.images[0]}
            favorites={item.favorites.length > 0}
            onLikeSuccess={onLikeSuccess}
          />
        ))
      ) : (
        <div className="col-span-3 mt-3">
          <Image
            src={images.empty}
            alt="empty"
            width={300}
            height={300}
            className="mx-auto"
          />
          <div className="text-center mt-3">
            Không tìm thấy kết quả nào
          </div>
        </div>
      )}
    </div>
  );
});

export default HotelCards;

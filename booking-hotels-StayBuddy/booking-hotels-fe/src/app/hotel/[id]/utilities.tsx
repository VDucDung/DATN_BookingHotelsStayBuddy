/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getTypeUtilities } from '@/api/utilityService';
import Loading from '@/components/loading';
import { Hotel } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux';
import Modal from 'react-modal';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CloseIcon } from '@/assets/icons';
import IconButton from '@/components/iconButton';

const Utilities: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const dispatch = useAppDispatch();
  const { typeUtilities, loading, error } = useAppSelector((state) => state.typeUtilities);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    if (hotel?.id) {
      dispatch(getTypeUtilities({ hotelId: hotel.id }));
    }
  }, [dispatch, hotel]);

  if (!hotel.images) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const handleImageClick = (photoSrc: string) => {
    const index = hotel.images.findIndex(img => img === photoSrc);
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + hotel.images.length) % hotel.images.length);
  };

  if (loading) {
    return <Loading className="mt-5 mx-auto" />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  return (
    <div className="flex flex-col bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-black">{`All facilities in ${hotel?.hotelName}`}</h1>
      <Image
        src={hotel?.images[0]}
        alt="utilities"
        width={300}
        height={300}
        className="rounded-lg w-[200px] h-[150px] cursor-pointer"
        onClick={() => handleImageClick(hotel?.images[0])}
      />

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="max-w-7xl w-full p-0 bg-transparent "
        overlayClassName="fixed inset-0 bg-black/75 flex items-center justify-center"
      >
        <div className="flex justify-between items-center p-4 bg-transparent z-[99]">
          <button
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-300 w-8 h-8 flex items-center justify-center"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center p-4 relative">
          <IconButton
            className="absolute top-1/2 -translate-y-1/2 left-[-10px] hidden sm:flex z-[99]"
            iconName="arrowSlider"
            variant="contained"
            size="small"
            bgColor="emerald-500"
            textColor="white"
            bgHoverColor="yellow"
            iconSize={1.5}
            onClick={prevImage}
            disabled={hotel?.images.length <= 1}
          />
          <Image
            src={hotel?.images[selectedImageIndex]}
            alt="Selected Gallery Image"
            className="object-contain max-w-full z-[99]"
            width={1000}
            height={900}
            quality={100}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                'https://res.cloudinary.com/dgyusabsy/image/upload/v1728631167/booking-hotels/nr1gltdqndwuajubmzor.jpg/400/300';
            }}
          />
          <IconButton
            className="rotate-180 absolute top-1/2 -translate-y-1/2 right-[-20px] hidden sm:flex z-[99]"
            iconName="arrowSlider"
            variant="contained"
            size="small"
            bgColor="emerald-500"
            textColor="white"
            bgHoverColor="yellow"
            iconSize={1.5}
            disabled={hotel?.images.length <= 1}
            onClick={nextImage}
          />
        </div>
      </Modal>

      <div className="flex">
        {typeUtilities && typeUtilities.length > 0 ? (
          typeUtilities.map((typeUtility: any, index: number) => (
            <div className="mt-14 w-[320px] flex flex-col mr-8" key={index}>
              <h3 className="text-xl font-semibold">{typeUtility.name}</h3>
              {typeUtility.utilities.map((utility: any) => (
                <div className="mt-2" key={utility.id}>
                  <li className="text-gray-600 font-semibold">{utility.name}</li>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center mt-8">
            <div className="text-xl text-gray-600">No hotel information available</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Utilities;

"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';
import Modal from 'react-modal';
import { CloseIcon } from '@/assets/icons';
import IconButton from '../iconButton';

interface GalleryProps {
  images?: string[];
  className?: string;
}

const ImageGallery: React.FC<GalleryProps> = ({ 
  images = [], 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0); 

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-96 bg-gray-100 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const handleImageClick = (event: React.MouseEvent, { photo }: { photo: { src: string } }) => {
    const index = images.findIndex(img => img === photo.src);
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const displayImages = images.map((img) => ({
    src: img,
    width: 4, 
    height: 3, 
  }));

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length); 
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); 
  };

  return (
    <div className={`w-full ${className}`}>
      <Gallery photos={displayImages} onClick={handleImageClick} />

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="max-w-7xl w-full p-0 bg-transparent"
        overlayClassName="fixed inset-0 bg-black/75 flex items-center justify-center"
      >
        <div className="flex justify-between items-center p-4 bg-transparent z-[999]">
          {/* <div className='flex flex-col gap-2'>
            <h2 className="text-white text-xl font-bold">Photos by Hotel</h2>
            <Divider color="emerald-500" height="2px" />
          </div> */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-300 w-8 h-8 flex items-center justify-center"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center p-4 relative">
        <IconButton
            className="absolute top-1/2 -translate-y-1/2 left-[-10px] hidden sm:flex z-[999]"
            iconName="arrowSlider"
            variant="contained"
            size="small"
            bgColor="emerald-500"
            textColor="white"
            bgHoverColor="yellow"
            iconSize={1.5}
            onClick={prevImage}
            disabled={images.length <= 1} 
          />
          <Image
            src={images[selectedImageIndex]} 
            alt="Selected Gallery Image"
            className="object-contain max-w-full"
            width={1000}
            height={900}
            quality={100} 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://res.cloudinary.com/dgyusabsy/image/upload/v1728631167/booking-hotels/nr1gltdqndwuajubmzor.jpg/400/300';
            }}
          />

          <IconButton
            className="rotate-180 absolute top-1/2 -translate-y-1/2 right-[-20px] hidden sm:flex z-[999]"
            iconName="arrowSlider"
            variant="contained"
            size="small"
            bgColor="emerald-500"
            textColor="white"
            bgHoverColor="yellow"
            iconSize={1.5}
            disabled={images.length <= 1} 
            onClick={nextImage}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ImageGallery;

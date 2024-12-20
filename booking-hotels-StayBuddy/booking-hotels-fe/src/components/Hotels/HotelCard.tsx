import React, { useState } from 'react';
import { Building, Star, MapPin, Edit, Trash2, Phone } from 'lucide-react';
import { Hotel } from '@/interfaces';
import Image from 'next/image';

interface HotelCardProps {
  hotel: Hotel;
  onEdit?: () => void;
  onDelete?: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onEdit, onDelete }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      {hotel?.images && (
        <div className="relative w-full h-48">
          <Image 
            src={hotel.images[0]} 
            alt={hotel.hotelName || 'Hotel Image'} 
            layout="fill" 
            objectFit="cover" 
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      <div className="p-3 flex flex-col">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800 flex w-[85%]">
            <Building className="mr-1 text-blue-500 w-[24px]" size={24} />
            {hotel?.hotelName}
          </h2>
          
          {hotel?.avgRating && (
            <div className="flex text-yellow-500">
              <Star className="mr-1" size={20} />
              <span className="font-semibold">{hotel.avgRating}/5</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center text-gray-600 mb-2 w-full h-auto">
          <div className='flex'>
          <MapPin className="mr-2 text-red-500" size={20} />
          <p>{hotel.address}</p>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-2 w-full h-auto">
          <div className='flex items-center'>
          <Phone  className="mr-2 text-blue-500" size={20} /> {hotel.contactPhone} 
          </div>
        </div>
        
        {hotel.description && (
          <div className="mt-2">
            <p 
              className={`text-gray-700 ${isDescriptionExpanded ? 'line-clamp-none' : 'line-clamp-2'}`}
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {hotel.description}
            </p>
            {hotel.description.length > 100 && (
              <button 
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-blue-500 hover:underline mt-1 text-sm"
              >
                {isDescriptionExpanded ? 'Collapse' : 'Read more'}
              </button>
            )}
          </div>
        )}
        
        <div className="flex justify-end items-end space-x-2 mt-auto">
          {onEdit && (
            <button 
              onClick={onEdit} 
              className="flex items-center text-blue-500 hover:bg-blue-50 p-2 rounded-md transition-colors"
            >
              <Edit className="mr-1" size={18} />
              Edit
            </button>
          )}
          
          {onDelete && (
            <button 
              onClick={onDelete} 
              className="flex items-center text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
            >
              <Trash2 className="mr-1" size={18} />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

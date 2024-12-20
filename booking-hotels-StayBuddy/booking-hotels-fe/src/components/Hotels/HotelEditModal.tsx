import React, { useState, useEffect } from 'react';
import { Hotel as HotelIcon, X } from 'lucide-react';
import { Hotel, HotelDto } from '@/interfaces';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface HotelEditModalProps {
  hotel: Hotel;
  onClose: () => void;
  onEdit: (hotelId: number, hotel: HotelDto) => void;
}

const HotelEditModal: React.FC<HotelEditModalProps> = ({ hotel, onClose, onEdit }) => {
  const [hotelName, setHotelName] = useState(hotel.hotelName);
  const [address, setAddress] = useState(hotel.address);
  const [contactPhone, setContactPhone] = useState(hotel.contactPhone);
  const [description, setDescription] = useState(hotel.description);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  useEffect(() => {
    setImagePreviews(hotel.images);
  }, [hotel]);

  const [oldImages, setOldImages] = useState(hotel?.images)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImagePreviews = filesArray.map(file => URL.createObjectURL(file));
      setSelectedFiles((prev) => [...prev, ...filesArray]);
      setImagePreviews(prev => [...prev, ...newImagePreviews]);

    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = imagePreviews.filter((_, i) => i !== index);
    setOldImages(hotel?.images.filter((_, i) => i !== index))
    const updatedHotel: HotelDto = {
      hotelName,
      address,
      contactPhone,
      description,
      images: selectedFiles,
      oldImages: hotel?.images.filter((_, i) => i !== index)
    };
    onEdit(hotel.id, updatedHotel);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews(updatedImages);

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelName || !address || !contactPhone) {
      toast.warning('Please fill in all required fields');
      return;
    }

    const updatedHotel: HotelDto = {
      hotelName,
      address,
      contactPhone,
      description,
      images: selectedFiles,
      oldImages
    };

    onEdit(hotel.id, updatedHotel);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden animate-fade-in">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HotelIcon className="text-blue-500" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Edit Hotel</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-200 p-2"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Hotel Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter hotel name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Hotel description"
                  rows={3}
                />
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <div className="mt-4 flex flex-wrap gap-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative w-20 h-20">
                        <Image
                          src={src}
                          alt={`Preview ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-md border border-gray-200 shadow-sm"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 text-white rounded-full hover:bg-red-600 transition"
                        >
                          <X />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-6 mt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelEditModal;

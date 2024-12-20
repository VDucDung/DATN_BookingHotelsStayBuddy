import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TypeRoomDto } from '@/interfaces/typeRoom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { findHotelByPartnerId } from '@/api/dashboarService';

interface RoomTypeCreateModalProps {
  onClose: () => void;
  onCreate: (roomType: TypeRoomDto) => void;
}

const RoomTypeCreateModal: React.FC<RoomTypeCreateModalProps> = ({ onClose, onCreate }) => {
  const { data: hotels } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => findHotelByPartnerId(),
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hotelId, setHotelId] = useState<number>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !hotelId) {
      toast.error('Please fill in all fields');
      return;
    }

    const newRoomType: TypeRoomDto = {
      name,
      hotelId,
      description,
    };

    onCreate(newRoomType);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add new room type</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name room type</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name of room type"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Room type description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Hotel</label>
            <select
              value={hotelId || ''}
              onChange={(e) => setHotelId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a hotel</option>
              {hotels?.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotelName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add room type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomTypeCreateModal;

import React, { useState } from 'react';
import { X, Hotel } from 'lucide-react';
import { TypeRoomDto } from '@/interfaces/typeRoom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { findHotelByPartnerId } from '@/api/dashboarService';

interface RoomTypeEditModalProps {
  hotelId: number;
  initialRoomType: TypeRoomDto;
  onClose: () => void;
  onUpdate: (roomType: TypeRoomDto) => void;
}

const RoomTypeEditModal: React.FC<RoomTypeEditModalProps> = ({
  onClose,
  onUpdate,
  hotelId,
  initialRoomType
}) => {
  const { data: hotels } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => findHotelByPartnerId(),
  });

  const [name, setName] = useState(initialRoomType?.name);
  const [description, setDescription] = useState(initialRoomType?.description);
  const [selectedHotelId, setSelectedHotelId] = useState(hotelId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !selectedHotelId) {
      toast.error('Please fill in all fields');
      return;
    }

    const updatedRoomType: TypeRoomDto = {
      id: initialRoomType.id,
      name,
      description,
      hotelId: selectedHotelId
    };

    onUpdate(updatedRoomType);
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

        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <Hotel className="mr-2" /> Edit Room Type
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Room Type Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Deluxe Room"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description of the room type"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Hotel</label>
            <select
              value={selectedHotelId}
              onChange={(e) => setSelectedHotelId(Number(e.target.value))}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomTypeEditModal;

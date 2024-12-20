/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { Key, Plus, Edit, Trash2 } from 'lucide-react';
import { Room, RoomDto } from '@/type/room';
import RoomCreateModal from './RoomCreateModal';
import { createRoom, deleteRoom, findRoomByPartnerId, updateRoom } from '@/api/dashboarService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { toast } from 'react-toastify';
import RoomEditModal from './RoomEditModal';
import RoomTypeDeleteModal from '../RoomTypes/RoomTypeDeleteModal';

const RoomList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false);

  const { data: rooms, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => findRoomByPartnerId(),
  });

  const createRoomMutation = useMutation({
    mutationFn: ({ roomData }: { roomData: RoomDto }) => createRoom(roomData),
    onSuccess: (response) => {
      if (response) {
        toast.success('Created room successfully!');
      } else {
        toast.error('Failed to create room.');
      }
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: () => {
      toast.error('Failed to create room.');
    },
  });

  const updateRoomMutation = useMutation({
    mutationFn: ({ roomId, roomData }: { roomId: number, roomData: RoomDto }) => updateRoom(roomId, roomData),
    onSuccess: (response) => {
      if (response) {
        toast.success('Room updated successfully!');
      } else {
        toast.error('Room updated false!');
      }
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: () => {
      toast.error('Failed to update room.');
    },
  });

  const deleteRoomMutation = useMutation({
    mutationFn: ({ roomId }: { roomId: number }) => deleteRoom(roomId),
    onSuccess: (response) => {
      if (response) {
        toast.success('Delete room successfully!');
      } else {
        toast.error('Delete room failed!');
      }
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      setActiveDeleteModal(false);
    },
    onError: () => {
      toast.error('Failed to delete room .');
      setActiveDeleteModal(false);
    },
  });

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">No room information available.</div>;
  }

  const handleCreateRoom = (roomData: RoomDto) => {
    createRoomMutation.mutate({ roomData });
    setIsModalOpen(false);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleUpdateRoom = (roomId: number, updatedRoom: RoomDto) => {
    updateRoomMutation.mutate({ roomId, roomData: updatedRoom });
    setShowEditModal(false);
  };

  const getStatusColor = (status: Room['bookingDate']) => {
    return status
      ? 'bg-red-100 text-red-700 border-red-200'
      : 'bg-green-100 text-green-700 border-green-200';
  };

  const parseJSONSafely = (input: string | any): any => {
    if (typeof input === 'string') {
      try {
        return JSON.parse(input);
      } catch (error) {
        console.error('Invalid JSON string:', error);
        return null;
      }
    }
    return input;
  };

  const handleDeleteRoom = (roomId: number) => {
    setSelectedRoom(rooms?.find((room) => room.id === roomId) || null);

    setActiveDeleteModal(true);
  };

  const confirmDeleteRoom = () => {
    if (selectedRoom) {
      deleteRoomMutation.mutate({ roomId: selectedRoom.id });
      setActiveDeleteModal(false);
    }
  };

  console.log(isModalOpen)
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Key className="text-white" size={28} />
              <h2 className="text-2xl font-bold text-white mb-0">Room Management</h2>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-50 transition-colors"
            >
              <Plus size={20} />
              <span>Add Room</span>
            </button>

          </div>
        </div>

        <div className="p-6 space-y-6">
          {rooms && rooms.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No rooms available. Add a new room to get started.
            </div>
          )}

          {rooms && rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <Image
                    width={400}
                    height={300}
                    src={room?.images[0] || '/placeholder-room.jpg'}
                    alt={room?.roomName}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                <div className="flex-grow p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Room {room.roomName}
                      </h3>
                      <p className="text-gray-600 mb-1">{room?.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(room.bookingDate)}`}
                    >
                      {!room.bookingDate ? 'Available' : 'Booked'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-gray-600">
                    <p>Room type: <span className='font-semibold'>{room?.typeRoomId?.name}</span></p>
                    <p>Hotel: <span className='font-semibold'>{room?.typeRoomId?.hotel?.hotelName}</span></p>
                    <p>Capacity: {room?.capacity}</p>
                    <p>Price: ${room?.price}</p>
                    {room?.bookingDate && (<p>Booking Date: {formatDate(room?.bookingDate)}</p>)}
                  </div>

                  <div className="space-y-1">
                    {
                      Array.isArray(parseJSONSafely(room?.options || '[]')) && parseJSONSafely(room?.options || '[]').map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="mr-2">{item.feature}</span>
                          <span
                            className={`w-2 h-2 rounded-full ${item.availability ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                        </div>
                      ))}

                  </div>

                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => handleEditRoom(room)}
                      className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>

                    {showEditModal && selectedRoom && (
                      <RoomEditModal
                        room={selectedRoom}
                        onClose={() => setShowEditModal(false)}
                        onEdit={handleUpdateRoom}
                      />
                    )}
                    <button
                      className="flex items-center space-x-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>

                    {
                      activeDeleteModal && (
                        <RoomTypeDeleteModal
                          isOpen={activeDeleteModal}
                          onClose={() => setActiveDeleteModal(false)}
                          onConfirm={confirmDeleteRoom}
                        />
                      )
                    }



                  </div>
                </div>
              </div>
            </div>
          ))}

          {isModalOpen && (
            <RoomCreateModal
              onClose={() => setIsModalOpen(false)}
              onCreate={handleCreateRoom}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomList;

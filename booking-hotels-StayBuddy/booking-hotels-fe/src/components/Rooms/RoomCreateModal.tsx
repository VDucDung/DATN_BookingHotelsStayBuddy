/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { RoomDto } from '@/type/room';
import { useQuery } from '@tanstack/react-query';
import { findTypeRoomByPartnerId } from '@/api/dashboarService';
import Image from 'next/image';

interface OptionDto {
  feature: string;
  availability: boolean;
}

interface RoomCreateModalProps {
  onClose: () => void;
  onCreate: (roomData: RoomDto) => void;
}

const RoomCreateModal: React.FC<RoomCreateModalProps> = ({ onClose, onCreate }) => {
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [options, setOptions] = useState<OptionDto[]>([]);
  const [price, setPrice] = useState('');
  const [typeRoomId, setTypeRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));

  const { data: roomTypes } = useQuery({
    queryKey: ["room"],
    queryFn: () => findTypeRoomByPartnerId(),
    select: (response) => {
      return Object.values(response)
        .flatMap((room: any) => room.typeRooms || [])
    }
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addOption = () => {
    setOptions([...options, { feature: '', availability: false }]);
  };

  const updateOption = (index: number, updates: Partial<OptionDto>) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], ...updates };
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      description,
      capacity,
      selectedFiles.length >= 2,
      options.length > 0,
      price,
      typeRoomId
    ];

    if (requiredFields.some(field => !field)) {
      toast.error('Please fill in all required fields and upload at least 2 images');
      return;
    }

    const incompleteOptions = options.some(opt => !opt.feature);
    if (incompleteOptions) {
      toast.error('Please complete all option features');
      return;
    }


    onCreate({
      roomName,
      description,
      capacity: parseInt(capacity),
      images: selectedFiles,
      options,
      price: parseFloat(price),
      typeRoomId
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[700px] p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Room</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room name</label>
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room description"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room capacity"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select
                value={typeRoomId}
                onChange={(e) => setTypeRoomId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select room type</option>
                {roomTypes && roomTypes.length > 0 && roomTypes.map((type: any) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Images</label>
            <div className="flex items-center">
              <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
                <ImageIcon size={20} className="mr-2" />
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-5 gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <Image
                      width={100}
                      height={100}
                      src={src}
                      alt={`Room image ${index + 1}`}
                      className="w-full h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className='font-semibold text-black mt-4'>Please upload at least 2 images</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Room Options</label>
              <button
                type="button"
                onClick={addOption}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
              >
                <Plus size={16} className="mr-1" /> Add Option
              </button>
            </div>

            {options.map((option, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <input
                  type="text"
                  value={option.feature}
                  onChange={(e) => updateOption(index, { feature: e.target.value })}
                  placeholder="Feature (e.g., WiFi, Balcony)"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={option.availability}
                    onChange={(e) => updateOption(index, { availability: e.target.checked })}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Available</span>
                </label>
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomCreateModal;
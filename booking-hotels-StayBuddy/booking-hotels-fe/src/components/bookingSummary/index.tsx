"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Divider } from "antd";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "@/api/roomService";
import { useAppSelector } from "@/redux";
import { formatDateBooking } from "@/utils/formatDate";
import { Room } from "@/type/room";

const BookingSummary: React.FC<{ roomId: string }> = ({ roomId }) => {
  const { hotel } = useAppSelector((state) => state.hotels);
  const currentDate = new Date();
  const check_in = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  const futureDate = new Date(currentDate);
  futureDate.setDate(futureDate.getDate() + 2);
  const check_out = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
  const startDate = typeof window !== 'undefined' ? (sessionStorage.getItem("startDate") ?? check_in): null;
  const endDate = typeof window !== 'undefined' ? (sessionStorage.getItem("endDate") ?? check_out): null;

  const nights = startDate && endDate
    ? Math.max(
      (new Date(endDate).setHours(0, 0, 0, 0) - new Date(startDate).setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24),
      0
    )
    : 0;

  const {
    refetch: refetchRoom,
    data: room,
    isLoading,
    isError,
  } = useQuery<Room>({
    queryKey: ["rooms", roomId],
    queryFn: () => getRoom(roomId),
    enabled: false,
  });

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

  useEffect(() => {
    refetchRoom();
  }, [refetchRoom, roomId]);

  if (isLoading) {
    return <div className="container mx-auto">Loading...</div>;
  }

  if (isError || !room) {
    return <div className="container mx-auto">No room information.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div>
        <h2 className="text-xl font-bold mb-1">{hotel?.hotelName}</h2>
        <p className="text-gray-600 mb-2">{`⭐ ${hotel?.avgRating ?? 5} (${hotel?.totalReviews ?? 0}) Highly rated for its Location`}</p>
      </div>
      <div className="overflow-hidden rounded-md mb-4">
        <Image
          src={room?.images[0] ?? ""}
          alt="Room Preview"
          className="w-full h-[200px] object-cover rounded-md"
          width={600}
          height={400}
        />

      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Check-in</p>
          <p className="font-medium text-[14px]">{formatDateBooking(startDate as string)}</p>
          <p className="text-sm text-gray-500">From 15:00</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">{nights} nights</p>
          <hr />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Check-out</p>
          <p className="font-medium text-[14px]">{formatDateBooking(endDate as string)}</p>
          <p className="text-sm text-gray-500">Before 12:00</p>
        </div>
      </div>
      <div>
        <p className="font-medium mb-1">
          {room?.description}
        </p>
        <p className="text-red-500 font-medium">Selling out fast!</p>
        <div className="text-gray-600 text-sm flex items-center mt-2 space-x-2">
          <p>👤 {room?.capacity} Guest</p>
          {Array.isArray(parseJSONSafely(room?.options || '[]')) && parseJSONSafely(room?.options || '[]').map((option: any, index: number) => {

              return <p key={index}>✅ {option?.feature}</p>
            })
          }
        </div>
      </div>
      <Divider />
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">Total Room Price</p>
        <div className="text-right">
          <p className="line-through text-sm text-gray-400">{new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(room.price * nights || 0)}</p>
          <p className="text-lg font-bold text-red-600">{new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format((Number(room.price) - (Number(room.price) * 10 / 100)) * nights || 0)}</p>
        </div>
      </div>
      <Divider />
      <div>
        <h3 className="text-lg font-medium mb-2">Cancellation and Reschedule Policy</h3>
        <p className="text-gray-600 mb-2">
          ✅ You got the best room price with this option!
        </p>
        <p className="text-gray-600">❌ This reservation is non-refundable.</p>
        <p className="text-gray-600">❌ Non-reschedulable.</p>
      </div>
    </div>
  );
};

export default BookingSummary;

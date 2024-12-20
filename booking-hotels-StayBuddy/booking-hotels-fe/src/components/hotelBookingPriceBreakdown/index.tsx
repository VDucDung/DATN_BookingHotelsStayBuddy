"use client";

import React, { useEffect } from 'react';
import { Card, Typography, Button, message } from 'antd';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getRoom } from '@/api/roomService';
import { createTicket } from '@/api/ticketService';
import { TicketData } from '@/interfaces/ticket';
import { Room } from '@/type/room';

const { Title, Text } = Typography;

const HotelBookingPriceBreakdown: React.FC<{
  roomId: string,
  contactName: string,
  contactEmail: string,
  contactPhone: string,
  guestFullName?: string,
  checkInDate: string,
  checkOutDate: string,
  checkInTime: string,
  checkOutTime: string,
  options: string[],
}> = ({
  roomId,
  contactName,
  contactEmail,
  contactPhone,
  guestFullName,
  checkInDate,
  checkOutDate,
  checkInTime,
  checkOutTime,
  options,
}) => {
    const currentDate = new Date();
    const check_in = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 2);
    const check_out = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
    const startDate = typeof window !== 'undefined' ? (sessionStorage.getItem("startDate") ?? check_in) : null;
    const endDate = typeof window !== 'undefined' ? (sessionStorage.getItem("endDate") ?? check_out) : null;

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

    const createTicketMutation = useMutation({
      mutationFn: (ticketData: TicketData) => {
        if (!ticketData) {
          throw new Error("Invalid ticket data");
        }
        return createTicket(ticketData);
      },
      onSuccess: async (response) => {
        if (response?.id) {
          message.success('Booking successful!');
          window.location.href = `/booking/paymentMethod?id=${response.id}`;
        } else {
          message.error('Booking response is invalid.');
        }
      },
      onError: (error) => {
        message.error('Booking failed. Please try again.');
        console.error('Ticket creation error:', error);
      }
    });

    useEffect(() => {
      refetchRoom();
    }, [refetchRoom, roomId]);

    const validateForm = () => {
      // Validate contact name
      if (!contactName || contactName.trim() === '') {
        message.error('Vui lòng nhập tên liên hệ');
        return false;
      }

      // Validate email with basic regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!contactEmail || !emailRegex.test(contactEmail)) {
        message.error('Vui lòng nhập email hợp lệ');
        return false;
      }

      // Validate phone number (assumes Vietnamese phone number format)
      const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
      if (!contactPhone || !phoneRegex.test(contactPhone)) {
        message.error('Vui lòng nhập số điện thoại hợp lệ');
        return false;
      }

      // Validate guest name if booking for others
      if (guestFullName === '') {
        message.error('Vui lòng nhập tên khách');
        return false;
      }

      return true;
    };

    const handleContinueToPayment = () => {
      // Validate form first
      if (!validateForm()) {
        return;
      }

      if (!room) {
        message.error('Thông tin phòng không khả dụng');
        return;
      }

      const ticketData: TicketData = {
        roomId: Number(roomId),
        contactName,
        contactEmail,
        contactPhone,
        guestFullName,
        checkInDate,
        checkOutDate,
        checkInTime,
        checkOutTime,
        amount: (Number(room.price) - (Number(room.price) * 10 / 100)) * nights,
        option: options,
      };

      createTicketMutation.mutate(ticketData);
    };

    if (isLoading) {
      return <div className="container mx-auto">Loading...</div>;
    }

    if (isError || !room) {
      return <div className="container mx-auto">No room information.</div>;
    }

    return (
      <Card
        title={<Title level={4} className="text-lg">Price details</Title>}
        className="w-full"
      >
        {/* <Text className="text-green-500 block mb-4">
          Taxes and fees are recovery charges which Traveloka pays to the property.
        </Text> */}

        <div className="grid grid-cols-1 gap-2 mt-4">
          <div className='flex justify-between'>
            <Text className="font-medium text-gray-700">Room Price</Text>
            <Text className="font-medium text-lg text-gray-900">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format((Number(room.price) - (Number(room.price) * 10 / 100)) * nights)}
            </Text>
          </div>
          <div className='flex justify-between'>
            <Text className="font-medium text-gray-700">Taxes and fees</Text>
            <Text className="font-medium text-lg text-gray-900">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(0)}
            </Text>
          </div>
        </div>

        <div className="border-b pb-4 mb-6"></div>

        <div className='flex justify-between mt-4'>
          <Title level={4} className="text-gray-900 font-bold">Total price</Title>
          <Text className="font-bold text-2xl text-gray-900">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format((Number(room.price) - (Number(room.price) * 10 / 100)) * nights)}
          </Text>
        </div>

        <div className="mt-4">
          <Text className="text-blue-500 text-center block">{`You won't be charged yet!`}</Text>
          <Button
            type="primary"
            danger
            className="w-full mt-3 font-bold bg-orange-500 hover:bg-orange-600"
            onClick={handleContinueToPayment}
            loading={createTicketMutation.isPending}
          >
            Continue to Payment
          </Button>
        </div>
      </Card>
    );
  };

export default HotelBookingPriceBreakdown;

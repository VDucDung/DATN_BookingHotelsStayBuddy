"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import images from "@/assets/images";
import React, { useEffect } from 'react';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/redux";
import { getTickets } from "@/api/getTicketService";
import Loading from "@/components/loading";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

function HotelBookingCard() {
  const isEmpty = false;
  const ditpatch = useAppDispatch();
  const { tickets, loading } = useAppSelector((state) => state.ticket)
  const router = useRouter()
  useEffect(() => {
    ditpatch(getTickets())
  }, [ditpatch])

  const handlePayment = (bookingId: number) => {
    router.push(`/booking/paymentMethod?id=${bookingId}`);
  };

  if (loading) {
    return <Loading className="mx-auto" />
  }
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
  const PaymentStatusBadge = ({ status, dueDate, paidDate }: { status: string, dueDate: string, paidDate: string }) => {
    if (status === 'paid') {
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span>Đã thanh toán {paidDate}</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
        <AlertCircle className="w-4 h-4 mr-1" />
        <span>Chưa thanh toán - Hạn cuối {dueDate}</span>
      </div>
    );
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-black shadow-md p-4">
        Danh sách đơn đặt phòng của bạn
      </h2>
      {isEmpty ? (
        <div className="mt-3">
          <div className="flex justify-center">
            <Image src={images.empty} alt="empty" width={300} height={300} />
          </div>
          <div className="text-center mt-3">Bạn hiện không có đơn hàng nào</div>
        </div>
      ) : (
        <div className="space-y-4 w-full mx-auto p-4">
          {tickets && tickets.length > 0 && tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="flex">
                <div className="relative w-72 h-48">
                  <Image
                    src={ticket?.room?.images[0]}
                    alt={ticket?.room?.typeRoomId?.hotel?.hotelName}
                    width={300} height={300}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-blue-600">
                          {ticket?.room?.typeRoomId?.hotel?.hotelName}
                        </h2>
                        <div className="flex items-center">
                          {"★★★★".split("").map((star, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                        {ticket?.room?.typeRoomId?.hotel?.address}
                      </p>
                    </div>
                    <div className="flex flex-col items-end w-[210px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-center">{ticket?.room?.typeRoomId?.hotel?.reviews.length > 0 ? 'Tuyệt vời' : ''}</span>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-r rounded-tl text-sm text-center">
                          {ticket?.room?.typeRoomId?.hotel?.reviews.length > 0
                            ? (
                              ticket.room.typeRoomId.hotel.reviews.reduce(
                                (total, review) => total + review.rating,
                                0
                              ) / ticket.room.typeRoomId.hotel.reviews.length
                            ).toFixed(1)
                            : 'Chưa có đánh giá'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{ticket?.room?.typeRoomId?.hotel?.reviews.length} đánh giá</p>
                      {/* <p className="text-sm">
                        Địa điểm{' '}
                        {ticket?.room?.typeRoomId?.hotel?.reviews.length > 0
                          ? (
                            ticket.room.typeRoomId.hotel.reviews.reduce(
                              (total, review) => total + review.rating,
                              0
                            ) / ticket.room.typeRoomId.hotel.reviews.length
                          ).toFixed(1)
                          : 'Chưa có đánh giá'}
                      </p> */}

                    </div>
                  </div>

                  <div className="mt-2">
                    <PaymentStatusBadge
                      status={ticket.status || 'pending'}
                      dueDate={formatDate(ticket?.checkInDate as Date) as string}
                      paidDate={formatDate(ticket?.room?.bookingDate) as string}
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold">{ticket?.room?.roomName}</h3>
                    <div className="flex gap-2 text-sm text-gray-600 mt-1">
                      {  Array.isArray(parseJSONSafely(ticket?.room?.options || '[]')) && parseJSONSafely(ticket?.room?.options || '[]').map((option: any, index: number) => (
                        <span key={index} className="after:content-['•'] after:ml-2 last:after:content-none">
                          {option.feature} - {option.availability ? "available" : "not available"}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{ticket?.room?.description}</p>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="text-sm">{formatDate(ticket.checkInDate as Date)} - {formatDate(ticket.checkOutDate)}</p>
                      <p className="text-sm text-gray-600">{ticket?.room?.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(ticket?.amount || 0)}</p>
                      <p className="text-sm text-gray-600">Đã bao gồm thuế và phí</p>
                      <div className="mt-2 space-x-2">
                        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                          Xem chi tiết
                        </button> */}
                        {ticket.status === 'pending' && (
                          <button
                            onClick={() => handlePayment(ticket.id as number)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                          >
                            Thanh toán ngay
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
      }
    </div>
  );
}

export default HotelBookingCard;

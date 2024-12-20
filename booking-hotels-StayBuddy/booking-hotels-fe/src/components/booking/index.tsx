"use client";

import { deleteBooking, editBooking, findTicketByPartnerId } from '@/api/dashboarService';
import { formatDate } from '@/utils/formatDate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react'; // Icons from lucide-react
import EditBookingModal from './EditBookingModal';
import { Ticket, TicketParam } from '@/interfaces/ticket';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'react-toastify';
import { useClientTranslation } from '@/i18n/client';

const Bookings: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<TicketParam | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const { t } = useClientTranslation('Common');

  const { data: bookingsData, error, isLoading } = useQuery<Ticket[]>({
    queryKey: ['bookings'],
    queryFn: findTicketByPartnerId,
  });

  const queryClient = useQueryClient();

  const deleteBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      toast.error('Failed to delete booking.');
    },
  });

  const editBookingMutation = useMutation({
    mutationFn: ({ bookingId, updatedData }: { bookingId: number; updatedData: TicketParam }) => {
      return editBooking(bookingId, updatedData);
    },
    onSuccess: (data) => {
      if(data){
        toast.success('Updated successfully!');
      }
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.error('Edit failed:', error);
      toast.error('Failed to edit booking.');
    },
  });
  

  const handleEdit = (booking: TicketParam) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleSave = (bookingId: number, updatedData: TicketParam) => {
    const cleanedData = {
      checkInDate: updatedData.checkInDate,
      checkOutDate: updatedData.checkOutDate,
      paymentMethods: updatedData.paymentMethods,
      status: updatedData.status,
      contactName: updatedData.contactName,
      contactEmail: updatedData.contactEmail,
      contactPhone: updatedData.contactPhone,
      option: updatedData.option,
      checkInTime: updatedData.checkInTime,
      checkOutTime: updatedData.checkOutTime,
      amount: updatedData.amount,
      guestFullName: updatedData.guestFullName
    };
  
    if (bookingId) {
      editBookingMutation.mutate({ bookingId, updatedData: cleanedData });
      setModalOpen(false);
    }
  };
  const handleDelete = (bookingId: number) => {
    if (bookingId) {
      setSelectedBookingId(bookingId);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedBookingId) {
      deleteBookingMutation.mutate(selectedBookingId);
      setDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600 bg-gray-50 rounded-lg">
        Loading bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600 bg-gray-50 rounded-lg">
        An error occurred while fetching bookings.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800">Bookings</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                'Booking ID', `${t("dashboard.booking.title02")}`, `${t("dashboard.booking.title16")}`, `${t("dashboard.booking.title15")}`, `${t("dashboard.booking.title03")}`,
                `${t("dashboard.booking.title17")}`, `${t("dashboard.booking.title18")}`, `${t("dashboard.booking.title19")}`, `${t("dashboard.booking.title20")}`, `${t("dashboard.booking.title10")}`, `${t("dashboard.booking.title09")}`, 'Actions'
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookingsData?.length ? bookingsData.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{booking.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {booking?.guestFullName ?? booking?.contactName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {booking?.room?.roomName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {booking?.room?.capacity}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {booking?.option?.join(', ') || 'No options'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(booking?.createdAt as Date)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {`${booking?.checkInTime} - ${formatDate(booking?.checkInDate as Date)}`}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {`${booking?.checkOutTime} - ${formatDate(booking?.checkOutDate as Date)}`}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(booking?.amount || 0)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {booking?.paymentMethods}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(booking as TicketParam)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <EditBookingModal
                      booking={selectedBooking as TicketParam}
                      isOpen={isModalOpen}
                      onClose={() => setModalOpen(false)}
                      onSave={(updatedData) => handleSave(booking.id as number, updatedData)}
                    />
                    <button
                      onClick={() => handleDelete(booking.id as number)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                  />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={12} className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;

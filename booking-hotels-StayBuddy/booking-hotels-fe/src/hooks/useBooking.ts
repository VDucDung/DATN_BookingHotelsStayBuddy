import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '@/api/bookingService';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { BookingFormData, BookingResponse } from '@/interfaces/booking';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<BookingResponse, Error, BookingFormData>({
    mutationFn: createBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      
      message.success('Booking created successfully!');
      
      if (data) {
        router.push(`/booking/paymentMethods?id=${data?.data?.roomId}`)
      }
    },
    onError: (error) => {
      message.error(error.message || 'Failed to create booking');
    },
  });
};

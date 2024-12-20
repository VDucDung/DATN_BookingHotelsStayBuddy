import { BookingFormData, BookingPaymentFormData, BookingResponse } from '@/interfaces/booking';
import { callApi } from './apiUtils';

export const createBooking = async (data: BookingFormData): Promise<BookingResponse> => {
  const response = await callApi('POST', 'tickets', data);
  return response.data;
};

export const createBookingPayment = async (data: BookingPaymentFormData): Promise<BookingResponse> => {
  const response = await callApi('POST', 'tickets', data);
  return response.data;
};

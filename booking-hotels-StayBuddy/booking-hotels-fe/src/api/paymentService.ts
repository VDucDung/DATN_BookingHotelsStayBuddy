import { TransactionType } from "@/interfaces/ticket";
import { callApi } from "./apiUtils";

export const createPaymentIntent = async ({ 
  ticketId, 
  hotelOwnerId,
  amount,
  paymentMethod
}: { 
  ticketId: string; 
  hotelOwnerId: number;
  amount: number,
  paymentMethod: TransactionType
}) => {
  const response = await callApi("POST", "/stripe/create-booking-payment", null, { ticketId, hotelOwnerId, amount, paymentMethod });
  return response.data;
};


export const processBookingPayment = async ({ 
  ticketId, 
  hotelOwnerId,
  paymentMethod
}: { 
  ticketId: string; 
  hotelOwnerId: number;
  paymentMethod: TransactionType
}) => {
  const response = await callApi("POST", "/stripe/process-booking-payment", null, { ticketId, hotelOwnerId, paymentMethod });
  return response.data;
};

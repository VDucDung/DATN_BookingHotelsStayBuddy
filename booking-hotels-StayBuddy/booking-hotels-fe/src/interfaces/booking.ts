import { PaymentMethod } from "@/enum";

export interface BookingFormData {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  guestName?: string;
  options?: string[];
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  amount: number;
  stripePaymentIntentId?: string;
  partnerId?: number;
}

export interface BookingPaymentFormData{
  ticketId: string;
  hotelOwnerId: number;
  hotelStripeAccountId?: string;
  amount: number;
  currency?: string;
  paymentMethod?: PaymentMethod;
}

export interface BookingResponse {
  statusCode: number;
  message: string;
  data: BookingFormData;
}

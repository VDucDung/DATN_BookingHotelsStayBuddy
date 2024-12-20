import { Reviews } from "./review";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Hotel {
  id: number;
  hotelName: string;
  address: string;
  description?: string;
  images: [string] | string[];
  totalReviews?: number;
  avgRating: number;
  favorites?: any;
  partners?: any;
  typeRooms?: any;
  contactPhone: string;
  reviews: Reviews[]
}

export interface HotelDto {
  hotelName: string;
  address: string;
  description?: string;
  images: File[] | string[];
  oldImages?: string[]
  contactPhone: string;
}

export interface HotelState {
  hotels: Hotel[];
  hotel: Hotel | null;
  loading: boolean;
  error: string | null;
  detailResult: any; 
}

export interface HotelCardProps {
  id: number;
  hotelName: string;
  address: string;
  totalReviews: number;
  avgRating: number;
  images: string| null;
  className?: string;
  favorites?: boolean;
  onLikeSuccess: any;
}
export interface HotelCardListProps {
  hotels?: Hotel[];
}

export interface GetHotelsResponse {
  data: {
    hotels: Hotel[],
    detailResult: any
  }
  statusCode: number;
  message: string;
}

export interface HotelCredentials {
  hotel: Hotel;
}
export interface GetHotelResponse {
  data: Hotel,
  statusCode: number;
  message: string;
}

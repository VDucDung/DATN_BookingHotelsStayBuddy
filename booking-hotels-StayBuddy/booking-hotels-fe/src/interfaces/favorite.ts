import { Hotel } from "./hotel";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FavoriteState {
  favorites: Hotel[];
  loading: boolean;
  detailResult: any;
  statusCode: number | null;
  error: string | null;
  message: string
}

export interface GetFavoritesResponse {
  data: {
    hotels: Hotel[],
  }
  statusCode: number;
  message: string;
}

export interface FavoriteCredentials {
  hotelId: number;
}


export interface RemovieFavoritesResponse {
  statusCode: number;
  message: string;
}

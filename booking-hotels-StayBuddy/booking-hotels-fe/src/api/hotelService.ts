import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import { GetHotelsResponse, ApiError, GetHotelResponse } from '@/interfaces';
import Cookies from 'js-cookie';

export const getHotels = createAsyncThunk<
  GetHotelsResponse,
  { sortBy?: string; page?: number; limit?: number, keyword?: string, 
    startDate?: string, endDate?: string, totalRoom?: string, capacity?: string, 
    startPrice?: string, endPrice?: string, rating?: string, address?: string
  },
  {
    rejectValue: ApiError
  }
>('hotels/search', async (params: { sortBy?: string; page?: number; limit?: number, keyword?: string,
   startDate?: string, endDate?: string, totalRoom?: string, capacity?: string, 
   startPrice?: string, endPrice?: string, rating?: string, address?: string
   }, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const queryString = [
      params.sortBy ? `sortBy=${params.sortBy}` : "",
      params.page ? `page=${params.page}` : "",
      params.keyword ? `keyword=${params.keyword}` : "",
      params.limit ? `limit=${params.limit}` : "",
      params.startDate ? `startDate=${params.startDate}` : "",
      params.endDate ? `endDate=${params.endDate}` : "",
      params.totalRoom ? `totalRoom=${params.totalRoom}` : "",
      params.capacity ? `capacity=${params.capacity}` : "",
      params.startPrice ? `startPrice=${params.startPrice}` : "",
      params.endPrice ? `endPrice=${params.endPrice}` : "",
      params.rating ? `rating=${params.rating}` : "",
      params.address ? `address=${params.address}` : ""
    ]
      .filter(Boolean)
      .join("&"); 

    const response = await callApi('GET', `/hotels/search?${queryString}`, null, null, customHeaders);
    if (response.statusCode === 200) {
      return response as GetHotelsResponse;
    } else {
      return rejectWithValue({ message: 'Failed to fetch hotels', status: response.statusCode });
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message || 'Failed to fetch hotels', status: 500 });
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
  }
});



export const getHotel = createAsyncThunk<GetHotelResponse, { hotelId: number }>(
  'hotels/id',
  async ({ hotelId }, { rejectWithValue }) => { 
    try {
      const customHeaders = {
        'accept-language': `${Cookies.get('lang')}`,
      };
      const response = await callApi('GET', `/hotels/${hotelId}`, null, customHeaders);
      if (response.statusCode === 200) {
        return response as GetHotelResponse;
      } else {
        return rejectWithValue({ message: 'Failed to remove hotel', status: response.statusCode });
      }
    } catch (error) {
      if (error) {
        return rejectWithValue({ ...error }); 
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
);

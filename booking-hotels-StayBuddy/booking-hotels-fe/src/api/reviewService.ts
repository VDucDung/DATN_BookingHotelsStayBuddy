import { ApiError } from '@/interfaces';
import { GetReviewsResponse, HasImages } from '@/interfaces/review';
import { callApi } from './apiUtils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sortByType } from '@/type/sortBy';

export const getReviews = createAsyncThunk<
GetReviewsResponse,
{ hotelId: number, sortByCreatedAt?: sortByType; hasImages?: HasImages; startDate?: Date, endDate?: Date, page?: number, limit?: number },
  {
    rejectValue: ApiError
  }
>('reviews/getReviews', async (params: {hotelId: number, sortByCreatedAt?: string; hasImages?: HasImages; startDate?: Date, endDate?: Date,page?: number, limit?: number  }, { rejectWithValue }) => {
  try {
    let date = '';
    if(params.startDate !== undefined && params.endDate !== undefined){
       date = `&startDate=${params.startDate}&endDate=${params.endDate}`
    }
    const queryString = `sortByCreatedAt=${params.sortByCreatedAt}&hasImages=${params.hasImages}${date}&page=${params.page}&limit=${params.limit}`;

    const response = await callApi('GET', `/reviews/hotel/${params.hotelId}?${queryString}`);
    if (response.statusCode === 200) {
      return response as GetReviewsResponse;
    } else {
      return rejectWithValue({ message: 'Failed to fetch reviews', status: response.statusCode });
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message || 'Failed to fetch reviews', status: 500 });
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
  }
});

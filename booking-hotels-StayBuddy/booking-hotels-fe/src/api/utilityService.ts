import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import { ApiError } from '@/interfaces';
import { GetTypeUtiliesResponse } from '@/interfaces/typeUtility';

export const getTypeUtilities = createAsyncThunk<
GetTypeUtiliesResponse,
{ hotelId: number },
  {
    rejectValue: ApiError
  }
>('typeUtilities/getTypeUtilities', async ({ hotelId}, { rejectWithValue }) => {
  try {
    const response = await callApi('GET', `/type-utilities/hotel/${hotelId}`);
    if (response.statusCode === 200) {
      return response as GetTypeUtiliesResponse;
    } else {
      return rejectWithValue({ message: 'Failed to fetch type utilities', status: response.statusCode });
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message || 'Failed to fetch type utilities', status: 500 });
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
  }
});

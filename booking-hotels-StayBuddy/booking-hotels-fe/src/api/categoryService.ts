import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import { ApiError } from '@/interfaces';
import { GetCategoriesResponse } from '@/interfaces/category';

export const getCategories = createAsyncThunk<
  GetCategoriesResponse,
  void,
  {
    rejectValue: ApiError
  }
>('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('GET', '/categories');
    if (response.statusCode === 200) {
      return response as GetCategoriesResponse;
    } else {
      return rejectWithValue({ message: 'Failed to fetch categories', status: response.statusCode });
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message || 'Failed to fetch categories', status: 500 });
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import { hostname } from '@/utils/http';

export const statistical = createAsyncThunk('statistical', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('GET', `${hostname}health-check`, null, {});
    return response;
  } catch (error) {
    if(error) {
      return rejectWithValue({ ...error });
    }
  }
});

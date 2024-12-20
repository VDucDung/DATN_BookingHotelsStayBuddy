import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import { ApiError } from '@/interfaces';
import { GetTicketsResponse } from '@/interfaces/ticket';

export const getTickets = createAsyncThunk<
  GetTicketsResponse,
  void,
  { rejectValue: ApiError }
>('tickets/getTickets', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('GET', '/tickets');

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return response as GetTicketsResponse;
    } else {
      return rejectWithValue({
        message: `Failed to fetch tickets. Status: ${response.statusCode}`,
        status: response.statusCode,
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message || 'An unknown error occurred',
        status: 500,
      });
    }
    return rejectWithValue({
      message: 'An unexpected error occurred',
      status: 500,
    });
  }
});

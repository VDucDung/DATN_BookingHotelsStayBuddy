import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import { ApiError } from '@/interfaces';
import { GettypeRoomResponse, GettypeRoomsResponse } from '@/interfaces/typeRoom';

export const getTypeRoomByHotelId = createAsyncThunk<
GettypeRoomsResponse,
{ hotelId: number },
  {
    rejectValue: ApiError
  }
>('typeRooms/getTypeRoomByHotelId', async ({ hotelId }, { rejectWithValue }) => {
  try {
    const response = await callApi('GET', `/type-room/hotel/${hotelId}`);
    if (response.statusCode === 200) {
      return response as GettypeRoomsResponse;
    } else {
      return rejectWithValue({ message: 'Failed to fetch type rooms', status: response.statusCode });
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message || 'Failed to fetch type rooms', status: 500 });
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
  }
});


export const getTypeRoom = createAsyncThunk<
GettypeRoomResponse,
{ typeRoomId: number },
  {
    rejectValue: ApiError
  }
>('typeRooms/getTypeRoom', async ({ typeRoomId }, { rejectWithValue }) => {
  try {
    const response = await callApi('GET', `/type-room/${typeRoomId}`);
    if (response.statusCode === 200) {
      return response as GettypeRoomResponse;
    } else {
      return rejectWithValue({ message: 'Failed to fetch type room', status: response.statusCode });
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message || 'Failed to fetch type room', status: 500 });
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
  }
});


export const searchTypeRoom = createAsyncThunk<
GettypeRoomResponse,
{ hotelId: number, startDate: string, endDate: string, capacity: number, numberOfRooms: number },
  {
    rejectValue: ApiError
  }
>('typeRooms/searchTypeRoom', async ({ hotelId, startDate, endDate, capacity, numberOfRooms }, { rejectWithValue }) => {
  try {

    const queryString = [
      hotelId ? `hotelId=${hotelId}` : "",
      startDate ? `startDate=${startDate}` : "",
      endDate ? `endDate=${endDate}` : "",
      capacity ? `capacity=${capacity}` : "",
      numberOfRooms ? `numberOfRooms=${numberOfRooms}` : "",
    ]
    .filter(Boolean)
    .join("&"); 

    const response = await callApi('GET', `/type-room/search?${queryString}`);
    return response as GettypeRoomResponse;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message || 'Failed to fetch type room', status: 500 });
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
  }
});

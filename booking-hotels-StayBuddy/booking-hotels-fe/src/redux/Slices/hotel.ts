/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHotel, getHotels } from '@/api/hotelService';
import { HotelState, Hotel, DetailResult } from '@/interfaces';

const initialState: HotelState = {
  hotels: [],
  hotel: null,
  detailResult: null,
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    clearHotels: (state) => {
      state.hotels = [];
      state.detailResult = null;
    },
    setLoadingHotel: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateHotel: (state, action: PayloadAction<Hotel>) => {
      const index = state.hotels.findIndex(hotel => hotel.id === action.payload.id);
      if (index !== -1) {
        state.hotels[index] = action.payload;
      }
    },
    setDetailResult: (state, action: PayloadAction<DetailResult>) => {
      state.detailResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    //get hotels
      .addCase(getHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.data.hotels;
        state.detailResult = action.payload.data.detailResult;
        state.error = null;
      })
      .addCase(getHotels.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
        state.hotels = [];
        state.detailResult = null;
      })
    //get hotel
      .addCase(getHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotel = action.payload.data;
        state.error = null;
      })
      .addCase(getHotel.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
        state.hotel = null;
      });
  },
});

export const { clearHotels, setLoadingHotel, updateHotel, setDetailResult } = hotelSlice.actions;
export default hotelSlice.reducer;

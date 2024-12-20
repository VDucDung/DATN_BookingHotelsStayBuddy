/* eslint-disable @typescript-eslint/no-explicit-any */
import { getReviews } from '@/api/reviewService';
import { ReviewsState } from '@/interfaces/review';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ReviewsState = {
  reviews: [],
  statistics: {
    averageRating: 0,
    ratingDistribution: {},
    totalReviews: 0
  },
  loading: false,
  error: null,
  statusCode: null,
  message: '',
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.reviews = action.payload.data.reviews;
        state.statistics = action.payload.data.statistics;
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(getReviews.rejected, (state: any, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
        state.Favories = [];
      });
  },
});

export default reviewsSlice.reducer;

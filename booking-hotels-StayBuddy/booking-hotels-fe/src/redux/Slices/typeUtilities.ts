/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTypeUtilities } from '@/api/utilityService';
import { TypeUtilitiesState } from '@/interfaces/typeUtility';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TypeUtilitiesState = {
  typeUtilities: [],
  loading: false,
  error: null,
  statusCode: null,
  message: '',
};

const typeUtilitiesSlice = createSlice({
  name: 'typeUtilities',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTypeUtilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTypeUtilities.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.typeUtilities = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(getTypeUtilities.rejected, (state: any, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
        state.Favories = [];
      });
  },
});

export default typeUtilitiesSlice.reducer;

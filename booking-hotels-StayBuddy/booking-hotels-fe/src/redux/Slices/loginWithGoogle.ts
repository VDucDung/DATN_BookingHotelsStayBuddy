/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginWithGoogle } from '@/api/loginWithGoogleService';
import { LoginWithGoogleState } from '@/interfaces';


const initialState: LoginWithGoogleState = {
  loading: false,
  user: null,
  error: null,
  isLogin: false,
};

const loginWithGoogleSlice = createSlice({
  name: 'loginWithGoogle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        state.isLogin = false;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isLogin = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action: any) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message ?? 'Something went wrong';
        state.isLogin = false;
      });
  },
});

export default loginWithGoogleSlice.reducer;

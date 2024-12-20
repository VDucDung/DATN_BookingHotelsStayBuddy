/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

import { clearError, forgotPassword, loginGoogle, loginUser, registerUser, resetPassword, verifyOtpForgotPassword } from '@/api/authService';
import { AuthState } from '@/interfaces';

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  isLogin: false,
  secretKey: '',
  message: '',
  isUpdate: false,
  secretStatus: null,
  statusCode: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: any) {
      state.user = action.payload;
    },
    reFreshStatus: (state) => {
      state.statusCode = null;
      state.secretStatus = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
      state.error = null;
      state.message = '';
    },
  },

  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        state.isLogin = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.statusCode === 200 ? action.payload.data.user : null;
        state.error = null;
        state.isLogin = action.payload.statusCode === 200 ? true : false;;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.message;
        state.isLogin = false;
      })

      // login with google
      .addCase(loginGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.isLogin = false;
    })
    .addCase(loginGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.statusCode === 200 ? action.payload.data.user : null;
      state.error = null;
      state.isLogin =  action.payload.statusCode === 200 ? true : false;
    })
    .addCase(loginGoogle.rejected, (state, action: any) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload.message;
      state.isLogin = false;
    })

    // register
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
      state.isLogin = false;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.error = null;
      state.isLogin = false;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message ? action.error.message : null;
      state.isLogin = false;
    })
    .addCase(clearError.fulfilled, (state) => {
      state.error = null;
    })

    //verify Otp ForgotPassword
    .addCase(verifyOtpForgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(verifyOtpForgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.secretKey = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    })
    .addCase(verifyOtpForgotPassword.rejected, (state, action: any) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    })

    // forgot password
    .addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.secretKey = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    })
    .addCase(forgotPassword.rejected, (state, action: any) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    })
    //reset password
    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.secretKey = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    })
    .addCase(resetPassword.rejected, (state, action:any) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    });
  },
});
export const { reFreshStatus, logout, setUser } = authSlice.actions;

export default authSlice.reducer;

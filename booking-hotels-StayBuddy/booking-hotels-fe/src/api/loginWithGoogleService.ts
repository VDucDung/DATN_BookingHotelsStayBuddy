import { GoogleLoginResponse, UserInfoResponse } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const loginWithGoogle = createAsyncThunk<UserInfoResponse, GoogleLoginResponse>(
  'loginWithGoogle',
  async (response: GoogleLoginResponse) => {
    try {
      const res: UserInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      });
      return { status: res.status, accessToken: response.access_token, data: res.data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw err.response !== null ? new Error(err) : new Error('Đã xảy ra lỗi không mong đợi');
    }
  }
);

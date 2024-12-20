/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUsers, getUser, updateUser, changePassword } from '@/api/userService';
import { GetUsersResponse, GetUserResponse, UserState } from '@/interfaces';
import { addOrUpdateFieldInLocalStorage } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  users: [],
  isUpdate: false,
  loading: false,
  error: null,
  status: null,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser(state, action: any) {
      state.users[0] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    //get users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.users = [];
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<GetUsersResponse>) => {
        state.loading = false;
        state.users = action.payload.data.users;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load users';
        state.users = [];
      })
      //get me
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUpdate = false;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<GetUserResponse>) => {
        state.loading = false;
        state.users[0] = action.payload.data as any;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load user details';
      })
      //update me
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUpdate = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload as any;
        addOrUpdateFieldInLocalStorage('user', null, action.payload.data);
        state.isUpdate = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
        state.isUpdate = false;
      })

      // change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.status = action.payload.statusCode;
      })
      .addCase(changePassword.rejected, (state, action: any) => {
        state.loading = false;
        state.status = action.payload.statusCode;
        state.message = action.payload.message;
      })
  },
});

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;

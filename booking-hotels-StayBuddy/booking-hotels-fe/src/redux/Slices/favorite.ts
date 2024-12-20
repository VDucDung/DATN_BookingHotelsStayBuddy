/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFavorites, removeFavorite } from '@/api/favoriteService';
import { FavoriteState } from '@/interfaces/favorite';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FavoriteState = {
  favorites: [],
  detailResult: null,
  loading: false,
  error: null,
  statusCode: null,
  message: '',
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    clearFavores: (state) => {
      state.favorites = [];
    },
    setLoadingFavorite: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorites.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.favorites = action.payload.data.favorite;
        state.detailResult = action.payload.data.detailResult;
        state.statusCode = action.payload.statusCode;
        state.error = null;
      })
      .addCase(getFavorites.rejected, (state: any, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
        state.Favories = [];
      })

      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(removeFavorite.rejected, (state: any, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
        state.Favories = [];
      });
  },
});

export const { clearFavores, setLoadingFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

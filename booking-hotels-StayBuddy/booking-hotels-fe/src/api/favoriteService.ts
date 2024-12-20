import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';
import { FavoriteCredentials, GetFavoritesResponse, RemovieFavoritesResponse } from '@/interfaces/favorite';
import { ApiError } from '@/interfaces';

export const getFavorites = createAsyncThunk<
  GetFavoritesResponse,
  { sortBy?: string; page?: number; limit?: number, keyword?: string },
  {
    rejectValue: ApiError
  }
>('favorites/search', async (params: { sortBy?: string; page?: number; limit?: number, keyword?: string }, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };

    const queryString = `sortBy=${params.sortBy}&page=${params.page}&limit=${params.limit}&keyword=${params.keyword}`;

    const response = await callApi('GET', `/favorites/search?${queryString}`, null, null, customHeaders);
    if (response.statusCode === 200) {
      return response as GetFavoritesResponse;
    } else {
      return rejectWithValue({ message: 'Failed to fetch Favorites', status: response.statusCode });
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message || 'Failed to fetch Favorites', status: 500 });
    }
    return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
  }
});

export const createFavorite = createAsyncThunk<GetFavoritesResponse, FavoriteCredentials>(
  'favorites',
  async (favoriteCredentials, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'accept-language': `${Cookies.get('lang')}`,
      };
      const response = await callApi('POST', `/favorites`, null, favoriteCredentials, customHeaders);
      if (response.statusCode === 201) {
        return response as GetFavoritesResponse;
      } else {
        return rejectWithValue({ message: 'Failed to fetch Favorites', status: response.statusCode });
      }
    } catch (error) {
      if (error) {
        return rejectWithValue({ ...error }); 
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
);

export const removeFavorite = createAsyncThunk<RemovieFavoritesResponse, { hotelId: number }>(
  'favorites',
  async ({ hotelId }, { rejectWithValue }) => { 
    try {
      const customHeaders = {
        'accept-language': `${Cookies.get('lang')}`,
      };
      const response = await callApi('DELETE', `/favorites/${hotelId}`, null, customHeaders);
      
      if (response.statusCode === 200) {
        return response as RemovieFavoritesResponse;
      } else {
        return rejectWithValue({ message: 'Failed to remove favorite', status: response.statusCode });
      }
    } catch (error) {
      if (error) {
        return rejectWithValue({ ...error }); 
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
);

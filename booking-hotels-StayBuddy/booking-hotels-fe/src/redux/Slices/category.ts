/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from '@/api/categoryService';
import { Category, CategoryState } from '@/interfaces/category';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  statusCode: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categories = [];
    },
    setLoadingCategory: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string | number>) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state: any, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
        state.categories = [];
      });
  },
});

export const { clearCategories, setLoadingCategory, updateCategory, addCategory, removeCategory } = categorySlice.actions;
export default categorySlice.reducer;

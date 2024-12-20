"use client";

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';  
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './Slices';  
import { RootState } from './Slices';  

const persistConfig = {
  key: 'root',
  storage: sessionStorage, 
  whitelist: ['auth', 'user'],  
  blacklist: ['toast'],  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  
    })  
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

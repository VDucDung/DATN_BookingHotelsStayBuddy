import { Action, Reducer, combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import hotelReducer from './hotel';
import userReducer from './user';
import categoryReducer from './category';
import favoriteReducer from './favorite';
import typeRoomReducer from './typeRoom';
import typeUtilitiesReducer from './typeUtilities'
import reviewReducer from './review';
import ticketReducer from './ticket';

export * from './auth';
export * from './hotel';
export * from './user';
export * from './category';
export * from './favorite';
export * from './typeRoom';
export * from './typeUtilities'
export * from './review'
export * from './ticket'

const productReducer = combineReducers({
  auth: authReducer,
  hotels: hotelReducer,
  favorites: favoriteReducer,
  users: userReducer,
  categories: categoryReducer,
  typeRooms: typeRoomReducer,
  typeUtilities: typeUtilitiesReducer,
  reviews: reviewReducer,
  ticket: ticketReducer,
});

export type RootState = ReturnType<typeof productReducer>;

const rootReducer: Reducer = (state: RootState | undefined, action: Action) => {
  if (action.type === 'RESET') {
    sessionStorage.clear();
    return productReducer(undefined, action);
  }
  return productReducer(state, action);
};

export default rootReducer;

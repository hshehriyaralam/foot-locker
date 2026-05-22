import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import cartReducer  from './cartSlice'

import { productApi } from './services/productApi';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    cart : cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },



   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
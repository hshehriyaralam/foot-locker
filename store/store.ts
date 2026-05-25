
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import cartReducer from './cartSlice';

import { productApi } from './services/productApi';
import userReducer from "./userSlice";

import {
  persistStore,
  persistReducer,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], 
};

const persistedCartReducer = persistReducer(
  persistConfig,
  cartReducer
);

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    cart: persistedCartReducer,
    [productApi.reducerPath]: productApi.reducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
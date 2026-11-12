import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import modalReducer from './modalSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import { productApi } from './services/productApi';
import { orderApi } from "./services/orderApi";

// ✅ 1. Sab reducers combine karo
const rootReducer = combineReducers({
  modal: modalReducer,
  cart: cartReducer,
  user: userReducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

// ✅ 2. whitelist me "cart" — ab yeh match karega
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

// ✅ 3. Pura root persist karo
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApi.middleware).concat(orderApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
import { CryptoApi } from '../Services/CryptoApi';
import { CryptoNewsApi } from '../Services/CryptoNewsApi'

export const store = configureStore({
  reducer: {
    [CryptoApi.reducerPath]: CryptoApi.reducer,
    [CryptoNewsApi.reducerPath]: CryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CryptoApi.middleware, CryptoNewsApi.middleware),
});

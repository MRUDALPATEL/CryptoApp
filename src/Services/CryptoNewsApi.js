import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_CRYPTO_NEWS_BASE_URL;

const CryptoNewsHeaders = {
  'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY_NEWS,
  'x-rapidapi-host': import.meta.env.VITE_CRYPTO_NEWS_HOST,
};

const createRequest = (url) => ({ url, headers: CryptoNewsHeaders });

export const CryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest('/v1/coindesk'), // correct endpoint
    }),
  }),
});

export const { useGetCryptoNewsQuery } = CryptoNewsApi;

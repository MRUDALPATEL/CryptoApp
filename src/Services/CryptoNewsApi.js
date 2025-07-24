import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CryptoNewsHeaders = {
  'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
  'x-rapidapi-host': import.meta.env.VITE_NEWS_HOST,
};

const baseUrl = import.meta.env.VITE_NEWS_BASE_URL;

const createRequest = (url) => ({ url, headers: CryptoNewsHeaders });

export const CryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest('/v1/cryptodaily'),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = CryptoNewsApi;

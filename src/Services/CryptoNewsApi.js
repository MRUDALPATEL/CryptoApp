import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CryptoNewsHeaders = {
  'x-rapidapi-key': 'c07ad32161msh0133bf73ec4c126p187ca4jsn3b47ea8f614e',
  'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com',
};

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: CryptoNewsHeaders });

export const CryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest('/v1/cryptodaily'), // ✅ working endpoint
    }),
  }),
});

export const { useGetCryptoNewsQuery } = CryptoNewsApi;

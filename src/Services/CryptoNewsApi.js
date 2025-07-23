import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CryptoNewsHeaders={
   'x-rapidapi-key': 'c07ad32161msh0133bf73ec4c126p187ca4jsn3b47ea8f614e',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'X-BingApis-SDK': 'true'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';


const createRequest = (url) =>({url , headers: CryptoNewsHeaders})

export const CryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery(baseUrl),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = CryptoNewsApi;
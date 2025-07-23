import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CryptoApiHeaders={
   'x-rapidapi-key': 'c07ad32161msh0133bf73ec4c126p187ca4jsn3b47ea8f614e',
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
  
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) =>({url , headers: CryptoApiHeaders})

export const CryptoApi = createApi({
  reducerPath:'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) =>({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),

    // Note: To access this endpoint you need premium plan
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),

  })
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = CryptoApi

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/stats',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl'
//   },
//   headers: {
//     'x-rapidapi-key': 'c07ad32161msh0133bf73ec4c126p187ca4jsn3b47ea8f614e',
//     'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
//   }
// };
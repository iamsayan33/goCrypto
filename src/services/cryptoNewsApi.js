import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = new Headers();
cryptoNewsHeaders.append('apikey', 'BDSNLNdLAxmKMDoOnCZn1uzPQn3jK0q5');
// const cryptoNewsHeaders = {
//   'x-bingapis-sdk': 'true',
//   'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
//   'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
// };

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.apilayer.com/world_news' }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/search-news?text=${newsCategory}&number=${count}&sort-direction=desc&sort=publish-time&language=en`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

// baseUrl: 'https://bing-news-search1.p.rapidapi.com'
// export const cryptoNewsApi = createApi({
//   reducerPath: 'cryptoNewsApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://bing-news-search1.p.rapidapi.com' }),
//   endpoints: (builder) => ({
//     getCryptoNews: builder.query({
//       query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
//     }),
//   }),
// });

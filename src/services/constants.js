import axios from 'axios';

export const UNSPLASH_API_URL = 'https://api.unsplash.com';
export const UNSPLASH_WEB_URL = 'https://unsplash.com';
export const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';

export const appClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'X-Custom-Header': 'foobar' },
});

export const unsplashApiClient = axios.create({
  baseURL: UNSPLASH_API_URL,
  headers: {
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID}`,
  },
});

export const unsplashWebClient = axios.create({
  baseURL: UNSPLASH_WEB_URL,
});

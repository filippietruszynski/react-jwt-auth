import axios from 'axios';

import { getTokenFromSessionStorage } from '@/utils/tokens';

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getTokenFromSessionStorage('access_token');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

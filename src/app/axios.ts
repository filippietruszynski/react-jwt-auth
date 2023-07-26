import axios from 'axios';

import { AppStore } from '@/app/store';
import { refreshToken } from '@/features/auth/auth.slice';
import { HttpStatus } from '@/utils/http-status.enum';
import { getTokenFromSessionStorage } from '@/utils/tokens';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
});

/* This function eliminates potential circular dependency between the Axios instance and the Redux store. */
export function setupAxiosInterceptors(store: AppStore): void {
  axiosInstance.interceptors.request.use(
    (config) => {
      const access_token = getTokenFromSessionStorage('access_token');

      if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === HttpStatus.UNAUTHORIZED && !originalRequest._retry) {
        await store.dispatch(refreshToken());

        originalRequest._retry = true;
        return axiosInstance(originalRequest);
      }

      return Promise.reject(error);
    },
  );
}

export default axiosInstance;

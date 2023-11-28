import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

import Auth from '@/models/auth.model';
import useAuthStore from '@/store/auth.store';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const token = useAuthStore.getState().auth?.token;
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders,
    };
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = useAuthStore.getState().auth?.refreshToken;

    if (error.response.status !== 401 || !refreshToken || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    let token = '';

    try {
      const { data } = await axios.post<Auth>('/api/auth/refresh-token', {
        refreshToken,
      });
      token = data.token;
      useAuthStore.getState().refreshToken(token);
    } catch (err) {
      useAuthStore.getState().logout();
      return Promise.reject(err);
    }

    originalRequest.headers.Authorization = `Bearer ${token}`;
    return instance(originalRequest);
  }
);

export default instance;

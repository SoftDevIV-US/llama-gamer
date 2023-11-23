import axios from 'axios';

import useAuthStore from '@/store/auth.store';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${useAuthStore.getState().auth?.token}`,
  },
});

export default instance;

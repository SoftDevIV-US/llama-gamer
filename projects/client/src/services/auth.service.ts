import axios from 'axios';

import Auth from '@/models/auth.model';

const sendLoginRequest = async (email: string, password: string): Promise<Auth> => {
  const response = await axios.post('/api/auth/login', { email, password });
  return response.data;
};

export default sendLoginRequest;

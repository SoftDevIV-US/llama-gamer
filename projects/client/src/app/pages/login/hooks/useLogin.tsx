import React from 'react';
import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import Auth from '@/models/auth.model';
import sendLoginRequest from '@/services/auth.service';
import useAuthStore from '@/store/auth.store';

type Props = {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLogin = ({ setIsError }: Props) => {
  const { login } = useAuthStore();
  const { navigate } = useNavigate();

  const loginUser = (email: string, password: string) => {
    const response = toast.promise(sendLoginRequest(email, password), {
      loading: 'Loading...',
      success: (auth: Auth) => {
        setIsError(false);
        login(auth);
        if (auth.user.role === 'ADMIN') navigate('/admin');
        else navigate('/');
        return 'Login successful';
      },
      error: (err) => {
        setIsError(true);
        const { message } = err.response.data;
        let error = '';
        if (message instanceof Array) {
          [error] = message;
        } else {
          error = message;
        }
        return error;
      },
    });

    return response;
  };

  return { loginUser };
};

export default useLogin;

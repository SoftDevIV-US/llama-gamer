import User from './user.model';

type Auth = {
  token: string;
  refreshToken: string;
  user: User;
};

export default Auth;

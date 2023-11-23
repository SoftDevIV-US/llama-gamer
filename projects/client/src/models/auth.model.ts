import User from './user.model';

type Auth = {
  token: string;
  user: User;
};

export default Auth;

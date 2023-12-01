import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import User from '@/models/user.model';
import { getAllUsers } from '@/services/user.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLoadUsers = ({ setIsLoading, setIsFound }: Props) => {
  const [users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getAllUsers(), {
      loading: 'Loading categories...',
      success: (res) => {
        setUsers(res);
        setIsFound(true);
        return 'Users loaded successfully';
      },
      error: () => {
        setIsFound(false);
        return 'Users not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound]);

  return { users };
};

export default useLoadUsers;

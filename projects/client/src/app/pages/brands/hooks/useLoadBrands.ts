import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Brand } from '@/models/brand.model';
import { getAllBrands } from '@/services/brand.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLoadBrands = ({ setIsLoading, setIsFound }: Props) => {
  const [brands, setBrands] = useState<Brand[]>([] as Brand[]);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getAllBrands(), {
      loading: 'Loading brands...',
      success: (res) => {
        setBrands(res);
        setIsFound(true);
        return 'Brands loaded successfully';
      },
      error: () => {
        setIsFound(false);
        return 'Error Brands not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound]);

  return { brands };
};

export default useLoadBrands;

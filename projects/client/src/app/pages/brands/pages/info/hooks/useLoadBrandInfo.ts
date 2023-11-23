import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Brand } from '@/models/brand.model';
import { getBrandById } from '@/services/brand.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const useLoadBrandInfo = ({ setIsLoading, setIsFound, id }: Props) => {
  const [brand, setBrand] = useState<Brand>({} as Brand);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getBrandById(id), {
      loading: 'Loading brand...',
      success: (res) => {
        setBrand(res);
        setIsFound(true);
        return `Brand ${res.name} loaded successfully`;
      },
      error: () => {
        setIsFound(false);
        return 'Error brand not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound, id]);

  return { brand };
};

export default useLoadBrandInfo;

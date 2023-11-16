import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Supplier } from '@/models/supplier.model';
import { getAllSuppliers } from '@/services/supplier.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLoadSuppliers = ({ setIsLoading, setIsFound }: Props) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([] as Supplier[]);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getAllSuppliers(), {
      loading: 'Loading suppliers...',
      success: (res) => {
        setSuppliers(res);
        setIsFound(true);
        return 'Suppliers loaded successfully';
      },
      error: () => {
        setIsFound(false);
        return 'Error Suppliers not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound]);

  return { suppliers };
};

export default useLoadSuppliers;

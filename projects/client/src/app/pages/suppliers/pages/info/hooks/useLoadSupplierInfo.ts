import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Supplier } from '@/models/supplier.model';
import { getSupplierById } from '@/services/supplier.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const useLoadSupplierInfo = ({ setIsLoading, setIsFound, id }: Props) => {
  const [supplier, setSupplier] = useState<Supplier>({} as Supplier);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getSupplierById(id), {
      loading: 'Loading supplier...',
      success: (res) => {
        setSupplier(res);
        setIsFound(true);
        return `Supplier ${res.email} loaded successfully`;
      },
      error: () => {
        setIsFound(false);
        return 'Error Supplier not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound, id]);

  return { supplier };
};

export default useLoadSupplierInfo;

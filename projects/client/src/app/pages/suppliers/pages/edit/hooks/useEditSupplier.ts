import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { Supplier, UpdateSupplierDto } from '@/models/supplier.model';
import { getSupplierById, updateSupplierById } from '@/services/supplier.service';

type Props = {
  id: string;
  setIsEmailCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeliveryTimeCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useEditSupplier = ({ id, setIsEmailCorrect, setIsDeliveryTimeCorrect, setIsLoading, setFound }: Props) => {
  const [supplier, setSupplier] = useState<Supplier>({} as Supplier);
  const { navigate } = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getSupplierById(id), {
      loading: 'Loading supplier...',
      success: (res) => {
        setSupplier(res);
        return `Supplier ${res.email} loaded successfully`;
      },
      error: () => {
        setFound(false);
        return 'Error Supplier not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [id, setIsLoading, setFound]);

  const editSupplier = (supplierToUpdate: UpdateSupplierDto) => {
    const response = toast.promise(updateSupplierById(id, supplierToUpdate), {
      loading: 'Updating supplier...',
      success: (res) => {
        setIsEmailCorrect(true);
        setIsDeliveryTimeCorrect(true);
        return `Supplier ${res.email} updated successfully`;
      },
      error: (err) => {
        const { message } = err.response.data;
        let error = '';
        if (message instanceof Array) {
          [error] = message;
        } else {
          error = message;
        }
        if (error.includes('email')) {
          setIsEmailCorrect(false);
          setIsDeliveryTimeCorrect(true);
        }
        if (error.includes('delivery time')) {
          setIsDeliveryTimeCorrect(false);
          setIsEmailCorrect(true);
        }
        return error;
      },
      finally: () => {
        navigate('/admin/suppliers');
      },
    });

    return response;
  };

  return { supplier, editSupplier };
};

export default useEditSupplier;

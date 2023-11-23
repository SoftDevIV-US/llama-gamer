import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { CreateSupplierDto } from '@/models/supplier.model';
import { createSupplier } from '@/services/supplier.service';

type Props = {
  setIsEmailCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeliveryTimeCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCountryCorrect: React.Dispatch<React.SetStateAction<boolean>>;
};

const useAddSupplier = ({ setIsEmailCorrect, setIsDeliveryTimeCorrect, setIsCountryCorrect }: Props) => {
  const { navigate } = useNavigate();

  const addSupplier = (supplier: CreateSupplierDto) => {
    const response = toast.promise(createSupplier(supplier), {
      loading: 'Creating supplier...',
      success: (res) => {
        setIsEmailCorrect(true);
        setIsDeliveryTimeCorrect(true);
        setIsCountryCorrect(true);
        navigate('/admin/suppliers');
        return `Supplier ${res.email} created successfully`;
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
          setIsCountryCorrect(true);
        }
        if (error.includes('deliveryTime')) {
          setIsDeliveryTimeCorrect(false);
          setIsEmailCorrect(true);
          setIsCountryCorrect(true);
        }
        if (error.includes('countryId')) {
          setIsCountryCorrect(false);
          setIsEmailCorrect(true);
          setIsDeliveryTimeCorrect(true);
        }
        toast.error(message);
        return error;
      },
    });
    return response;
  };

  return { addSupplier };
};

export default useAddSupplier;

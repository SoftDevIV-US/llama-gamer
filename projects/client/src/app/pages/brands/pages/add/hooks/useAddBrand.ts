import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { CreateBrandDto } from '@/models/brand.model';
import { createBrand } from '@/services/brand.service';

type Props = {
  setIsNameCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogoCorrect: React.Dispatch<React.SetStateAction<boolean>>;
};

const useAddBrand = ({ setIsNameCorrect, setIsLogoCorrect }: Props) => {
  const { navigate } = useNavigate();

  const addBrand = (brand: CreateBrandDto) => {
    const response = toast.promise(createBrand(brand), {
      loading: 'Creating brand...',
      success: (res) => {
        setIsNameCorrect(true);
        setIsLogoCorrect(true);
        navigate('/admin/brands');
        return `Brand ${res.name} created successfully`;
      },
      error: (err) => {
        const { message } = err.response.data;
        let error = '';
        if (message instanceof Array) {
          [error] = message;
        } else {
          error = message;
        }
        if (error.includes('name')) {
          setIsNameCorrect(false);
          setIsLogoCorrect(true);
        }
        if (error.includes('logo')) {
          setIsLogoCorrect(false);
          setIsNameCorrect(true);
        }
        return error;
      },
    });
    return response;
  };

  return { addBrand };
};

export default useAddBrand;

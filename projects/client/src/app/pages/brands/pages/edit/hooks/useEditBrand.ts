import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { Brand, UpdateBrandDto } from '@/models/product.model';
import { getBrandById, updateBrandById } from '@/services/brand.service';

type Props = {
  id: string;
  setIsNameCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogoCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useEditBrand = ({ id, setIsNameCorrect, setIsLogoCorrect, setIsLoading, setFound }: Props) => {
  const [brand, setBrand] = useState<Brand>({} as Brand);
  const { navigate } = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getBrandById(id), {
      loading: 'Loading country...',
      success: (res) => {
        setBrand(res);
        return `Country ${res.name} loaded successfully`;
      },
      error: () => {
        setFound(false);
        return 'Error Country not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [id, setIsLoading, setFound]);

  const editBrand = (brandToUpdate: UpdateBrandDto) => {
    const response = toast.promise(updateBrandById(id, brandToUpdate), {
      loading: 'Updating brand...',
      success: (res) => {
        setIsNameCorrect(true);
        setIsLogoCorrect(true);
        navigate('/admin/brands');
        return `brand ${res.name} updated successfully`;
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

  return { brand, editBrand };
};

export default useEditBrand;

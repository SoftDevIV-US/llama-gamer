import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { Category, UpdateCategoryDto } from '@/models/product.model';
import { getCategoryById, updateCategoryById } from '@/services/category.service';

type Props = {
  id: string;
  setIsNameCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useEditCategory = ({ id, setIsNameCorrect, setIsImageCorrect, setIsLoading, setFound }: Props) => {
  const [category, setCategory] = useState<Category>({} as Category);
  const { navigate } = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getCategoryById(id), {
      loading: 'Loading category...',
      success: (res) => {
        setCategory(res);
        return `Category ${res.name} loaded successfully`;
      },
      error: () => {
        setFound(false);
        return 'Error Category not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [id, setIsLoading, setFound]);

  const editCategory = (categoryToUpdate: UpdateCategoryDto) => {
    const response = toast.promise(updateCategoryById(id, categoryToUpdate), {
      loading: 'Updating category...',
      success: (res) => {
        setIsNameCorrect(true);
        setIsImageCorrect(true);
        navigate('/admin/categories');
        return `Category ${res.name} updated successfully`;
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
          setIsImageCorrect(true);
        }
        if (error.includes('image')) {
          setIsImageCorrect(false);
          setIsNameCorrect(true);
        }
        return error;
      },
    });

    return response;
  };

  return { category, editCategory };
};

export default useEditCategory;

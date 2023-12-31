import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Category } from '@/models/product.model';
import { getAllCategories } from '@/services/category.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLoadCategories = ({ setIsLoading, setIsFound }: Props) => {
  const [categories, setCategories] = useState<Category[]>([] as Category[]);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getAllCategories(), {
      loading: 'Loading categories...',
      success: (res) => {
        setCategories(res);
        setIsFound(true);
        return 'Categories loaded successfully';
      },
      error: () => {
        setIsFound(false);
        return 'Categories not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound]);

  return { categories };
};

export default useLoadCategories;

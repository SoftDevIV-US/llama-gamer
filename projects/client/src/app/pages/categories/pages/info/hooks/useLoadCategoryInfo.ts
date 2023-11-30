import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Category } from '@/models/product.model';
import { getCategoryById } from '@/services/category.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const useLoadCategoryInfo = ({ setIsLoading, setIsFound, id }: Props) => {
  const [category, setCategory] = useState<Category>({} as Category);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getCategoryById(id), {
      loading: 'Loading category...',
      success: (res) => {
        setCategory(res);
        setIsFound(true);
        return `Category ${res.name} loaded successfully`;
      },
      error: () => {
        setIsFound(false);
        return 'Error Category not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound, id]);

  return { category };
};

export default useLoadCategoryInfo;

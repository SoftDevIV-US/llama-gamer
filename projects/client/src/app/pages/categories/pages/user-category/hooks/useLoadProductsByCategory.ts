import { useEffect, useState } from 'react';

import { Category } from '@/models/product.model';
import { getCategoryById } from '@/services/category.service';

type Props = {
  id: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLoadProductsByCategory = ({ id, setIsLoading }: Props) => {
  const [category, setCategory] = useState<Category>({} as Category);

  useEffect(() => {
    const loadCategory = async () => {
      const response = await getCategoryById(id);
      const result = {
        ...response,
        products: response.products.slice(0, Math.min(50, response.products.length)),
      };
      setCategory(result);
    };

    loadCategory();
    setIsLoading(false);
  }, [id, setIsLoading]);

  return { category };
};

export default useLoadProductsByCategory;

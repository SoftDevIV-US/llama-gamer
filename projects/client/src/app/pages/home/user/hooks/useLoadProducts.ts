import { useEffect, useState } from 'react';

import { Brand, Category } from '@/models/product.model';
import { getAllBrands } from '@/services/brand.service';
import { getAllCategories } from '@/services/category.service';

type Props = {
  setIsLoading: (isLoading: boolean) => void;
};

const useLoadProducts = ({ setIsLoading }: Props) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadBrands = async () => {
      const response = await getAllBrands();
      if (response.length === 0) return;
      const randomBrands = response.sort(() => Math.random() - Math.random()).slice(0, Math.min(2, response.length));

      setBrands(randomBrands);
    };

    const loadCategories = async () => {
      const response = await getAllCategories();
      setCategories(response);
    };

    loadBrands();
    loadCategories();
    setIsLoading(false);
  }, [setIsLoading]);

  return { brands, categories };
};

export default useLoadProducts;

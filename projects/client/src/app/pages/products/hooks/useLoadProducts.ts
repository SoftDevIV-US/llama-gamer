import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Product } from '@/models/product.model';
import { getAllProducts } from '@/services/product.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLoadProducts = ({ setIsLoading, setIsFound }: Props) => {
  const [products, setProducts] = useState<Product[]>([] as Product[]);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getAllProducts(), {
      loading: 'Loading products...',
      success: (res) => {
        if (Array.isArray(res)) {
          setProducts(res);
          setIsFound(true);
        } else {
          setIsFound(false);
        }
        return 'Products loaded successfully';
      },
      error: () => {
        setIsFound(false);
        return 'Error Product not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound]);

  return { products };
};

export default useLoadProducts;

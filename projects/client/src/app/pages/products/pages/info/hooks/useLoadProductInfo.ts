import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Product } from '@/models/product.model';
import { getProductById } from '@/services/product.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const useLoadProductInfo = ({ setIsLoading, setIsFound, id }: Props) => {
  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getProductById(id), {
      loading: 'Loading product...',
      success: (res) => {
        setProduct(res);
        setIsFound(true);
        return `Product ${res.name} loaded successfully`;
      },
      error: () => {
        setIsFound(false);
        return 'Error Product not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound, id]);

  return { product };
};

export default useLoadProductInfo;

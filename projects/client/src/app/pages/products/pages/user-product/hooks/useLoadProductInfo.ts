import { useEffect, useState } from 'react';

import { Product } from '@/models/product.model';
import { Supplier } from '@/models/supplier.model';
import { getProductById } from '@/services/product.service';

type Props = {
  id: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSupplier: React.Dispatch<React.SetStateAction<Supplier | null>>;
};

const useLoadProductInfo = ({ id, setIsLoading, setSupplier }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const response = await getProductById(id);
      setSupplier(response.productsSuppliers[0].supplier);
      setProduct(response);
    }

    loadProduct();
    setIsLoading(false);
  }, [id, setIsLoading, setSupplier]);

  return { product };
};

export default useLoadProductInfo;

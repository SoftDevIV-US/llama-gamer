import { useEffect, useState } from 'react';

import useNavigate from '@/app/hooks/useNavigate';
import { CartProduct, Product } from '@/models/product.model';
import { Supplier } from '@/models/supplier.model';
import { getProductById } from '@/services/product.service';
import useCartStore from '@/store/cart.store';

type Props = {
  id: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSupplier: React.Dispatch<React.SetStateAction<Supplier | null>>;
};

const useLoadProductInfo = ({ id, setIsLoading, setSupplier }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);
  const { addToCart, isInCart, removeFromCart } = useCartStore();
  const { navigate } = useNavigate();

  useEffect(() => {
    async function loadProduct() {
      const response = await getProductById(id);
      if (response.productsSuppliers.length >= 1) {
        setSupplier(response.productsSuppliers[0].supplier);
      }
      setProduct(response);
    }

    setIsAlreadyInCart(isInCart(id));
    loadProduct();
    setIsLoading(false);
  }, [id, setIsLoading, setSupplier, isInCart]);

  const add = (item: CartProduct) => {
    addToCart(item);
    navigate('/cart');
  };

  const remove = () => {
    removeFromCart(id);
    setIsAlreadyInCart(false);
  };

  return { product, add, isAlreadyInCart, remove };
};

export default useLoadProductInfo;

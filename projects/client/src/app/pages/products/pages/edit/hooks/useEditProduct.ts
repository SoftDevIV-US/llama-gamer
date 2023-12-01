import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { Product, UpdateProductDto } from '@/models/product.model';
import { getProductById, updateProductById } from '@/services/product.service';

type Props = {
  id: string;
  setIsNameCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDescriptionCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStockCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPriceCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAvailableCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBrandCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useEditProduct = ({
  id,
  setIsNameCorrect,
  setIsDescriptionCorrect,
  setIsStockCorrect,
  setIsPriceCorrect,
  setIsAvailableCorrect,
  setIsCategoryCorrect,
  setIsBrandCorrect,
  setIsLoading,
  setFound,
}: Props) => {
  const [product, setProduct] = useState<Product>({} as Product);
  const { navigate } = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getProductById(id), {
      loading: 'Loading product...',
      success: (res) => {
        setProduct(res);
        return `Product ${res.name} loaded successfully`;
      },
      error: () => {
        setFound(false);
        return 'Error Product not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [id, setIsLoading, setFound]);

  const editProduct = (productToUpdate: UpdateProductDto) => {
    const response = toast.promise(updateProductById(id, productToUpdate), {
      loading: 'Updating product...',
      success: (res) => {
        setIsNameCorrect(true);
        setIsDescriptionCorrect(true);
        setIsStockCorrect(true);
        setIsPriceCorrect(true);
        setIsAvailableCorrect(true);
        setIsCategoryCorrect(true);
        setIsBrandCorrect(true);
        navigate('/admin/products');
        return `Product ${res.name} updated successfully`;
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
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsPriceCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
        }
        if (error.includes('description')) {
          setIsDescriptionCorrect(false);
          setIsNameCorrect(true);
          setIsStockCorrect(true);
          setIsPriceCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
        }
        if (error.includes('stock')) {
          setIsStockCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsPriceCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
        }
        if (error.includes('price')) {
          setIsPriceCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
        }
        if (error.includes('category')) {
          setIsCategoryCorrect(false);
          setIsPriceCorrect(true);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsBrandCorrect(true);
        }
        if (error.includes('brand')) {
          setIsBrandCorrect(false);
          setIsCategoryCorrect(true);
          setIsPriceCorrect(true);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
        }
        return error;
      },
    });

    return response;
  };

  return { product, editProduct };
};

export default useEditProduct;

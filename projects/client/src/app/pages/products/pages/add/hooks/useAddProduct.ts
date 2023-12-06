import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { CreateProductDto } from '@/models/product.model';
import { createProduct } from '@/services/product.service';

type Props = {
  setIsNameCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDescriptionCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStockCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPriceCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAvailableCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBrandCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSupplierCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageCorrect: React.Dispatch<React.SetStateAction<boolean>>;
};

const useAddProduct = ({
  setIsNameCorrect,
  setIsDescriptionCorrect,
  setIsStockCorrect,
  setIsPriceCorrect,
  setIsAvailableCorrect,
  setIsCategoryCorrect,
  setIsBrandCorrect,
  setIsSupplierCorrect,
  setIsImageCorrect,
}: Props) => {
  const { navigate } = useNavigate();

  const addProduct = (product: CreateProductDto) => {
    const response = toast.promise(createProduct(product), {
      loading: 'Creating product...',
      success: (res) => {
        setIsNameCorrect(true);
        setIsDescriptionCorrect(true);
        setIsStockCorrect(true);
        setIsPriceCorrect(true);
        setIsAvailableCorrect(true);
        setIsCategoryCorrect(true);
        setIsBrandCorrect(true);
        setIsSupplierCorrect(true);
        setIsImageCorrect(true);
        navigate('/admin/products');
        return `Product ${res.name} created successfully`;
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
          setIsAvailableCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
          setIsSupplierCorrect(true);
          setIsImageCorrect(true);
        }
        if (error.includes('description')) {
          setIsDescriptionCorrect(false);
          setIsNameCorrect(true);
          setIsStockCorrect(true);
          setIsPriceCorrect(true);
          setIsAvailableCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
          setIsSupplierCorrect(true);
          setIsImageCorrect(true);
        }
        if (error.includes('stock')) {
          setIsStockCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsPriceCorrect(true);
          setIsAvailableCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
          setIsSupplierCorrect(true);
          setIsImageCorrect(true);
        }
        if (error.includes('price')) {
          setIsPriceCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsAvailableCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
          setIsSupplierCorrect(true);
          setIsImageCorrect(true);
        }
        if (error.includes('available')) {
          setIsAvailableCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsPriceCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
          setIsSupplierCorrect(true);
          setIsImageCorrect(true);
        }
        if (error.includes('category')) {
          setIsCategoryCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsPriceCorrect(true);
          setIsAvailableCorrect(true);
          setIsBrandCorrect(true);
          setIsSupplierCorrect(true);
          setIsImageCorrect(true);
        }
        if (error.includes('brand')) {
          setIsBrandCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsPriceCorrect(true);
          setIsAvailableCorrect(true);
          setIsCategoryCorrect(true);
          setIsSupplierCorrect(true);
          setIsImageCorrect(true);
        }
        if (error.includes('suppliers')) {
          setIsSupplierCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsPriceCorrect(true);
          setIsAvailableCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
          setIsImageCorrect(true);
        }
        if (error.includes('image')) {
          setIsImageCorrect(false);
          setIsNameCorrect(true);
          setIsDescriptionCorrect(true);
          setIsStockCorrect(true);
          setIsPriceCorrect(true);
          setIsAvailableCorrect(true);
          setIsCategoryCorrect(true);
          setIsBrandCorrect(true);
          setIsSupplierCorrect(true);
        }
        toast.error(message);
        return error;
      },
    });
    return response;
  };

  return { addProduct };
};

export default useAddProduct;

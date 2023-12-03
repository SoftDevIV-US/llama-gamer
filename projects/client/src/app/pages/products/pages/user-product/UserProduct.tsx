import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@/app/components/button/Button';
import Loading from '@/app/components/loading/Loading';
import defaultLogo from '@/assets/images/default.png';
import { Supplier } from '@/models/supplier.model';

import useLoadProductInfo from './hooks/useLoadProductInfo';

type Params = {
  id: string;
};

function UserProduct() {
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const { id } = useParams<Params>();

  const { product, add, isAlreadyInCart, remove } = useLoadProductInfo({
    id: String(id),
    setIsLoading,
    setSupplier,
  });

  const handleChange = (event: Supplier) => {
    setSupplier(event);
  };

  return (
    <div className='grid w-full break-words p-4 lg:px-14 lg:py-6'>
      {isLoading || !product ? (
        <div className='grid h-screen w-full place-content-center gap-5 text-center'>
          <Loading />
          <span className='text-2xl font-normal'>Loading Product...</span>
        </div>
      ) : (
        <div className='flex w-full flex-col gap-5'>
          <div className='flex h-[700px] w-full flex-col gap-5 bg-white px-7 py-4 shadow-lg lg:h-[470px] lg:flex-row lg:gap-32 lg:px-16 lg:py-8'>
            <picture className='flex place-content-center'>
              <img
                src={product.productImages.length >= 1 ? product.productImages[0].image : defaultLogo}
                alt={product.name}
                className='h-[200px] w-[200px]  lg:h-[425px] lg:w-[425px]'
              />
            </picture>
            <div className='flex grow flex-col gap-2 lg:gap-5'>
              <p className='text-base font-medium text-[#0077E4] lg:text-3xl'>{product.name}</p>
              <p className='text-base font-medium text-[#1D232C] lg:mt-5 lg:text-lg'>{product.brand.name}</p>
              <picture>
                <img
                  src={product.brand.logo}
                  alt={product.brand.name}
                  className='w-[100[px] h-[100px] lg:h-[150px] lg:w-[150px]'
                />
              </picture>
            </div>
            {isAlreadyInCart ? (
              <div className='flex h-full flex-col place-content-center items-center gap-3'>
                <p className='text-lg font-medium lg:text-xl'>This product is already in your cart</p>
                <Button
                  className='mx-auto w-3/4 rounded-2xl bg-[#FF316A] px-3 py-2 text-base text-white lg:px-5 lg:py-4 lg:text-lg'
                  onClick={() => {
                    remove();
                  }}
                >
                  Remove from Cart
                </Button>
              </div>
            ) : (
              <div className='flex h-full w-full flex-col place-content-center gap-2 text-sm text-[#586A84] lg:w-[500px] lg:gap-7 lg:text-lg'>
                <div className='flex w-full justify-between'>
                  <p>Stock:</p>
                  <p className='rounded-full bg-[#ffe5ec] px-2 py-1 text-[#FF316A] lg:mb-5'>{product.stock}</p>
                </div>
                {supplier ? (
                  <div className='relative flex w-full'>
                    <div className='flex w-full justify-between'>
                      <div>
                        <span>Country: </span>
                        <span className='font-medium text-black'>{supplier.country.name}</span>
                      </div>
                      <div>
                        <span>Tax: </span>
                        <span className='font-medium text-black'>{supplier.country.tax.toFixed(2)}%</span>
                      </div>
                      <div>
                        <span>Delivery Time: </span>
                        <span className='rounded-2xl bg-[#cafbec] px-2 py-1 text-[#0DA678]'>
                          {supplier.deliveryTime} days
                        </span>
                      </div>
                    </div>
                    <Button onClick={() => setIsOpen((state) => !state)} className='text-xl'>
                      <KeyboardArrowDownIcon fontSize='inherit' className={`${isOpen ? 'rotate-180' : ''}`} />
                    </Button>
                    {isOpen && (
                      <div className='absolute mt-12 flex w-full flex-col rounded-xl bg-[#dde1e8] shadow-lg'>
                        {product.productsSuppliers
                          .filter((item) => item.supplier.id !== supplier.id)
                          .map((item) => (
                            <Button
                              key={item.supplier.id}
                              className='flex w-full justify-between p-3'
                              onClick={() => {
                                handleChange(item.supplier);
                                setIsOpen(false);
                              }}
                            >
                              <div>
                                <span>Country: </span>
                                <span className='font-medium text-black'>{item.supplier.country.name}</span>
                              </div>
                              <div>
                                <span>Tax: </span>
                                <span className='font-medium text-black'>{item.supplier.country.tax.toFixed(2)}%</span>
                              </div>
                              <div>
                                <span>Delivery Time: </span>
                                <span className='rounded-2xl bg-[#cafbec] px-2 py-1 text-[#0DA678]'>
                                  {item.supplier.deliveryTime} days
                                </span>
                              </div>
                            </Button>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='w-full'>
                    <p>This Product doesn't have Suppliers yet</p>
                  </div>
                )}

                <div className='flex w-full flex-col gap-4 lg:flex-row lg:gap-10'>
                  <p className='text-lg font-medium text-black lg:text-4xl'>
                    {supplier
                      ? (product.price * quantity + product.price * quantity * supplier.country.tax).toFixed(2)
                      : (product.price * quantity).toFixed(2)}{' '}
                    Bs
                  </p>
                  <div className='flex grow items-center justify-between rounded-full border border-black/20 px-5 text-base lg:text-lg'>
                    <Button
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                    >
                      <RemoveIcon fontSize='inherit' />
                    </Button>
                    <p>{quantity}</p>
                    <Button
                      onClick={() => {
                        if (quantity < product.stock) {
                          setQuantity(quantity + 1);
                        }
                      }}
                    >
                      <AddIcon fontSize='inherit' />
                    </Button>
                  </div>
                </div>
                <Button
                  className='flex w-full place-content-center items-center gap-3 rounded-full bg-[#3a4d5e] py-2 text-sm text-white lg:py-4 lg:text-lg'
                  onClick={() => {
                    add({
                      product,
                      quantity,
                      deliveryTime: supplier ? supplier.deliveryTime : 0,
                      tax: supplier ? supplier.country.tax : 0,
                      totalPrice: supplier
                        ? product.price * quantity + product.price * quantity * supplier.country.tax
                        : product.price * quantity,
                      priceWithoutTax: product.price * quantity,
                      supplier,
                    });
                  }}
                >
                  <p>Add to Cart</p>
                  <div>
                    <LocalMallIcon fontSize='inherit' />
                  </div>
                </Button>
              </div>
            )}
          </div>
          <div className='flex w-full flex-col'>
            <p className='w-fit bg-white p-3 text-base font-medium lg:p-5 lg:text-2xl'>Description</p>
            <div className='flex min-h-[400px] w-full break-all bg-white px-3 py-5 shadow-lg lg:px-5 lg:py-10'>
              <p className='text-sm lg:text-xl'>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProduct;

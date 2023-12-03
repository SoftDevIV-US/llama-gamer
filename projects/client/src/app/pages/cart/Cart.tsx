import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

import Button from '@/app/components/button/Button';
import useNavigate from '@/app/hooks/useNavigate';
import useCartStore from '@/store/cart.store';

import ProductCart from './components/ProductCart';
import TotalBalance from './components/TotalBalance';

function Cart() {
  const { cart } = useCartStore();
  const { navigate } = useNavigate();

  return (
    <div className='flex w-full flex-col gap-4 px-20 py-16'>
      <h1 className=' text-left text-2xl font-semibold'>{`My Cart (${cart.length})`}</h1>

      {cart.length === 0 ? (
        <div className='mt-24 grid h-full place-content-center gap-5'>
          <span className='text-2xl font-medium'>No products in the Cart yet</span>
          <Button
            className='mx-auto flex w-fit place-content-center items-center gap-2 rounded-lg bg-[#3a4d5e] px-3 py-2 text-lg text-white'
            onClick={() => {
              navigate('/');
            }}
          >
            <p>
              <ArrowBackIcon fontSize='inherit' />
            </p>
            <p className='font-medium'>Back to Shop</p>
          </Button>
        </div>
      ) : (
        <div className='grid  w-full place-content-center gap-5 sm:grid-flow-col  '>
          <div className='flex grow flex-col  gap-5 rounded-lg bg-white p-5 shadow-lg'>
            {cart.map((item, index) => (
              <React.Fragment key={item.product.id}>
                <ProductCart key={item.product.id} item={item} />
                {index !== cart.length - 1 && <hr className='border border-[#DDE1E8]' />}
              </React.Fragment>
            ))}
            <Button
              className='flex w-fit place-content-center items-center gap-2 rounded-lg bg-[#3a4d5e] px-3 py-2 text-lg text-white'
              onClick={() => {
                navigate('/');
              }}
            >
              <p>
                <ArrowBackIcon fontSize='inherit' />
              </p>
              <p className='font-medium'>Back to Shop</p>
            </Button>
          </div>
          <TotalBalance />
        </div>
      )}
    </div>
  );
}

export default Cart;

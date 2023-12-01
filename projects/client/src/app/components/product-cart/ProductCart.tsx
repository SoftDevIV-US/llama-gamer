import { Button } from '@mui/material';
import { useState } from 'react';

type Props = {
  name: string;
  supplier: string;
  tax: string;
  brand: string;
  days: string;
  image: string;
  price: string;
  quantity: number;
};

function ProductCart({ name, supplier, tax, brand, days, image, price, quantity }: Props) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const increaseQuantity = () => {
    setCurrentQuantity(currentQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity(currentQuantity - 1);
    }
  };

  return (
    <div className='flex w-full flex-row rounded-lg bg-white p-5'>
      <img src={image} alt={name} />
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <div className='flex flex-col items-start justify-start'>
            <p className='text-lg font-semibold'>{name}</p>
            <p className='text-sm text-gray-600'>{brand}</p>
          </div>
          <div className='flex w-full flex-col items-end justify-end'>
            <p className='text-right text-lg font-semibold'>Bs.{price}</p>
            <div className='flex flex-row'>
              <Button
                className='w-32 rounded-sm bg-gray-600 px-4 py-2 text-white hover:bg-gray-700'
                onClick={decreaseQuantity}
              >
                -
              </Button>
              <p className='text-right text-lg font-semibold'>{currentQuantity}</p>
              <Button
                className='w-32 rounded-sm bg-gray-600 px-4 py-2 text-white hover:bg-gray-700'
                onClick={increaseQuantity}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <div className='flex flex-row items-end justify-end'>
          <Button className='w-32 rounded-sm bg-red-600 px-4 py-2 text-white hover:bg-red-700'>remove</Button>
          <div className='flex flex-row space-x-3'>
            <p className='text-sm text-gray-600'>Supplier country: {supplier}</p>
            <p className='text-sm text-gray-600'>Tax: {tax}%</p>
            <p className='text-sm text-gray-600'>Delivery Time: {days} days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;

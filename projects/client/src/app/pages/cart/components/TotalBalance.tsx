import React from 'react';
import { toast } from 'sonner';

import Button from '@/app/components/button/Button';
import useAuthStore from '@/store/auth.store';
import useCartStore from '@/store/cart.store';

import InvoiceModal from '../../invoice/InvoiceModal';

function TotalBalance() {
  const { getTotalPrice, cart } = useCartStore();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const { auth } = useAuthStore();

  const handleCheckout = () => {
    if (auth === null) {
      toast.warning('You need to be logged in to make a purchase');
      return;
    }
    setModalOpen(true);
  };

  const tax = getTotalPrice() * 0.13;

  return (
    <div className='flex h-[220px]  w-[320px] flex-col justify-between rounded-lg bg-white p-5 shadow-lg'>
      <div className='flex w-full flex-col gap-5 text-[#505050]'>
        <div className='flex w-full justify-between'>
          <p>Subtotal:</p>
          <p>{getTotalPrice().toFixed(2)} Bs</p>
        </div>
        <div className='flex w-full justify-between'>
          <p>Tax:</p>
          <p className='text-[#00B517]'>
            + {(Number((tax + getTotalPrice()).toFixed(2)) - Number(getTotalPrice().toFixed(2))).toFixed(2)} Bs
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <hr className='border-[0.5px] border-[#DDE1E8]' />
        <div className='flex w-full justify-between text-lg font-semibold'>
          <p>Total:</p>
          <p>{(tax + getTotalPrice()).toFixed(2)} Bs</p>
        </div>
        <Button
          className='w-full rounded-xl bg-[#00b517] py-2 text-lg  font-medium text-white'
          onClick={handleCheckout}
        >
          Checkout
        </Button>
        <InvoiceModal
          id='someId'
          name='Invoice'
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          cart={cart}
          totalPrice={getTotalPrice()}
        />
      </div>
    </div>
  );
}

export default TotalBalance;

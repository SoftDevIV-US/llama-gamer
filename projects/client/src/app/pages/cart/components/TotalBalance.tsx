import Button from '@/app/components/button/Button';
import useCartStore from '@/store/cart.store';

function TotalBalance() {
  const { getTotalPrice } = useCartStore();

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
          <p className='text-[#00B517]'>+ {tax.toFixed(2)} Bs</p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <hr className='border-[0.5px] border-[#DDE1E8]' />
        <div className='flex w-full justify-between text-lg font-semibold'>
          <p>Total:</p>
          <p>{(tax + getTotalPrice()).toFixed(2)} Bs</p>
        </div>
        <Button className='w-full rounded-xl bg-[#00b517] py-2 text-lg  font-medium text-white'>Checkout</Button>
      </div>
    </div>
  );
}

export default TotalBalance;

import InnerLayout from '@/app/layouts/InnerLayout';

function Cart() {
  const cartPageText = 'My Cart Page';
  return (
    <InnerLayout>
      <div className='grid h-full w-full place-content-center '>
        <h1 className='text-3xl font-bold'> {cartPageText}</h1>
      </div>
    </InnerLayout>
  );
}

export default Cart;

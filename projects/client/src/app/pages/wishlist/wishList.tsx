import InnerLayout from '@/app/layouts/InnerLayout';

function Wishlist() {
  const WishlistPageText = 'Wishlist Page';
  return (
    <InnerLayout>
      <div className='grid h-full w-full place-content-center '>
        <h1 className='text-3xl font-bold'>{WishlistPageText}</h1>
      </div>
    </InnerLayout>
  );
}

export default Wishlist;

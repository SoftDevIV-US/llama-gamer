import Button from '@/app/components/button/Button';
import defaultLogo from '@/assets/images/default.png';
import { CartProduct } from '@/models/product.model';
import useCartStore from '@/store/cart.store';

type Props = {
  item: CartProduct;
};

function ProductCart({ item }: Props) {
  const { removeFromCart } = useCartStore();

  return (
    <div className='flex h-[225px] justify-between gap-16 p-2'>
      <picture className='flex h-full place-content-center items-center'>
        <img
          src={item.product.productImages.length >= 1 ? item.product.productImages[0].image : defaultLogo}
          alt={item.product.name}
          className='h-[125px] w-[125px]'
        />
      </picture>
      <div className='flex flex-col justify-between break-words text-lg'>
        <div className='flex flex-col gap-3'>
          <p className='font-medium'>{item.product.name}</p>
          <p className='text-[#8B96A5]'>Description: {item.product.description}</p>
          <p className='text-[#8B96A5]'>Brand: {item.product.brand.name}</p>
        </div>
        <Button
          className='w-fit rounded-lg border border-black/30 px-4 py-2 font-medium text-[#FA3434]'
          onClick={() => {
            removeFromCart(item.product.id);
          }}
        >
          Remove
        </Button>
      </div>
      <div className='flex grow'>
        <div className='flex w-full flex-col justify-between'>
          <p className='text-end text-lg font-medium'>{item.totalPrice.toFixed(2)} Bs</p>
          <div className='flex w-full flex-col items-end gap-3'>
            <p className='text-lg'>Quantity: {item.quantity}</p>
            {!item.supplier ? (
              <p className='text-lg'>This product doesn't have a Supplier</p>
            ) : (
              <div className='flex w-full justify-between text-[#586A84]'>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;

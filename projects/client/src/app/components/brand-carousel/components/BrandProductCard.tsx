import LocalMallIcon from '@mui/icons-material/LocalMall';

import useNavigate from '@/app/hooks/useNavigate';
import { PrismaCategoryProduct } from '@/models/product.model';

import Button from '../../button/Button';

type Props = {
  product: PrismaCategoryProduct;
};

function BrandProductCard({ product }: Props) {
  const { navigate } = useNavigate();

  return (
    <div className='flex h-[355px] w-[250px]  flex-col justify-between gap-1 rounded-xl bg-white p-5 font-medium'>
      <div className='flex flex-col gap-5'>
        <p className='text-sm text-[#586A84]'>{product.category.name}</p>
        <p className='text-base text-[#0077E4]'>{product.name}</p>
      </div>
      <picture className='grid w-full place-content-center'>
        <img src={product.productImages[0].image} alt={product.name} className='h-[175px] w-[175px]' />
      </picture>
      <div className='flex w-full items-center justify-between'>
        <p className='text-lg font-bold'>{product.price.toFixed(2)} Bs</p>
        <Button
          className='rounded-full bg-[#DDE1E8] px-2 py-1 text-lg text-white'
          onClick={() => {
            navigate(`/product/${product.id}`);
          }}
        >
          <LocalMallIcon fontSize='inherit' />
        </Button>
      </div>
    </div>
  );
}

export default BrandProductCard;

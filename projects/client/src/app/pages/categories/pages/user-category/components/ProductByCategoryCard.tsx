import Button from '@/app/components/button/Button';
import useNavigate from '@/app/hooks/useNavigate';
import { PrismaProduct } from '@/models/product.model';

type Props = {
  product: PrismaProduct;
};

function ProductByCategoryCard({ product }: Props) {
  const { navigate } = useNavigate();

  return (
    <div className='flex h-[115px] w-full gap-3 rounded-lg bg-white p-2 shadow-xl md:h-[280px] md:gap-6 md:p-10 xl:gap-24'>
      <picture className='block grow-0'>
        <img
          src={product.productImages[0].image}
          alt={product.name}
          className='h-[90px] w-[90px] md:h-[200px] md:w-[200px]'
        />
      </picture>
      <section className='flex grow flex-col place-content-center gap-5'>
        <p className='text-[10px] font-medium text-[#3A4D5E] md:text-2xl'>{product.name}</p>
        <p className='text-[8px] text-[#586A84] md:text-lg'>{product.description}</p>
      </section>
      <section className='flex h-full w-[90px] flex-col place-content-center content-center gap-2 md:w-[200px] md:gap-5 '>
        <p className='text-[10px] font-medium text-[#1D232C] md:text-xl'>{product.price} Bs</p>
        <Button
          className='rounded-2xl bg-[#3a4d5e] py-1 text-[6px] text-white md:text-base'
          onClick={() => {
            navigate(`/product/${product.id}`);
          }}
        >
          Details
        </Button>
      </section>
    </div>
  );
}

export default ProductByCategoryCard;

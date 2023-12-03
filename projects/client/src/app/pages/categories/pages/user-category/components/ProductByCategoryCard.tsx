import Button from '@/app/components/button/Button';
import useNavigate from '@/app/hooks/useNavigate';
import defaultLogo from '@/assets/images/default.png';
import { PrismaProduct } from '@/models/product.model';

type Props = {
  product: PrismaProduct;
};

function ProductByCategoryCard({ product }: Props) {
  const { navigate } = useNavigate();

  const text =
    'Experience cable-free freedom and exceptional performance with our Wireless RGB Mechanical Keyboard. Its high-quality switches provide precise tactile responses, while the customizable RGB backlight adds a stylish touch to your workspace. With low-latency wireless connectivity, outstanding durability, and an ergonomic design, this keyboard is the perfect choice for gamers and professionals seeking the ideal balance of form and function.;';

  return (
    <div className='flex h-[115px] w-full gap-3 break-words rounded-lg bg-white p-2 shadow-xl md:h-[280px] md:gap-6 md:p-10 xl:gap-24'>
      <picture className=' flex h-full grow-0 items-center'>
        <img
          src={product.productImages.length >= 1 ? product.productImages[0].image : defaultLogo}
          alt={product.name}
          className='h-[90px] w-[90px] min-w-[90px] lg:h-[200px] lg:w-[200px] lg:min-w-[200px]'
        />
      </picture>
      <section className='flex grow flex-col place-content-center gap-5'>
        <p className='text-[10px] font-medium text-[#3A4D5E] md:text-2xl'>{product.name}</p>
        <p className='break-words text-[8px] text-[#586A84] md:text-lg'>
          {text.length > 100 ? `${text.substring(0, 100)}...` : text}
        </p>
      </section>
      <section className='flex h-full w-[90px] min-w-[90px] flex-col place-content-center content-center gap-2 lg:w-[200px] lg:min-w-[200px] lg:gap-5'>
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

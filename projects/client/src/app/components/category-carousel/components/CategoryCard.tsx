import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import useNavigate from '@/app/hooks/useNavigate';
import { Category } from '@/models/product.model';

import Button from '../../button/Button';

type Props = {
  category: Category;
};

function CategoryCard({ category }: Props) {
  const { navigate } = useNavigate();

  return (
    <div className='flex h-[285px] w-[260px]  flex-col items-center justify-between gap-1 rounded-xl bg-white p-5 text-lg font-medium'>
      <p>{category.name}</p>
      <picture>
        <img src={category.image} alt={category.name} className='h-[175px] w-[175px]' />
      </picture>
      <div className='flex w-full items-center justify-end'>
        <Button
          className='rounded-full bg-[#DDE1E8] px-2 py-1 text-lg text-white'
          onClick={() => {
            navigate(`/category/${category.id}`);
          }}
        >
          <ArrowOutwardIcon fontSize='inherit' className='rotate-45' />
        </Button>
      </div>
    </div>
  );
}

export default CategoryCard;

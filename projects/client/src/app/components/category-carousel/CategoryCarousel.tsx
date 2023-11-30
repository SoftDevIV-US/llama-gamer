import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Carousel from 'react-multi-carousel';

import { Category } from '@/models/product.model';

import Button from '../button/Button';
import CategoryCard from './components/CategoryCard';

type Props = {
  categories: Category[];
};

const responsive = {
  fourth: {
    breakpoint: { max: 3000, min: 1380 },
    items: 4,
  },
  third: {
    breakpoint: { max: 1380, min: 1080 },
    items: 3,
  },
  second: {
    breakpoint: { max: 1080, min: 420 },
    items: 2,
  },
  first: {
    breakpoint: { max: 420, min: 0 },
    items: 1,
  },
};

function CategoryCarousel({ categories }: Props) {
  let ref: Carousel | null = null;

  return (
    <div className='flex w-full flex-col gap-7'>
      <div className='flex w-full justify-between'>
        <div className='w-fit'>
          <h3 className='text-2xl'>Categories</h3>
          <hr className='mt-1 border-[1px] border-[#319DFF]' />
        </div>
        <div className='flex gap-5  sm:pr-14 md:pr-20 lg:pr-32'>
          <Button
            onClick={() => {
              if (!ref || !ref.state) return;
              const prevSlide = ref.state.currentSlide - 1;
              if (prevSlide >= 0) ref?.goToSlide(prevSlide);
            }}
            className='text-lg text-[#586A84]'
          >
            <ArrowBackIosNewIcon fontSize='inherit' />
          </Button>
          <Button
            onClick={() => {
              if (!ref || !ref.state) return;
              const nextSlide = ref.state.currentSlide + 1;
              if (nextSlide < categories.length - 5) ref?.goToSlide(nextSlide);
            }}
            className='text-lg text-[#586A84]'
          >
            <ArrowBackIosNewIcon fontSize='inherit' className='rotate-180' />
          </Button>
        </div>
      </div>
      <div className='flex'>
        <Carousel
          responsive={responsive}
          containerClass='container-class'
          draggable={false}
          arrows={false}
          ref={(el) => {
            ref = el;
          }}
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CategoryCarousel;

import { useState } from 'react';

import BrandCarousel from '@/app/components/brand-carousel/BrandCarousel';
import CategoryCarousel from '@/app/components/category-carousel/CategoryCarousel';
import Loading from '@/app/components/loading/Loading';

import brand from './assets/brand.webp';
import background from './assets/user-background.webp';
import useLoadProducts from './hooks/useLoadProducts';

function User() {
  const [isLoading, setIsLoading] = useState(true);

  const { brands, categories } = useLoadProducts({ setIsLoading });

  return (
    <div className='grid w-screen'>
      <div
        className='flex min-h-screen w-full items-start justify-center bg-cover bg-center bg-no-repeat pt-48 md:justify-start md:pt-0'
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div>
          <img src={brand} alt='Brand' />
        </div>
      </div>
      <div className='min-h-screen w-screen bg-[#e4e3e8] p-14'>
        {isLoading ? (
          <div className='grid h-full w-full place-content-center gap-5 text-center'>
            <Loading />
            <span className='text-2xl font-normal'>Loading Products...</span>
          </div>
        ) : (
          <div className='flex w-full flex-col gap-14'>
            {brands.length >= 1 && brands[0].products.length >= 1 && <BrandCarousel brand={brands[0]} />}
            <div className='lg:px-20'>{categories.length >= 1 && <CategoryCarousel categories={categories} />}</div>
            {brands.length === 2 && brands[1].products.length >= 1 && <BrandCarousel brand={brands[1]} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default User;

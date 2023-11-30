import { useState } from 'react';

import BrandProductCard from '@/app/components/brand-product-cad/BrandProductCard';
import Loading from '@/app/components/loading/Loading';

import brand from './assets/brand.webp';
import background from './assets/user-background.webp';
import useLoadProducts from './hooks/useLoadProducts';

function User() {
  const [isLoading, setIsLoading] = useState(true);

  const { brands, categories } = useLoadProducts({ setIsLoading });

  return (
    <div className='grid w-full'>
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
      <div className='min-h-screen w-full bg-[#e4e3e8] p-10'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {brands.length >= 1 && (
              <div className='w-fit'>
                <h3 className='text-2xl'>{brands[0].name} Products</h3>
                <hr className='mt-1 border-[1px] border-[#319DFF]' />
                <div className='flex gap-2'>
                  {brands[0].products.map((product) => (
                    <BrandProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
            <div className='w-fit'>
              <h3 className='text-2xl'>Categories</h3>
              <hr className='mt-1 border-[1px] border-[#319DFF]' />
              <div className='flex gap-2'>
                {categories.map((category) => (
                  <div key={category.id}>
                    <h4>{category.name}</h4>
                    <hr className='mt-1 border-[1px] border-[#319DFF]' />
                  </div>
                ))}
              </div>
            </div>
            {brands.length === 2 && (
              <div className='w-fit'>
                <h3 className='text-2xl'>{brands[1].name} Products</h3>
                <hr className='mt-1 border-[1px] border-[#319DFF]' />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default User;

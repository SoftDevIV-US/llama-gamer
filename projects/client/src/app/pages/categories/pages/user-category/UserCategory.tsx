import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '@/app/components/loading/Loading';

import ProductByCategoryCard from './components/ProductByCategoryCard';
import useLoadProductsByCategory from './hooks/useLoadProductsByCategory';

type Params = {
  id: string;
};

function UserCategory() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<Params>();

  const { category } = useLoadProductsByCategory({ id: String(id), setIsLoading });

  return (
    <div className='grid w-full px-4 py-8 md:px-16 md:py-12 xl:px-24 xl:py-14'>
      {isLoading ? (
        <div className='grid h-full w-full place-content-center gap-5 text-center'>
          <Loading />
          <span className='text-2xl font-normal'>Loading Products...</span>
        </div>
      ) : (
        <div className='flex w-full flex-col gap-3 md:gap-5'>
          <div className='w-full rounded-lg bg-white px-5 py-3 text-sm font-medium shadow-xl md:p-6 md:text-[30px]'>
            <h1>{category.name}</h1>
          </div>
          {category.products && category.products.length >= 1 ? (
            category.products.map((product) => <ProductByCategoryCard key={product.id} product={product} />)
          ) : (
            <div className='grid h-full w-full place-content-center gap-5 text-center'>
              <span className='text-2xl font-normal'>No products found...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserCategory;

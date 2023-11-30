import { useEffect, useState } from 'react';

import List from '@/app/components/list/List';
import InnerLayout from '@/app/layouts/InnerLayout';

import useLoadProducts from './hooks/useLoadProducts';

function Products() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth <= 414);
    };
    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const { products } = useLoadProducts({ setIsLoading, setIsFound });

  const recordList: RecordList = {
    title: 'Products',
    url: 'products',
    fields: [
      { key: 'Name', value: 'name' },
      ...(isMobileView ? [] : [{ key: 'Stock', value: 'stock' }]),
      { key: 'Price', value: 'price' },
    ],
    values: products,
  };

  return (
    <InnerLayout>
      <List recordList={recordList} isLoading={isLoading} isFound={isFound} />
    </InnerLayout>
  );
}

export default Products;

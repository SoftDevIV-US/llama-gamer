import { useState } from 'react';

import List from '@/app/components/list/List';
import InnerLayout from '@/app/layouts/InnerLayout';

import useLoadBrands from './hooks/useLoadBrands';

function Brands() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);

  const { brands } = useLoadBrands({ setIsLoading, setIsFound });

  const recordList: RecordList = {
    title: 'Brands',
    url: 'brands',
    fields: [{ key: 'Name', value: 'name', isUnderline: true }],
    values: brands,
  };

  return (
    <InnerLayout>
      <List recordList={recordList} isLoading={isLoading} isFound={isFound} />
    </InnerLayout>
  );
}

export default Brands;

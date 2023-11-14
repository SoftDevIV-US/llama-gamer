import { useState } from 'react';

import List from '@/app/components/list/List';
import InnerLayout from '@/app/layouts/InnerLayout';

import useLoadCategories from './hooks/useLoadCategories';

function Categories() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);

  const { categories } = useLoadCategories({ setIsLoading, setIsFound });

  const recordList: RecordList = {
    title: 'Categories ',
    url: 'categories',
    fields: [{ key: 'Name', value: 'name' }],
    values: categories,
  };

  return (
    <InnerLayout>
      <List recordList={recordList} isLoading={isLoading} isFound={isFound} />
    </InnerLayout>
  );
}

export default Categories;

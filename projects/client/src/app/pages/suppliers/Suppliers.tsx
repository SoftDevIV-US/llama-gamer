import { useState } from 'react';

import List from '@/app/components/list/List';
import InnerLayout from '@/app/layouts/InnerLayout';

import useLoadSuppliers from './hooks/useLoadSupplier';

function Suppliers() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);

  const { suppliers } = useLoadSuppliers({ setIsLoading, setIsFound });

  const recordList: RecordList = {
    title: 'Suppliers ',
    url: 'suppliers',
    fields: [
      { key: 'Email', value: 'email' },
      { key: 'Delivery Time', value: 'deliveryTime', decorator: ' days' },
      { key: 'Country', value: 'country', moreValue: 'name' },
    ],
    values: suppliers,
  };
  return (
    <InnerLayout>
      <List recordList={recordList} isLoading={isLoading} isFound={isFound} />
    </InnerLayout>
  );
}

export default Suppliers;

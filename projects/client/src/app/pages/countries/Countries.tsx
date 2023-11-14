import { useState } from 'react';

import List from '@/app/components/list/List';
import InnerLayout from '@/app/layouts/InnerLayout';

import useLoadCountries from './hooks/useLoadCountries';

function Countries() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);

  const { countries } = useLoadCountries({ setIsLoading, setIsFound });

  const recordList: RecordList = {
    title: 'Countries',
    url: 'countries',
    fields: [
      { key: 'Name', value: 'name', isUnderline: true },
      { key: 'Tax', value: 'tax', decorator: '%' },
    ],
    values: countries,
  };

  return (
    <InnerLayout>
      <List recordList={recordList} isLoading={isLoading} isFound={isFound} />
    </InnerLayout>
  );
}

export default Countries;

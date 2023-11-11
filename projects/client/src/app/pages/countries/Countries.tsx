import { useState } from 'react';

import List from '@/app/components/list/List';

import useCountries from './hooks/useLoadCountries';

function Countries() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { countries } = useCountries({ setIsLoading });

  const recordList: RecordList = {
    title: 'Countries',
    url: 'countries',
    fields: [
      { key: 'Name', value: 'name', isInfo: true },
      { key: 'Tax', value: 'tax', decorator: '%' },
    ],
    values: countries,
  };

  return <List recordList={recordList} isLoading={isLoading} />;
}

export default Countries;

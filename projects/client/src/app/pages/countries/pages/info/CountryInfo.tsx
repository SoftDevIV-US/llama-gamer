import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Field from '@/app/components/field/Field';
import Form from '@/app/components/form/Form';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';

import useLoadCountryInfo from './hooks/useLoadCountryInfo';

function CountryInfo() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);

  const { country } = useLoadCountryInfo({ setIsFound, setIsLoading, id: String(id) });

  return (
    <Form title='Country'>
      <section className='flex h-full flex-col gap-4 overflow-y-scroll px-0 lg:gap-10 lg:px-16 landscape:py-4 landscape:md:py-10'>
        {isLoading ? (
          <div className='grid h-full place-content-center py-5'>
            <Loading />
          </div>
        ) : isFound ? (
          <>
            <Field title='ID'>{country.id}</Field>
            <Field title='Name'>{country.name}</Field>
            <Field title='Tax'>{country.tax}%</Field>
            <Field title='Created At'>{country.createdAt.toString().substring(0, 10)}</Field>
            <Field title='Updated At'>{country.updatedAt.toString().substring(0, 10)}</Field>
          </>
        ) : (
          <NotFound>Country</NotFound>
        )}
      </section>
    </Form>
  );
}

export default CountryInfo;

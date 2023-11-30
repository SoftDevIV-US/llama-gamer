import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Field from '@/app/components/field/Field';
import Form from '@/app/components/form/Form';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';
import InnerLayout from '@/app/layouts/InnerLayout';

import useLoadBrandInfo from './hooks/useLoadBrandInfo';

function BrandInfo() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);

  const { brand } = useLoadBrandInfo({ setIsFound, setIsLoading, id: String(id) });

  return (
    <InnerLayout>
      <Form title='Brand'>
        <section className='flex h-full flex-col gap-4 overflow-y-scroll px-0 lg:gap-10 lg:px-16 landscape:py-4 landscape:md:py-10'>
          {isLoading ? (
            <div className='grid h-full place-content-center py-5'>
              <Loading />
            </div>
          ) : isFound ? (
            <>
              <Field title='ID'>{brand.id}</Field>
              <Field title='Name'>{brand.name}</Field>
              <Field title='Logo'>
                <div className='flex items-center justify-center'>
                  <img className='h-auto max-w-full' src={brand.logo} alt={`Logo of ${brand.name}`} />
                </div>
              </Field>
              <Field title='Created At'>{brand.createdAt.toString().substring(0, 10)}</Field>
              <Field title='Updated At'>{brand.updatedAt.toString().substring(0, 10)}</Field>
            </>
          ) : (
            <NotFound>Brand</NotFound>
          )}
        </section>
      </Form>
    </InnerLayout>
  );
}

export default BrandInfo;

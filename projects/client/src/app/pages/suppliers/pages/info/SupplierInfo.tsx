import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Field from '@/app/components/field/Field';
import Form from '@/app/components/form/Form';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';
import InnerLayout from '@/app/layouts/InnerLayout';

import useLoadSupplierInfo from './hooks/useLoadSupplierInfo';

function SupplierInfo() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);

  const { supplier } = useLoadSupplierInfo({ setIsFound, setIsLoading, id: String(id) });

  return (
    <InnerLayout>
      <Form title='Supplier'>
        <section className='flex h-full flex-col gap-4 overflow-y-scroll px-0 lg:gap-6 lg:px-16 landscape:py-4 landscape:md:py-8'>
          {isLoading ? (
            <div className='grid h-full place-content-center py-5'>
              <Loading />
            </div>
          ) : isFound ? (
            <>
              <Field title='ID'>{supplier.id}</Field>
              <Field title='Email'>{supplier.email}</Field>
              <Field title='Delivery Time'>{supplier.deliveryTime} days</Field>
              <Field title='Country'>{supplier.country.name}</Field>
              <Field title='Created At'>{supplier.createdAt.toString().substring(0, 10)}</Field>
              <Field title='Updated At'>{supplier.updatedAt.toString().substring(0, 10)}</Field>
            </>
          ) : (
            <NotFound>Supplier</NotFound>
          )}
        </section>
      </Form>
    </InnerLayout>
  );
}

export default SupplierInfo;

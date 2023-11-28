import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Field from '@/app/components/field/Field';
import Form from '@/app/components/form/Form';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';
import InnerLayout from '@/app/layouts/InnerLayout';

import useLoadCategoryInfo from './hooks/useLoadCategoryInfo';

function CategoryInfo() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(false);

  const { category } = useLoadCategoryInfo({ setIsFound, setIsLoading, id: String(id) });

  return (
    <InnerLayout>
      <Form title='Category'>
        <section className='flex h-full flex-col gap-4 overflow-y-scroll px-0 lg:gap-10 lg:px-16 landscape:py-4 landscape:md:py-10'>
          {isLoading ? (
            <div className='grid h-full place-content-center py-5'>
              <Loading />
            </div>
          ) : isFound ? (
            <>
              <Field title='ID'>{category.id}</Field>
              <Field title='Name'>{category.name}</Field>
              <Field title='Image'>
                <img src={category.image} alt={category.name} />
              </Field>
              <Field title='Created At'>{category.createdAt.toString().substring(0, 10)}</Field>
              <Field title='Updated At'>{category.updatedAt.toString().substring(0, 10)}</Field>
            </>
          ) : (
            <NotFound>Category</NotFound>
          )}
        </section>
      </Form>
    </InnerLayout>
  );
}

export default CategoryInfo;

import EditIcon from '@mui/icons-material/Edit';
import { Form as FormFormik, Formik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputField from '@/app/components/input-field/InputField';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';
import InnerLayout from '@/app/layouts/InnerLayout';
import { UpdateSupplierDto } from '@/models/supplier.model';

import useEditSupplier from './hooks/useEditSupplier';

function EditSupplier() {
  const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(true);
  const [isDeliveryTimeCorrect, setIsDeliveryTimeCorrect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  const { editSupplier, supplier } = useEditSupplier({
    id: String(id),
    setIsEmailCorrect,
    setIsDeliveryTimeCorrect,
    setIsLoading,
    setFound,
  });

  return (
    <InnerLayout>
      <Form title='Supplier'>
        <div className='h-full overflow-y-scroll'>
          {isLoading ? (
            <div className='grid h-full place-content-center py-5'>
              <Loading />
            </div>
          ) : found ? (
            <Formik
              initialValues={
                {
                  email: supplier.email,
                  deliveryTime: supplier.deliveryTime,
                } as UpdateSupplierDto
              }
              onSubmit={(values) => {
                editSupplier(values);
              }}
              enableReinitialize
            >
              <FormFormik className='flex h-full flex-col px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-20 landscape:md:py-20'>
                <div className='flex grow flex-col gap-10 font-normal lg:gap-20'>
                  <InputField
                    id='email'
                    value='email'
                    placeholder='Email of the supplier...'
                    isCorrect={isEmailCorrect}
                  >
                    Email
                  </InputField>

                  <InputField
                    id='delivery time'
                    value='delivery time'
                    placeholder='Delivery time of the supplier...'
                    type='number'
                    isCorrect={isDeliveryTimeCorrect}
                  >
                    Delivery Time
                  </InputField>
                </div>
                <div className='flex justify-center py-6'>
                  <Button
                    className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white'
                    isSubmit
                  >
                    <EditIcon />
                    <p className='text-xl'>Edit</p>
                  </Button>
                </div>
              </FormFormik>
            </Formik>
          ) : (
            <NotFound>Supplier</NotFound>
          )}
        </div>
      </Form>
    </InnerLayout>
  );
}

export default EditSupplier;

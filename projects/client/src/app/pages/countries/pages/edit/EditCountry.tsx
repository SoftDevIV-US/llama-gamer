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
import { UpdateCountryDto } from '@/models/country.model';

import useEditCountry from './hooks/useEditCountry';

function EditCountry() {
  const [isNameCorrect, setIsNameCorrect] = useState<boolean>(true);
  const [isTaxCorrect, setIsTaxCorrect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  const { editCountry, country } = useEditCountry({
    id: String(id),
    setIsNameCorrect,
    setIsTaxCorrect,
    setIsLoading,
    setFound,
  });

  return (
    <InnerLayout>
      <Form title='Country'>
        <div className='h-full overflow-y-scroll'>
          {isLoading ? (
            <div className='grid h-full place-content-center py-5'>
              <Loading />
            </div>
          ) : found ? (
            <Formik
              initialValues={
                {
                  name: country.name,
                  tax: country.tax,
                } as UpdateCountryDto
              }
              onSubmit={(values) => {
                if (!values.tax || !values.name) return;
                const newValues = {
                  ...values,
                  tax: Number(parseFloat(String(values.tax)).toFixed(2)),
                };
                editCountry(newValues);
              }}
              enableReinitialize
            >
              <FormFormik className='flex h-full flex-col px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-20 landscape:md:py-20'>
                <div className='flex grow flex-col gap-10 font-normal lg:gap-20'>
                  <InputField id='name' value='name' placeholder='Name of the country...' isCorrect={isNameCorrect}>
                    Name
                  </InputField>

                  <InputField
                    id='tax'
                    value='tax'
                    placeholder='Tax for the country...'
                    type='number'
                    isCorrect={isTaxCorrect}
                  >
                    Tax
                  </InputField>
                </div>
                <div className='flex justify-center py-6'>
                  <Button
                    className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white'
                    isSubmit
                  >
                    <EditIcon />
                    <p className='text-xl'>Save</p>
                  </Button>
                </div>
              </FormFormik>
            </Formik>
          ) : (
            <NotFound>Country</NotFound>
          )}
        </div>
      </Form>
    </InnerLayout>
  );
}

export default EditCountry;

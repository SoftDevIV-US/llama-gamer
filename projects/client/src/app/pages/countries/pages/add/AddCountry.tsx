import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form as FormFormik, Formik } from 'formik';
import { useState } from 'react';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputField from '@/app/components/input-field/InputField';
import InnerLayout from '@/app/layouts/InnerLayout';
import { CreateCountryDto } from '@/models/country.model';

import useAddCountry from './hooks/useAddCountry';

function AddCountry() {
  const [isNameCorrect, setIsNameCorrect] = useState(true);
  const [isTaxCorrect, setIsTaxCorrect] = useState(true);

  const { addCountry } = useAddCountry({ setIsNameCorrect, setIsTaxCorrect });

  return (
    <InnerLayout>
      <Form title='Country'>
        <Formik
          initialValues={
            {
              name: '',
              tax: 0,
            } as CreateCountryDto
          }
          onSubmit={(values) => {
            addCountry(values);
          }}
        >
          <FormFormik className='flex h-full flex-col overflow-y-scroll px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-20 landscape:md:py-20'>
            <div className='flex grow flex-col gap-10  font-normal lg:gap-20'>
              <InputField id='name' value='name' placeholder='Name of the country...' isCorrect={isNameCorrect}>
                Name
              </InputField>

              <InputField
                id='tax'
                value='tax'
                placeholder='Tax for the country...'
                isCorrect={isTaxCorrect}
                type='number'
              >
                Tax
              </InputField>
            </div>
            <div className='flex justify-center py-6'>
              <Button className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white' isSubmit>
                <AddCircleOutlineIcon />
                <p className='text-xl'>Add</p>
              </Button>
            </div>
          </FormFormik>
        </Formik>
      </Form>
    </InnerLayout>
  );
}

export default AddCountry;

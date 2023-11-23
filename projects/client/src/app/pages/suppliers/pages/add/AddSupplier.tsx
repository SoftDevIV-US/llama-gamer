import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form as FormFormik, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputField from '@/app/components/input-field/InputField';
import InputFieldDropdown from '@/app/components/input-field-drop-down/InputFieldDropDown';
import InnerLayout from '@/app/layouts/InnerLayout';
import { Country } from '@/models/country.model';
import { CreateSupplierDto } from '@/models/supplier.model';
import { getAllCountries } from '@/services/country.service';

import useAddSupplier from './hooks/useAddSupplier';

type DropdownOption = { id: string; name: string } | Country;

function AddSupplier() {
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isDeliveryTimeCorrect, setIsDeliveryTimeCorrect] = useState(true);
  const [isCountryCorrect, setIsCountryCorrect] = useState(true);

  const { addSupplier } = useAddSupplier({ setIsEmailCorrect, setIsDeliveryTimeCorrect, setIsCountryCorrect });
  const [countryList, setCountryList] = useState<DropdownOption[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getAllCountries();
        setCountryList([{ id: '', name: 'Select a country...' }, ...countries]);
      } catch (error) {
        throw new Error('Error while loading countries');
      }
    };

    fetchCountries();
  }, []);

  return (
    <InnerLayout>
      <Form title='Supplier'>
        <Formik
          initialValues={{
            email: '',
            deliveryTime: 0,
            countryId: '',
          }}
          onSubmit={(values) => {
            if (!values.countryId || values.countryId === '') {
              setIsCountryCorrect(false);
              toast.error('Please select a country from the list');
              return;
            }

            const newValues: CreateSupplierDto = {
              email: values.email,
              deliveryTime: values.deliveryTime,
              countryId: values.countryId,
            };

            setIsCountryCorrect(true);
            setIsEmailCorrect(true);
            setIsDeliveryTimeCorrect(true);
            addSupplier(newValues);
          }}
        >
          {(formikProps: FormikProps<{ email: string; deliveryTime: number; countryId: string }>) => (
            <FormFormik className='flex h-full flex-col overflow-y-scroll px-0 py-12 lg:px-16 landscape:gap-3 landscape:py-1 landscape:md:gap-6 landscape:md:py-8'>
              <div className='flex grow flex-col gap-10 font-normal lg:gap-8'>
                <InputField id='email' value='email' placeholder='Email of the supplier...' isCorrect={isEmailCorrect}>
                  Email
                </InputField>

                <InputField
                  id='delivery-time'
                  value='deliveryTime'
                  placeholder='Delivery time of the supplier...'
                  isCorrect={isDeliveryTimeCorrect}
                  type='number'
                >
                  Delivery Time
                </InputField>

                <InputFieldDropdown
                  id='select-country'
                  name='Countries'
                  options={countryList.map((option) => ({ id: option.id as string, name: option.name }))}
                  isCorrect={isCountryCorrect}
                  onChange={(e) => {
                    formikProps.setFieldValue('countryId', e.target.value);
                    setIsCountryCorrect(true);
                  }}
                >
                  Country
                </InputFieldDropdown>
              </div>
              <div className='flex justify-center py-2'>
                <Button className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white' isSubmit>
                  <AddCircleOutlineIcon />
                  <p className='text-xl'>Add</p>
                </Button>
              </div>
            </FormFormik>
          )}
        </Formik>
      </Form>
    </InnerLayout>
  );
}

export default AddSupplier;

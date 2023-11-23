import EditIcon from '@mui/icons-material/Edit';
import { Form as FormFormik, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputField from '@/app/components/input-field/InputField';
import InputFieldDropdown from '@/app/components/input-field-drop-down/InputFieldDropDown';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';
import InnerLayout from '@/app/layouts/InnerLayout';
import { Country } from '@/models/country.model';
import { UpdateSupplierDto } from '@/models/supplier.model';
import { getAllCountries } from '@/services/country.service';

import useEditSupplier from './hooks/useEditSupplier';

type DropdownOption = { id: string; name: string } | Country;

function EditSupplier() {
  const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(true);
  const [isDeliveryTimeCorrect, setIsDeliveryTimeCorrect] = useState<boolean>(true);
  const [isCountryCorrect, setIsCountryCorrect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(true);
  const [countryList, setCountryList] = useState<DropdownOption[]>([]);
  const { id } = useParams<{ id: string }>();

  const { editSupplier, supplier } = useEditSupplier({
    id: String(id),
    setIsEmailCorrect,
    setIsDeliveryTimeCorrect,
    setIsCountryCorrect,
    setIsLoading,
    setFound,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getAllCountries();
        setCountryList([{ id: '', name: 'Select a country...' }, ...countries]);
      } catch (error) {
        throw new Error('Error while loading countries');
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchCountries();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
              initialValues={{
                email: supplier.email,
                deliveryTime: supplier.deliveryTime,
                countryId: supplier.countryId,
              }}
              onSubmit={(values) => {
                const newValues: UpdateSupplierDto = {};

                if (values.email !== '') newValues.email = values.email;
                if (values.deliveryTime !== 0) newValues.deliveryTime = values.deliveryTime;
                if (values.countryId !== '') newValues.countryId = values.countryId;

                setIsCountryCorrect(true);
                setIsEmailCorrect(true);
                setIsDeliveryTimeCorrect(true);
                editSupplier(newValues);
              }}
              enableReinitialize
            >
              {(formikProps: FormikProps<{ email: string; deliveryTime: number; countryId: string }>) => (
                <FormFormik className='flex h-full flex-col px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-8 landscape:md:py-8'>
                  <div className='flex grow flex-col gap-10 font-normal lg:gap-8'>
                    <InputField
                      id='email'
                      value='email'
                      placeholder='Email of the supplier...'
                      isCorrect={isEmailCorrect}
                    >
                      Email
                    </InputField>

                    <InputField
                      id='delivery-time'
                      value='deliveryTime'
                      placeholder='Delivery time of the supplier...'
                      type='number'
                      isCorrect={isDeliveryTimeCorrect}
                    >
                      Delivery Time
                    </InputField>

                    <InputFieldDropdown
                      id='select-country'
                      name='Countries'
                      value={supplier.countryId}
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
              )}
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

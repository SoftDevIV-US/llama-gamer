import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Form as FormFormik, Formik } from 'formik';
import { useState } from 'react';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputField from '@/app/components/input-field/InputField';
import InputImage from '@/app/components/input-image/InputImage';
import InnerLayout from '@/app/layouts/InnerLayout';
import { CreateBrandDto } from '@/models/product.model';

import useAddBrand from './hooks/useAddBrand';

function AddBrand() {
  const [isNameCorrect, setIsNameCorrect] = useState(true);
  const [isLogoCorrect, setIsLogoCorrect] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { addBrand } = useAddBrand({ setIsNameCorrect, setIsLogoCorrect });

  const handleImageUpload = async (values: CreateBrandDto) => {
    const NAME_VALIDATOR = /^[a-zA-Z\s]+$/;
    const maxLength = 15;
    const minLength = 2;

    try {
      setIsLoading(true);

      if (!selectedFile) {
        return;
      }
      if (values.name.length > maxLength || values.name.length < minLength || !NAME_VALIDATOR.test(values.name)) {
        const err = '';
        const newValues = { ...values, logo: err };
        addBrand(newValues);
      } else {
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('upload_preset', 'brandcloud');
        data.append('cloud_name', 'dvsg7obzt');

        const response = await axios.post('https://api.cloudinary.com/v1_1/dvsg7obzt/image/upload', data);

        if (response.status !== 200) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const logoUrl = response.data.secure_url;

        const newValues = { ...values, logo: logoUrl };
        addBrand(newValues);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <InnerLayout>
      <Form title='Brand'>
        <Formik initialValues={{ name: '', logo: '' } as CreateBrandDto} onSubmit={handleImageUpload}>
          <FormFormik className='flex h-full flex-col overflow-y-scroll px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-20 landscape:md:py-20'>
            <div className='flex grow flex-col gap-10  font-normal lg:gap-20'>
              <InputField id='name' value='name' placeholder='Name of the brand...' isCorrect={isNameCorrect}>
                Name
              </InputField>

              <InputImage
                id='logo'
                value='logo'
                isCorrect={isLogoCorrect}
                requiredSize='256'
                onChange={(file) => setSelectedFile(file)}
              >
                Logo
              </InputImage>
            </div>
            <div className='flex justify-center py-6'>
              <Button
                className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white'
                isSubmit
                isLoading={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  <>
                    <AddCircleOutlineIcon />
                    <p className='text-xl'>Add</p>
                  </>
                )}
              </Button>
            </div>
          </FormFormik>
        </Formik>
      </Form>
    </InnerLayout>
  );
}

export default AddBrand;

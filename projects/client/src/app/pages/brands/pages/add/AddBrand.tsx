import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form as FormFormik, Formik } from 'formik';
import { useState } from 'react';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputField from '@/app/components/input-field/InputField';
import InputImage from '@/app/components/input-image/InputImage';
import InnerLayout from '@/app/layouts/InnerLayout';
import { CreateBrandDto } from '@/models/brand.model';

import useAddBrand from './hooks/useAddBrand';

function AddBrand() {
  const [isNameCorrect, setIsNameCorrect] = useState(true);
  const [isLogoCorrect, setIsLogoCorrect] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addBrand } = useAddBrand({ setIsNameCorrect, setIsLogoCorrect });
  return (
    <InnerLayout>
      <Form title='Brand'>
        <Formik
          initialValues={
            {
              name: '',
              logo: '',
            } as CreateBrandDto
          }
          onSubmit={async (values) => {
            if (!selectedFile) {
              return;
            }

            const data = new FormData();
            data.append('file', selectedFile);
            data.append('upload_preset', 'brandcloud');
            data.append('cloud_name', 'dvsg7obzt');

            const res = await fetch('https://api.cloudinary.com/v1_1/dvsg7obzt/image/upload', {
              method: 'POST',
              body: data,
            });

            if (!res.ok) {
              throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }

            const file = await res.json();

            const logoUrl = file.secure_url;

            // eslint-disable-next-line no-param-reassign
            values.logo = logoUrl;

            addBrand(values);
          }}
        >
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

export default AddBrand;

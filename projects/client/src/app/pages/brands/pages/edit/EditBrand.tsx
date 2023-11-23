import EditIcon from '@mui/icons-material/Edit';
import { Form as FormFormik, Formik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputField from '@/app/components/input-field/InputField';
import InputImage from '@/app/components/input-image/InputImage';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';
import InnerLayout from '@/app/layouts/InnerLayout';
import { UpdateBrandDto } from '@/models/brand.model';

import useEditBrand from './hooks/useEditBrand';

function EditBrand() {
  const [isNameCorrect, setIsNameCorrect] = useState<boolean>(true);
  const [isLogoCorrect, setIsLogoCorrect] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [found, setFound] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  const { editBrand, brand } = useEditBrand({
    id: String(id),
    setIsNameCorrect,
    setIsLogoCorrect,
    setIsLoading,
    setFound,
  });

  return (
    <InnerLayout>
      <Form title='Brand'>
        <div className='h-full overflow-y-scroll'>
          {isLoading ? (
            <div className='grid h-full place-content-center py-5'>
              <Loading />
            </div>
          ) : found ? (
            <Formik
              initialValues={
                {
                  name: brand.name,
                  logo: brand.logo,
                } as UpdateBrandDto
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

                editBrand(values);
              }}
              enableReinitialize
            >
              <FormFormik className='flex h-full flex-col px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-20 landscape:md:py-20'>
                <div className='flex grow flex-col gap-10 font-normal lg:gap-20'>
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
                  >
                    <EditIcon />
                    <p className='text-xl'>Edit</p>
                  </Button>
                </div>
              </FormFormik>
            </Formik>
          ) : (
            <NotFound>Brand</NotFound>
          )}
        </div>
      </Form>
    </InnerLayout>
  );
}

export default EditBrand;

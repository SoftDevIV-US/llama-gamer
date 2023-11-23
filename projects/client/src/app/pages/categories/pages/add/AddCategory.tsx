import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { Form as FormFormik, Formik } from 'formik';
import { useState } from 'react';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import ImageField from '@/app/components/image-field/ImageField';
import InputField from '@/app/components/input-field/InputField';
import { CreateCategoryDto } from '@/models/category.model';

import useAddCategory from './hooks/useAddCategory';

function AddCategory() {
  const [isNameCorrect, setIsNameCorrect] = useState(true);
  const [, setIsImageCorrect] = useState(true);
  const [imageFormData, setImageFormData] = useState<FormData | null>(null);

  const { addCategory } = useAddCategory({ setIsNameCorrect, setIsImageCorrect });

  return (
    <Form title='Category'>
      <Formik
        initialValues={
          {
            name: '',
            image: '',
          } as CreateCategoryDto
        }
        onSubmit={async (values) => {
          if (imageFormData) {
            try {
              const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dtywqmn9a/image/upload',
                imageFormData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                  params: {
                    api_key: '627656454763436',
                    api_secret: '_ETJ5Oj_Jm0S6BIpRh5fpHp8QJc',
                    upload_preset: 'bmuxr2rx',
                  },
                }
              );

              const imageUrl: string = response.data.secure_url;

              const createCategory = {
                name: values.name,
                image: imageUrl,
              } as CreateCategoryDto;

              addCategory(createCategory);

              setImageFormData(null);
            } catch (error: any) {
              throw new Error(error);
            }
          }
        }}
      >
        <FormFormik className='flex h-full flex-col overflow-y-scroll px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-20 landscape:md:py-20'>
          <div className='flex grow flex-col gap-10  font-normal lg:gap-20'>
            <InputField id='name' value='name' placeholder='Name of the category...' isCorrect={isNameCorrect}>
              Name
            </InputField>

            <ImageField
              id='logo'
              value='logo'
              placeholder='Logo for the brand...'
              size='medium'
              onFormDataChange={(formData) => setImageFormData(formData)}
            >
              Image
            </ImageField>
          </div>
          <div className='flex justify-center py-6'>
            <Button className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white' isSubmit>
              <AddCircleOutlineIcon />
              <p className='text-xl'>Add Category</p>
            </Button>
          </div>
        </FormFormik>
      </Formik>
    </Form>
  );
}

export default AddCategory;

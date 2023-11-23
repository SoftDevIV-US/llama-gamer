import EditIcon from '@mui/icons-material/Edit';
import { Form as FormFormik, Formik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputField from '@/app/components/input-field/InputField';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';
import { UpdateCategoryDto } from '@/models/category.model';

import useEditCategory from './hooks/useEditCategory';

function EditCategory() {
  const [isNameCorrect, setIsNameCorrect] = useState<boolean>(true);
  const [isImageCorrect, setIsImageCorrect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  const { editCategory, category } = useEditCategory({
    id: String(id),
    setIsNameCorrect,
    setIsImageCorrect,
    setIsLoading,
    setFound,
  });

  return (
    <Form title='Category'>
      <div className='h-full overflow-y-scroll'>
        {isLoading ? (
          <div className='grid h-full place-content-center py-5'>
            <Loading />
          </div>
        ) : found ? (
          <Formik
            initialValues={
              {
                name: category.name,
                image: category.image,
              } as UpdateCategoryDto
            }
            onSubmit={(values) => {
              editCategory(values);
            }}
            enableReinitialize
          >
            <FormFormik className='flex h-full flex-col px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-20 landscape:md:py-20'>
              <div className='flex grow flex-col gap-10 font-normal lg:gap-20'>
                <InputField id='name' value='name' placeholder='Name of the category...' isCorrect={isNameCorrect}>
                  Name
                </InputField>

                <InputField
                  id='image'
                  value='image'
                  placeholder='Image for the category...'
                  type='string'
                  isCorrect={isImageCorrect}
                >
                  <img src={category.image} alt={category.name} />
                  Image
                </InputField>
              </div>
              <div className='flex justify-center py-6'>
                <Button className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white' isSubmit>
                  <EditIcon />
                  <p className='text-xl'>Edit Category</p>
                </Button>
              </div>
            </FormFormik>
          </Formik>
        ) : (
          <NotFound>Category</NotFound>
        )}
      </div>
    </Form>
  );
}

export default EditCategory;

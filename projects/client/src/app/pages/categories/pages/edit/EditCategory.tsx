import { useParams } from 'react-router-dom';

import InnerLayout from '@/app/layouts/InnerLayout';

function EditCategory() {
  const { id } = useParams<{ id: string }>();

  return (
    <InnerLayout>
      <div className='grid h-full w-full place-content-center'>
        <h1 className='text-3xl font-bold'>Edit Category ID: {id}</h1>
      </div>
    </InnerLayout>
  );
}

export default EditCategory;

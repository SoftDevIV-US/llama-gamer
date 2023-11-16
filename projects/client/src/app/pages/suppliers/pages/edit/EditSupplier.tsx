import { useParams } from 'react-router-dom';

import InnerLayout from '@/app/layouts/InnerLayout';

function EditSupplier() {
  const { id } = useParams<{ id: string }>();

  return (
    <InnerLayout>
      <div className='grid h-full place-content-center'>
        <h2 className='text-2xl font-bold'>Edit Supplier ID: {id}</h2>
      </div>
    </InnerLayout>
  );
}

export default EditSupplier;

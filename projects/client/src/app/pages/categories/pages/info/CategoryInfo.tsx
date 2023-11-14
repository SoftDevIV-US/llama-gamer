import { useParams } from 'react-router-dom';

import InnerLayout from '@/app/layouts/InnerLayout';

function CategoryInfo() {
  const { id } = useParams<{ id: string }>();

  return (
    <InnerLayout>
      <div className='grid h-full w-full place-content-center'>
        <h1 className='text-3xl font-bold'>Category Info ID: {id}</h1>
      </div>
    </InnerLayout>
  );
}

export default CategoryInfo;

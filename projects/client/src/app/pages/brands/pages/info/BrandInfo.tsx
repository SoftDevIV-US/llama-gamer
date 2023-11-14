import { useParams } from 'react-router-dom';

function BrandInfo() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className='grid h-full place-content-center'>
      <h2 className='text-2xl font-bold'>Brand Info ID: {id}</h2>
    </div>
  );
}

export default BrandInfo;

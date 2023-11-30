import { useParams } from 'react-router-dom';

type Params = {
  id: string;
};

function UserCategory() {
  const { id } = useParams<Params>();

  return (
    <div className='grid h-screen w-full place-content-center '>
      <h1 className='text-3xl font-bold'>Category: {id}</h1>
    </div>
  );
}

export default UserCategory;

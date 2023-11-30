import { useParams } from 'react-router-dom';

type Params = {
  id: string;
};

function UserProduct() {
  const { id } = useParams<Params>();

  return (
    <div className='grid h-screen w-full place-content-center '>
      <h1 className='text-3xl font-bold'>Product: {id}</h1>
    </div>
  );
}

export default UserProduct;

import { useParams } from 'react-router-dom';

function EditCountry() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className='grid h-full place-content-center text-5xl font-bold'>
      <h1>Edit Country {id}</h1>
    </div>
  );
}

export default EditCountry;

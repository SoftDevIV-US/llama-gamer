import { useParams } from 'react-router-dom';

function CountryInfo() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className='grid h-full place-content-center text-5xl font-bold'>
      <h1>Country: {id}</h1>
    </div>
  );
}

export default CountryInfo;

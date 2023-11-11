import Button from '@/app/components/button/Button';
import useNavigate from '@/app/hooks/useNavigate';

function AddCountry() {
  const { navigate } = useNavigate();

  return (
    <div className='grid h-full place-content-center text-5xl font-bold'>
      <Button onClick={() => navigate(-1)} className='rounded-lg bg-white p-4'>
        Go Back
      </Button>
      <h1>Add Country</h1>
    </div>
  );
}

export default AddCountry;

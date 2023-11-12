import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Button from '@/app/components/button/Button';
import Line from '@/app/components/line/Line';
import useNavigate from '@/app/hooks/useNavigate';

type Props = {
  title: string;
  children: React.ReactNode;
};

function Form({ title, children }: Props) {
  const { navigate } = useNavigate();

  return (
    <section className='flex h-full max-h-full w-full flex-col gap-4 rounded-3xl border-2 border-black p-4 font-bold'>
      <div className='flex justify-between px-3'>
        <h1 className='text-3xl text-[#0D1B2A]/70'>{title}</h1>
        <Button onClick={() => navigate(-1)} className='rounded-full bg-[#223343] px-[6px] py-1'>
          <KeyboardBackspaceIcon className='text-white' />
        </Button>
      </div>
      <Line />
      {children}
    </section>
  );
}

export default Form;

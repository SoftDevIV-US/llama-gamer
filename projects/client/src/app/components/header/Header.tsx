import PersonIcon from '@mui/icons-material/Person';

import useNavigate from '@/app/hooks/useNavigate';

import Button from '../button/Button';
import logo from './assets/llama-logo.png';

function Header() {
  const { navigate } = useNavigate();

  return (
    <header className='w-full bg-[#ffffff] py-2 shadow-md  lg:py-4'>
      <div className='mx-auto flex w-full place-items-center justify-between px-4 text-center lg:max-w-7xl lg:px-6'>
        <Button
          onClick={() => {
            navigate('/admin');
          }}
        >
          <img src={logo} alt='Llama Logo' className='h-[90px]' />
        </Button>
        <div className='flex place-items-center gap-5'>
          <Button className='pr-2 text-4xl lg:p-0 lg:text-2xl'>
            <PersonIcon fontSize='inherit' />
          </Button>
          <h3 className='hidden text-lg font-bold lg:block'>admin@admin.com</h3>
        </div>
      </div>
    </header>
  );
}

export default Header;

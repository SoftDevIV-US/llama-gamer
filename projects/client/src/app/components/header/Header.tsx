import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';

import useNavigate from '@/app/hooks/useNavigate';
import useAuthStore from '@/store/auth.store';

import Button from '../button/Button';
import logo from './assets/llama-logo.png';

function Header() {
  const { navigate } = useNavigate();
  const { auth, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          {auth ? (
            <>
              <div>
                <Button
                  className='pr-2 text-4xl lg:p-0 lg:text-2xl'
                  onClick={() => {
                    setIsOpen((open) => !open);
                  }}
                >
                  <PersonIcon fontSize='inherit' />
                </Button>
                {isOpen && (
                  <div className='fixed mt-2 rounded-xl border border-black bg-white px-6 py-3 '>
                    <Button
                      onClick={() => {
                        if (auth.user.role === 'ADMIN') navigate('/');
                        logout();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
              <h3 className='hidden text-lg font-bold lg:block'>{auth?.user?.email}</h3>
            </>
          ) : (
            <Button
              onClick={() => {
                navigate('/login');
              }}
              className='w-full rounded-lg bg-[#007AFF] px-6 py-2 font-bold text-white'
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

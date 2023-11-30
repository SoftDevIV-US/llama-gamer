import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

import useNavigate from '@/app/hooks/useNavigate';
import useAuthStore from '@/store/auth.store';

import Button from '../button/Button';
import logo from './assets/llama-logo.png';

function Header() {
  const { navigate } = useNavigate();
  const { auth, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <header className='sticky top-0 z-10 flex  bg-[#ffffff] py-2 shadow-md lg:py-4'>
      <div className='mx-auto flex w-full place-items-center justify-between px-4 text-center lg:max-w-7xl lg:gap-12 lg:px-6'>
        <Button
          onClick={() => {
            navigate('/admin');
          }}
          className='block'
        >
          <img src={logo} alt='Llama Logo' className='max-w-[90px] md:max-w-[148px] lg:min-w-[176px]' />
        </Button>
        {(!auth || auth?.user.role !== 'ADMIN') && (
          <div className='flex w-full justify-center px-5 md:max-w-xl'>
            <div className='flex w-full rounded-3xl border-[2px] border-[#3a4d5e] bg-[#3a4d5e] lg:border-[3px]'>
              <input
                className='w-full grow rounded-l-3xl bg-white py-1 pl-2 pr-1 text-[10px] outline-none lg:pl-5 lg:pr-2 lg:text-base'
                placeholder='Search for products...'
                value={input}
                onChange={handleOnChange}
              />
              <Button
                className='rounded-r-3xl px-2 text-[10px] text-white lg:px-3 lg:text-2xl'
                onClick={() => {
                  setInput('');
                }}
              >
                <SearchIcon fontSize='inherit' />
              </Button>
            </div>
          </div>
        )}
        <div className='flex place-items-center gap-2 lg:gap-5'>
          {auth ? (
            <>
              <div className='relative'>
                <Button
                  className='text-xl text-[#586a84] lg:text-3xl'
                  onClick={() => {
                    setIsOpen((open) => !open);
                  }}
                >
                  <PersonIcon fontSize='inherit' />
                </Button>
                {isOpen && (
                  <div className='absolute right-0 mt-2 rounded-xl border border-[#586a84] bg-white px-6 py-3 text-[#586a84] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.4)] lg:right-auto'>
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
              <h3 className='hidden text-lg font-bold text-[#586a84] lg:block'>{auth?.user?.email}</h3>
            </>
          ) : (
            <Button
              onClick={() => {
                navigate('/login');
              }}
              className='w-full rounded-lg bg-[#586a84] px-4 py-2 text-xs font-bold text-white lg:px-6 lg:text-base'
            >
              Login
            </Button>
          )}
          {auth?.user.role === 'USER' && (
            <Button
              onClick={() => {
                navigate('/cart');
              }}
              className='w-full rounded-lg text-lg font-bold text-[#586a84] lg:text-2xl'
            >
              <LocalMallIcon fontSize='inherit' />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

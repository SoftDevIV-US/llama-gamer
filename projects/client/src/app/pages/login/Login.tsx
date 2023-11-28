import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

import Button from '@/app/components/button/Button';
import useNavigate from '@/app/hooks/useNavigate';
import useAuthStore from '@/store/auth.store';

import backgroundImage from './assets/background.webp';
import hideIcon from './assets/hide.svg';
import logoIcon from './assets/logo.webp';
import useLogin from './hooks/useLogin';

function Login() {
  const [passwordType, setPasswordType] = useState<string>('password');
  const [isError, setIsError] = useState<boolean>(false);

  const { loginUser } = useLogin({ setIsError });
  const { auth } = useAuthStore();
  const { navigate } = useNavigate();

  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  if (auth) {
    if (auth.user.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  }
  return (
    <main
      className='h-full min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <section className='flex h-full min-h-screen w-full flex-col justify-center gap-4 overflow-y-scroll bg-white p-5 md:w-5/12 md:rounded-r-2xl md:p-6 lg:w-1/3 lg:p-12'>
        <Button className='hidden w-full items-center justify-center md:flex' onClick={() => navigate('/')}>
          <img src={logoIcon} alt='The logo of the company' />
        </Button>
        <h1 className='text-center text-[24px] font-bold landscape:hidden'>LLama Gamer</h1>
        <h2 className='text-center text-[14px] md:text-start landscape:text-[20px] landscape:font-bold'>
          Nice to see you again
        </h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            loginUser(values.email, values.password);
          }}
        >
          <Form className=' flex flex-col gap-4 text-[14px] lg:text-[16px]'>
            <label className='flex flex-col gap-2'>
              <span className='ml-4 text-[12px] font-normal text-[#808080]'>Email</span>
              <Field
                type='email'
                name='email'
                placeholder='jose.morales@gmail.com'
                className={`rounded-lg bg-[#f2f2f2] p-4 outline-none ${isError ? 'border-2 border-[#f55b5b]' : ''}`}
                required
              />
            </label>
            <label className='flex flex-col gap-2'>
              <span className='ml-4 text-[12px] font-normal text-[#808080]'>Password</span>
              <div
                className={`flex w-full gap-6 rounded-lg bg-[#f2f2f2] p-5 ${
                  isError ? 'border-2 border-[#f55b5b]' : ''
                }`}
              >
                <Field
                  type={passwordType}
                  name='password'
                  placeholder='••••••••••'
                  className='w-full bg-transparent outline-none'
                  required
                />
                <Button onClick={togglePassword}>
                  <img src={hideIcon} alt='Hide Icon' height={50} />
                </Button>
              </div>
            </label>
            <Button className='mt-5 w-full rounded-lg bg-[#007AFF] py-3 font-bold text-white' isSubmit>
              Login
            </Button>
          </Form>
        </Formik>
      </section>
    </main>
  );
}

export default Login;

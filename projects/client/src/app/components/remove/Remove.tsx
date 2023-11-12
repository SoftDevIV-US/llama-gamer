import React from 'react';

import useNavigate from '@/app/hooks/useNavigate';

import Button from '../button/Button';

type Props = {
  children: React.ReactNode;
  acceptAction(): void;
};

function Remove({ children, acceptAction }: Props) {
  const { navigate } = useNavigate();

  return (
    <section className='grid h-full place-content-center text-center text-lg font-bold lg:text-4xl'>
      <div className='flex flex-col gap-20 rounded-3xl bg-[#223343] px-4 py-6 text-white shadow-xl lg:p-16'>
        <h1>Are you sure to remove this {children}?</h1>
        <div className='flex justify-center gap-10 '>
          <Button
            className='rounded-xl bg-[#f55b5b] px-4 py-2 shadow-xl'
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button
            className='rounded-xl bg-[#79aa7d] px-4 py-2 shadow-xl'
            onClick={() => {
              acceptAction();
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Remove;

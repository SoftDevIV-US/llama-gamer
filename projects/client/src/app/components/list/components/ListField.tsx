import React from 'react';

type Props = {
  children: React.ReactNode;
};

function ListField({ children }: Props) {
  return (
    <li className='text-base text-[#1B263B]/50'>
      <p>{children}</p>
    </li>
  );
}

export default ListField;

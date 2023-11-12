import { Field } from 'formik';
import React from 'react';

const defaultProps = {
  isCorrect: true,
  isDisabled: false,
  type: 'text',
};

type Props = {
  id: string;
  children: React.ReactNode;
  value: string;
  placeholder: string;
  type?: string;
  isCorrect?: boolean;
  isDisabled?: boolean;
};

function InputField({ id, children, value, type, placeholder, isCorrect, isDisabled }: Props) {
  return (
    <label htmlFor={id}>
      <p className='px-4 text-[#1B263B]/50'>{children}</p>
      <Field
        id={id}
        name={value}
        type={type}
        className={`w-full rounded-lg px-5 py-3 outline-none ${isCorrect ? '' : 'border-2 border-[#f55b5b]'}`}
        placeholder={placeholder}
        disabled={isDisabled}
      />
    </label>
  );
}

InputField.defaultProps = defaultProps;

export default InputField;

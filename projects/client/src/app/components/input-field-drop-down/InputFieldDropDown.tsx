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
  type?: string;
  options: { id: string; name: string }[];
  isCorrect?: boolean;
  isDisabled?: boolean;
};

function InputFieldDropdown({ id, children, value, type, options, isCorrect, isDisabled }: Props) {
  return (
    <label htmlFor={id}>
      <p className='px-4 text-[#1B263B]/50'>{children}</p>
      <Field
        id={id}
        name={value}
        type={type}
        as='select'
        className={`w-full rounded-lg px-5 py-3 outline-none ${isCorrect ? '' : 'border-2 border-[#f55b5b]'}`}
        disabled={isDisabled}
        required
      >
        <option disabled className='bg-black/10'>
          {value}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </Field>
    </label>
  );
}

InputFieldDropdown.defaultProps = defaultProps;

export default InputFieldDropdown;

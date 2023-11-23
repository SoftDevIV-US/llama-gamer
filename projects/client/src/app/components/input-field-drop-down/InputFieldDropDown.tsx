import { Field } from 'formik';
import React from 'react';

const defaultProps = {
  isCorrect: true,
  isDisabled: false,
  type: 'text',
  value: '',
};

type Props = {
  id: string;
  name: string;
  value?: string;
  children: React.ReactNode;
  type?: string;
  options: { id: string; name: string }[];
  isCorrect?: boolean;
  isDisabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function InputFieldDropdown({ id, name, value, children, type, options, isCorrect, isDisabled, onChange }: Props) {
  return (
    <label htmlFor={id}>
      <p className='px-4 text-[#1B263B]/50'>{children}</p>
      <Field
        id={id}
        name={name}
        type={type}
        as='select'
        className={`w-full rounded-lg px-5 py-3 outline-none ${isCorrect ? '' : 'border-2 border-[#f55b5b]'}`}
        disabled={isDisabled}
        onChange={onChange}
        required
      >
        <option disabled hidden className='bg-black/10' value=''>
          Select an option...
        </option>
        {options.map((option) =>
          option.id === value ? (
            <option key={option.id} value={option.id} selected>
              {option.name}
            </option>
          ) : (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          )
        )}
      </Field>
    </label>
  );
}

InputFieldDropdown.defaultProps = defaultProps;

export default InputFieldDropdown;

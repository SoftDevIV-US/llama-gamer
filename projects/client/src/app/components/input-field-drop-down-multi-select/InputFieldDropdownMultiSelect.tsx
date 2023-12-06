import CloseIcon from '@mui/icons-material/Close';
import { Field } from 'formik';
import React, { useState } from 'react';

type Option = { id: string; name: string };

const defaultProps = {
  isCorrect: true,
  isDisabled: false,
  type: 'text',
  value: [],
};

type Props = {
  id: string;
  name: string;
  value?: string[];
  children: React.ReactNode;
  type?: string;
  options: Option[];
  isCorrect?: boolean;
  isDisabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function InputFieldDropdownMultiSelect({
  id,
  name,
  value,
  children,
  type,
  options,
  isCorrect,
  isDisabled,
  onChange,
}: Props) {
  const [selectedItems, setSelected] = useState<string[]>([]);

  const addTag = (option: Option) => {
    if (!selectedItems.includes(option.id)) {
      setSelected([...selectedItems, option.id]);
    }
  };

  const removeTag = (selectedItemId: string) => {
    const filtered = selectedItems.filter((item) => item !== selectedItemId);
    setSelected(filtered);
  };

  return (
    <div>
      <label htmlFor={id} className='px-4 text-[#1B263B]/50'>
        {children}
      </label>

      <div className=' mx-auto my-2 flex w-full flex-col rounded border border-gray-200 bg-white p-1'>
        <div className='flex flex-auto flex-wrap'>
          <Field
            as='select'
            id={id}
            value={value}
            name={name}
            type={type}
            aria-labelledby={id}
            className={`h-full w-full appearance-none bg-transparent p-1 px-2 text-gray-800 outline-none ${
              isCorrect ? '' : 'border-2 border-[#f55b5b]'
            }`}
            disabled={isDisabled}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              onChange(e);
              const selectedOption = options.find((option) => option.id === e.target.value);
              if (selectedOption && selectedOption.id !== '-1') {
                addTag(selectedOption);
              } else {
                const isSelected = selectedItems.includes(e.target.value);
                setSelected((prevSelected) =>
                  isSelected ? prevSelected.filter((item) => item !== e.target.value) : prevSelected
                );
              }
            }}
          >
            {options.map(
              (option) =>
                !selectedItems.includes(option.id) && (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                )
            )}
          </Field>
        </div>

        <div className='flex flex-auto flex-wrap'>
          {selectedItems.map((selectedItemId) => {
            const option = options.find((opt) => opt.id === selectedItemId);
            return (
              option && (
                <div
                  key={selectedItemId}
                  className=' m-1 flex flex-wrap items-center justify-center rounded-full border border-teal-300 bg-teal-100 px-2 py-1 font-medium text-teal-700 '
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => e.stopPropagation()}
                  aria-label={option.name}
                >
                  <div className='max-w-full flex-initial font-normal leading-none'>{option.name}</div>
                  <div className='flex flex-auto flex-row-reverse'>
                    <div
                      onClick={() => removeTag(selectedItemId)}
                      role='button'
                      tabIndex={0}
                      onKeyDown={(e) => e.stopPropagation()}
                      aria-label={`Remove ${option.name}`}
                    >
                      <CloseIcon className='cursor-pointer hover:text-teal-400' />
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

InputFieldDropdownMultiSelect.defaultProps = defaultProps;

export default InputFieldDropdownMultiSelect;

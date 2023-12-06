/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';

type Option = { id: string; name: string };

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
  const [dropdown, setDropdown] = useState(false);
  const [selectedItems, setSelected] = useState<string[]>([]);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const addTag = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelected([...selectedItems, item]);
    }
  };

  const removeTag = (item: string) => {
    const filtered = selectedItems.filter((e) => e !== item);
    setSelected(filtered);
  };

  return (
    <div>
      <label htmlFor={id} className='px-4 text-[#1B263B]/50'>
        {children}
      </label>
      <div className='mx-auto flex w-full flex-col items-center'>
        <div className='w-full'>
          <div className='relative flex flex-col items-center'>
            <div className='w-full '>
              <div className='my-2 flex rounded border border-gray-200 bg-white p-1 '>
                <div className='flex flex-auto flex-wrap'>
                  {selectedItems.map((tag) => (
                    <div
                      key={tag}
                      className='m-1 flex items-center justify-center rounded-full border border-teal-300 bg-teal-100 px-2 py-1 font-medium text-teal-700 '
                    >
                      <div className='max-w-full flex-initial font-normal leading-none'>{tag}</div>
                      <div className='flex flex-auto flex-row-reverse'>
                        <div onClick={() => removeTag(tag)} role='button' tabIndex={0}>
                          <CloseIcon className='cursor-pointer hover:text-teal-400' />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='flex-1' onClick={toggleDropdown} role='button' tabIndex={0}>
                    <div className='h-full w-full cursor-pointer appearance-none bg-transparent p-1 px-2 text-gray-800 outline-none'>
                      {selectedItems.length === 0 ? 'Select an option...' : selectedItems.join(', ')}
                    </div>
                  </div>
                </div>
                <div
                  className='flex w-8 items-center border-l border-gray-200 py-1 pl-2 pr-1 text-gray-300'
                  onClick={toggleDropdown}
                  role='button'
                  tabIndex={0}
                >
                  <button className='h-6 w-6 cursor-pointer text-gray-600 outline-none focus:outline-none'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='100%'
                      height='100%'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='feather-chevron-up h-4 w-4'
                    >
                      <polyline points='18 15 12 9 6 15' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {dropdown && (
            <div>
              {options.map((option) => (
                <div
                  key={option.id}
                  className='w-full cursor-pointer rounded-t border-b border-gray-100 hover:bg-teal-100'
                  onClick={() => {
                    addTag(option.name);
                    setDropdown(false);
                  }}
                  role='button'
                  tabIndex={0}
                >
                  <div className='flex items-center border-l-2 border-transparent p-2 hover:border-teal-100'>
                    <div className='flex w-full items-center'>
                      <div className='mx-2 leading-6'>{option.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

InputFieldDropdownMultiSelect.defaultProps = defaultProps;

export default InputFieldDropdownMultiSelect;

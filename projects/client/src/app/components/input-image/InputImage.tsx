import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Field, FieldProps } from 'formik';
import React, { useEffect, useState } from 'react';

const defaultProps = {
  isCorrect: true,
  isDisabled: false,
  onChange: undefined,
};

type Props = {
  id: string;
  children: React.ReactNode;
  value: string;
  isCorrect?: boolean;
  isDisabled?: boolean;
  requiredSize: '256' | '512';
  onChange?: (file: File | null) => void;
};

const validateLogo = async (file: File | null, requiredSize: '256' | '512'): Promise<boolean> =>
  new Promise((resolve) => {
    if (!file) {
      resolve(false);
      return;
    }

    const allowedExtensions = ['png'];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const isValidExtension = allowedExtensions.includes(extension);

    if (!isValidExtension) {
      resolve(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const target = e.target as FileReader;
      const result = target.result as string;

      const img = new Image();

      await new Promise((imgResolve) => {
        img.onload = () => imgResolve(null);
        img.src = result;
      });

      const isValidSizeSmall = requiredSize === '256' && img.width === 256 && img.height === 256;
      const isValidSizeMedium = requiredSize === '512' && img.width === 512 && img.height === 512;

      resolve(isValidSizeSmall || isValidSizeMedium);
    };

    reader.readAsDataURL(file);
  });

function InputImage({ id, children, value, isCorrect, isDisabled, requiredSize, onChange }: Props) {
  const [logoCorrect, setLogoCorrect] = useState<boolean | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (logoCorrect === false) {
      setPreview(null);
    }
  }, [logoCorrect]);

  const handleFileChange = async (file: File | null, form: any) => {
    const isValid = await validateLogo(file, requiredSize);

    setLogoCorrect(isValid);
    form.setFieldValue(value, file);

    if (file) {
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
      }
    }

    if (onChange && file) {
      onChange(file);
    }

    if (isValid) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file as Blob);
    }
  };

  return (
    <label htmlFor={id}>
      <p className='px-4 text-[#1B263B]/50'>{children}</p>
      <Field
        id={id}
        name={value}
        type='file'
        accept='image/png'
        isCorrect={isCorrect}
        isDisabled={isDisabled}
        render={({ field, form }: FieldProps) => (
          <div className='relative'>
            <input
              className='absolute left-0 top-0 h-full w-full cursor-pointer opacity-0'
              type='file'
              accept='image/png'
              onChange={async (event) => {
                const file = event.target.files?.[0] || null;
                const isValidSize = await validateLogo(file, requiredSize);
                if (isValidSize) {
                  handleFileChange(file, form);
                  field.onChange(event);
                }
              }}
              onDrop={async (event) => {
                const file = event.dataTransfer.files?.[0] || null;
                const isValidSize = await validateLogo(file, requiredSize);
                if (isValidSize) {
                  handleFileChange(file, form);
                  field.onChange({
                    target: {
                      value: file,
                      type: 'file',
                    },
                  });

                  const inputElement = document.getElementById(id) as HTMLInputElement;
                  if (inputElement) {
                    inputElement.value = '';
                    inputElement.focus();
                  }
                }
              }}
              required
            />
            <div className='flex min-h-[32rem] w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-slate-50'>
              {!preview && (
                <div className='flex flex-col items-center'>
                  <span className='absolute top-40 mb-2 text-gray-500'>Drag the image here to upload</span>
                  <ImageOutlinedIcon className='absolute bottom-56 scale-[8.8] text-gray-300' />
                </div>
              )}
              {preview && <img src={preview} alt='Preview' className='mt-3 h-auto max-w-full' />}
            </div>
          </div>
        )}
      />
    </label>
  );
}

InputImage.defaultProps = defaultProps;

export default InputImage;

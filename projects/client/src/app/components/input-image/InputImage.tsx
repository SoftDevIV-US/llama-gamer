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

const validateLogo = async (file: File | null, requiredSize: '256' | '512'): Promise<string | null> => {
  if (!file) {
    return 'Please select an image file.';
  }

  const allowedExtensions = ['png'];
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const isValidExtension = allowedExtensions.includes(extension);

  if (!isValidExtension) {
    return 'Invalid file format. Please upload a PNG image.';
  }

  return new Promise((resolve) => {
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

      resolve(
        isValidSizeSmall || isValidSizeMedium
          ? null
          : `Invalid image dimensions only accepts ${requiredSize} x ${requiredSize} `
      );
    };

    reader.readAsDataURL(file);
  });
};

function InputImage({ id, children, value, isCorrect, isDisabled, requiredSize, onChange }: Props) {
  const [logoValidationMessage, setLogoValidationMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (logoValidationMessage !== null) {
      setPreview(null);
    }
  }, [logoValidationMessage]);

  const handleFileChange = async (file: File | null, form: any) => {
    const validationMessage = await validateLogo(file, requiredSize);

    setLogoValidationMessage(validationMessage);
    form.setFieldValue(value, file);

    if (file) {
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
      }
    }

    if (onChange && file && validationMessage === null) {
      onChange(file);
    }

    if (validationMessage === null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file as Blob);
    }
  };

  return (
    <div>
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
                const validationMessage = await validateLogo(file, requiredSize);
                if (validationMessage === null) {
                  handleFileChange(file, form);
                  field.onChange(event);
                } else {
                  setLogoValidationMessage(validationMessage);
                }
              }}
              onDrop={async (event) => {
                const file = event.dataTransfer.files?.[0] || null;

                const validationMessage = await validateLogo(file, requiredSize);

                if (validationMessage === null) {
                  handleFileChange(file, form);
                  event.preventDefault();
                } else {
                  handleFileChange(null, form);
                  setLogoValidationMessage(validationMessage);
                  event.preventDefault();
                }
              }}
              required
            />
            <div className='flex min-h-[8rem] w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-slate-50'>
              {!preview && (
                <div className='flex flex-col items-center'>
                  <span className='pointer-events-none absolute top-5 text-gray-500'>
                    {logoValidationMessage || 'Drag the image here to upload'}
                  </span>
                  {logoValidationMessage ? null : (
                    <ImageOutlinedIcon className='pointer-events-none absolute mb-10 scale-[3] text-gray-300' />
                  )}
                </div>
              )}
              {preview && <img src={preview} alt='Preview' className='mt-3 h-auto max-w-full' />}
            </div>
          </div>
        )}
      />
    </div>
  );
}

InputImage.defaultProps = defaultProps;

export default InputImage;

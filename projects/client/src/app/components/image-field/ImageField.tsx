import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import React, { useState } from 'react';

type Props = {
  id: string;
  children: React.ReactNode;
  value: string;
  isDisabled?: boolean;
  size?: 'small' | 'medium';
  onFormDataChange: (formData: FormData) => void;
  isRequired?: boolean;
  showRequired?: boolean;
};

function ImageField({ id, children, value, isDisabled, size, onFormDataChange, isRequired, showRequired }: Props) {
  const [logoCorrect, setLogoCorrect] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const allowedExtensions = ['png'];
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      const isValidExtension = allowedExtensions.includes(extension);

      if (!isValidExtension) {
        setLogoCorrect(false);
        setPreviewUrl(null);
        onFormDataChange(new FormData());
        return;
      }

      const reader = new FileReader();

      reader.onload = async (e) => {
        const target = e.target as FileReader;
        const result = target.result as string;

        const img = new Image();

        await new Promise((resolve) => {
          img.onload = () => resolve(null);
          img.src = result;
        });

        const isValidSizeSmall = img.width === 256 && img.height === 256;
        const isValidSizeMedium = img.width === 512 && img.height === 512;

        if ((size === 'small' && !isValidSizeSmall) || (size === 'medium' && !isValidSizeMedium)) {
          setLogoCorrect(false);
          setPreviewUrl(null);
          onFormDataChange(new FormData());
        } else {
          setLogoCorrect(true);
          setPreviewUrl(result);
          const data = new FormData();
          data.append('file', file);
          onFormDataChange(data);
        }
      };

      reader.readAsDataURL(file);
    } else {
      setLogoCorrect(false);
      setPreviewUrl(null);
    }
  };

  return (
    <label htmlFor={id} className='block rounded-lg text-gray-700'>
      <p className='px-4 text-[#1B263B]/50'>
        {children}
        {showRequired && <span className='text-red-700'> *</span>}
      </p>
      <div className=' border-2 border-dashed bg-slate-50'>
        <input
          id={id}
          name={value}
          type='file'
          accept='image/png'
          className='left-0 top-0 h-full w-full cursor-pointer opacity-0'
          onChange={handleFileChange}
          required={isRequired}
          disabled={isDisabled}
        />
        <div
          className={`w-full rounded-lg px-3 py-4 ${
            logoCorrect ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'border-red-500'
          }`}
        >
          {previewUrl && <img src={previewUrl} alt='Preview' className='mb-2 max-h-40 rounded-lg' />}
          {!previewUrl && (
            <div className='flex flex-col items-center'>
              <div className='mb-10'>
                <span className='text-gray-500'>Drag the image here to upload...</span>
              </div>
              <div>
                <ImageOutlinedIcon className='mb-10 scale-[3] text-gray-300' />
              </div>
            </div>
          )}
          {!logoCorrect && <p className='mt-2 text-sm text-red-500'>Select a valid PNG image.</p>}
        </div>
      </div>
    </label>
  );
}

ImageField.defaultProps = {
  isDisabled: false,
  size: 'small',
  isRequired: true,
  showRequired: true,
};

export default ImageField;

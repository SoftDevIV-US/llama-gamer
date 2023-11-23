import React, { useState } from 'react';

type Props = {
  id: string;
  children: React.ReactNode;
  value: string;
  placeholder: string;
  isDisabled?: boolean;
  size?: 'small' | 'medium';
  onFormDataChange: (formData: FormData) => void;
};

function ImageField({ id, children, value, placeholder, isDisabled, size, onFormDataChange }: Props) {
  const [logoCorrect, setLogoCorrect] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData | null>(null);
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

        if (size === 'small' && !isValidSizeSmall) {
          setLogoCorrect(false);
        } else if (size === 'medium' && !isValidSizeMedium) {
          setLogoCorrect(false);
        } else {
          setLogoCorrect(true);
          setPreviewUrl(result);
          const data = new FormData();
          data.append('file', file);
          setFormData(data);
          onFormDataChange(data);
          return formData;
        }
        return null;
      };

      reader.readAsDataURL(file);
    } else {
      setLogoCorrect(false);
      setPreviewUrl(null);
    }
  };

  return (
    <label htmlFor={id} className='block text-gray-700'>
      <p className='px-4 text-[#1B263B]/50'>
        {children}
        <span className='text-red-700'> *</span>
      </p>
      <input
        id={id}
        name={value}
        type='file'
        accept='image/png'
        className={`w-full rounded-lg border px-3 py-4 ${
          logoCorrect ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'border-red-500'
        }`}
        placeholder={placeholder}
        onChange={handleFileChange}
        required
        disabled={isDisabled}
      />
      {previewUrl && <img src={previewUrl} alt='Preview' className='mb-2 max-h-40 rounded-lg' />}
      {!logoCorrect && <p className='mt-2 text-sm text-red-500'>Select a valid PNG image.</p>}
    </label>
  );
}

ImageField.defaultProps = {
  isDisabled: false,
  size: 'small',
};

export default ImageField;

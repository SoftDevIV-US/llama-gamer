import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isSubmit?: boolean;
  isLoading?: boolean;
};

const defaultProps = {
  className: '',
  onClick: () => {},
  isSubmit: false,
  isLoading: false,
};

function Button({ children, className, onClick, isSubmit, isLoading }: Props) {
  return (
    <button
      className={`${className} cursor-pointer transition duration-100 active:scale-90`}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={24} color='inherit' /> : children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;

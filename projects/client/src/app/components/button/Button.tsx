type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isSubmit?: boolean;
};

const defaultProps = {
  className: '',
  onClick: () => {},
  isSubmit: false,
};

function Button({ children, className, onClick, isSubmit }: Props) {
  return (
    <button
      className={`${className} cursor-pointer transition duration-100 active:scale-90`}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;

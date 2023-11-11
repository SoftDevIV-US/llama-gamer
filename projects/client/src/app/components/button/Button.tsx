type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const defaultProps = {
  className: '',
  onClick: () => {},
};

function Button({ children, className, onClick }: Props) {
  return (
    <button
      className={`${className} cursor-pointer transition duration-100 active:scale-90`}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;

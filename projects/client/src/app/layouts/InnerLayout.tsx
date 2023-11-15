type Props = {
  children: React.ReactNode;
};

function InnerLayout({ children }: Props) {
  return <div className='mx-auto h-full w-full p-4 lg:max-w-7xl lg:px-6 lg:py-8'>{children}</div>;
}

export default InnerLayout;

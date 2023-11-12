type Props = {
  children: React.ReactNode;
};

function NotFound({ children }: Props) {
  return (
    <div className='grid h-full place-content-center text-center'>
      <h2 className='grid h-full place-content-center text-2xl lg:text-3xl'>{children} not Found</h2>
      <p className='text-lg'>Try another one</p>
    </div>
  );
}

export default NotFound;

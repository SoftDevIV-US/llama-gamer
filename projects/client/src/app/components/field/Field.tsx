type Props = {
  title: string;
  children: React.ReactNode;
};

function Field({ title, children }: Props) {
  return (
    <div>
      <p className='px-4 text-[#1B263B]/50'>{title}</p>
      <div className='w-full rounded-lg bg-white px-5 py-3 outline-none'>{children}</div>
    </div>
  );
}

export default Field;

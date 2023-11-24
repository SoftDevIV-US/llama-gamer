import InnerLayout from '@/app/layouts/InnerLayout';

function Account() {
  const aboutPageText = 'About Page';
  return (
    <InnerLayout>
      <div className='grid h-full w-full place-content-center '>
        <h1 className='text-3xl font-bold'>{aboutPageText} </h1>
      </div>
    </InnerLayout>
  );
}

export default Account;

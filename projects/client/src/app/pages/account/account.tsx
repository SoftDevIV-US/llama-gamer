import InnerLayout from '@/app/layouts/InnerLayout';

function Account() {
  const accountPageText = 'Account Page';
  return (
    <InnerLayout>
      <div className='grid h-full w-full place-content-center '>
        <h1 className='text-3xl font-bold'>{accountPageText} </h1>
      </div>
    </InnerLayout>
  );
}

export default Account;

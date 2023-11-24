import InnerLayout from '@/app/layouts/InnerLayout';

function TermsConditions() {
  const TermsConditionsPageText = 'Terms & Conditions Page';
  return (
    <InnerLayout>
      <div className='grid h-full w-full place-content-center '>
        <h1 className='text-3xl font-bold'>{TermsConditionsPageText}</h1>
      </div>
    </InnerLayout>
  );
}

export default TermsConditions;

import InnerLayout from '@/app/layouts/InnerLayout';

function Contact() {
  const contactPageText = 'Contact Page';
  return (
    <InnerLayout>
      <div className='grid h-full w-full place-content-center '>
        <h1 className='text-3xl font-bold'>{contactPageText} </h1>
      </div>
    </InnerLayout>
  );
}

export default Contact;

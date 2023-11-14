import InnerLayout from '@/app/layouts/InnerLayout';

function NotFound() {
  return (
    <InnerLayout>
      <article className='grid h-full place-content-center text-center text-5xl font-semibold'>
        <div className='flex flex-col gap-5 rounded-3xl bg-[#223343] p-20 text-white shadow-xl'>
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
      </article>
    </InnerLayout>
  );
}

export default NotFound;

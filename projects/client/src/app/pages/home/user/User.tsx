import brand from './assets/brand.webp';
import background from './assets/user-background.webp';

function User() {
  // const [isLoading, setIsLoading] = useState(true);

  // const { brands, categories } = useLoadProducts({ setIsLoading });

  return (
    <div className='grid w-full'>
      <div
        className='flex min-h-screen w-full items-start justify-center bg-cover bg-center bg-no-repeat pt-48 md:justify-start md:pt-0'
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div>
          <img src={brand} alt='Brand' />
        </div>
      </div>
      <div className='min-h-screen w-full bg-[#e4e3e8] p-10'>
        {/* {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className='w-fit'>
              <h3 className='text-2xl'>{brands[0].name} Products</h3>
              <hr className='mt-1 border-[1px] border-[#319DFF]' />
            </div>
            <div className='w-fit'>
              <h3 className='text-2xl'>Categories</h3>
              <hr className='mt-1 border-[1px] border-[#319DFF]' />
            </div>
            <div className='w-fit'>
              <h3 className='text-2xl'>{brands[1].name} Products</h3>
              <hr className='mt-1 border-[1px] border-[#319DFF]' />
            </div>
          </>
        )} */}
      </div>
    </div>
  );
}

export default User;

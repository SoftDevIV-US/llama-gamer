import brand from './assets/brand.webp';
import background from './assets/user-background.webp';

function User() {
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
      <div className='min-h-screen w-full bg-[#e4e3e8]'>A</div>
    </div>
  );
}

export default User;

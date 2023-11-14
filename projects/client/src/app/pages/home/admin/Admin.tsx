import useNavigate from '@/app/hooks/useNavigate';

import Button from '../../../components/button/Button';
import BackGroundImage from './assets/BackGround.png';
import BrandButton from './assets/brand 1.png';
import CategoryButton from './assets/Category Icon 2.png';
import CountryButton from './assets/Countries Icon 1.png';
import SupplierButton from './assets/Supplier Icon 1.png';
import ProductButton from './assets/Vector.png';

function Admin() {
  const { navigate } = useNavigate();

  const containerButtons =
    'm-7 flex flex-col sm:items-center md:flex-row landscape:sm:flex-row landscape:md:flex-row landscape:lg:flex-col';
  const buttonsStyle =
    'm-3 rounded-xl bg-[#223343] sm:h-[97px] sm:w-[145px] md:h-[97px] md:w-[145px] lg:h-[150px] lg:w-[230px]';
  const containerColumns =
    'relative left-5 top-1/2 flex w-full translate-y-[-50%] flex-row items-start justify-start landscape:sm:flex-col landscape:md:flex-col landscape:lg:flex-row ';
  const imageStyle = 'mx-auto sm:h-[75px] sm:w-[95px] md:h-[75px] md:w-[95px] lg:h-[120px] lg:w-[120px]';
  return (
    <div
      className='fixed left-0  h-full max-h-full w-full overflow-y-scroll bg-cover bg-center bg-no-repeat landscape:sm:flex'
      style={{
        backgroundImage: `url(${BackGroundImage})`,
        height: '100vh',
      }}
    >
      <div className={containerColumns}>
        <div className={containerButtons}>
          <Button className={buttonsStyle} onClick={() => navigate('/admin/brand')}>
            <img src={BrandButton} alt='BrandButton' className={imageStyle} />
            <p style={{ color: '#fff' }}>Brand</p>
          </Button>
          <Button className={buttonsStyle} onClick={() => navigate('/admin/supplier')}>
            <img src={SupplierButton} alt='SupplierButton' className={imageStyle} />
            <p style={{ color: '#fff' }}>Supplier</p>
          </Button>
          <Button className={buttonsStyle} onClick={() => navigate('/admin/countries')}>
            <img src={CountryButton} alt='CountryButton' className={imageStyle} />
            <p style={{ color: '#fff' }}>Country</p>
          </Button>
        </div>
        <div className={containerButtons}>
          <Button className={buttonsStyle} onClick={() => navigate('/admin/category')}>
            <img src={CategoryButton} alt='CategoryButton' className={imageStyle} />
            <p style={{ color: '#fff' }}>Category</p>
          </Button>
          <Button className={buttonsStyle} onClick={() => navigate('/admin/product')}>
            <img src={ProductButton} alt='ProductButton' className={imageStyle} />
            <p style={{ color: '#fff' }}>Product</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Admin;

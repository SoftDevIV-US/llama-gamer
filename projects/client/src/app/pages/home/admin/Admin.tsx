import Layout from '@/app/layouts/Layout';

import backgroundImage from './assets/background.webp';
import brandIcon from './assets/brand.png';
import categoryIcon from './assets/category.png';
import countryIcon from './assets/country.png';
import productIcon from './assets/product.png';
import supplierIcon from './assets/supplier.png';
import ImageButton from './components/ImageButton';

function Admin() {
  return (
    <Layout>
      <div
        className='h-full max-h-full w-full overflow-y-scroll bg-cover bg-center bg-no-repeat p-10 lg:pl-24'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className='grid grid-cols-2 gap-5 md:w-4/5 lg:w-3/5 xl:w-2/5 landscape:grid-cols-3'>
          <ImageButton src={brandIcon} title='Brand' url='/admin/brands' />
          <ImageButton src={categoryIcon} title='Category' url='/admin/categories' />
          <ImageButton src={supplierIcon} title='Supplier' url='/admin/suppliers' />
          <ImageButton src={productIcon} title='Product' url='/admin/products' />
          <ImageButton src={countryIcon} title='Country' url='/admin/countries' />
        </div>
      </div>
    </Layout>
  );
}

export default Admin;

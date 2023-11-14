import { Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import Brands from './pages/brands/Brands';
<<<<<<< HEAD
import AddBrand from './pages/brands/pages/add/AddBrand';
import EditBrand from './pages/brands/pages/edit/EditBrand';
import BrandInfo from './pages/brands/pages/info/BrandInfo';
import Categories from './pages/categories/Categories';
import AddCategory from './pages/categories/pages/add/AddCategory';
import EditCategory from './pages/categories/pages/edit/EditCategory';
import CategoryInfo from './pages/categories/pages/info/CategoryInfo';
=======
>>>>>>> 0221fae (feat: brand list)
import Countries from './pages/countries/Countries';
import AddCountry from './pages/countries/pages/add/AddCountry';
import EditCountry from './pages/countries/pages/edit/EditCountry';
import CountryInfo from './pages/countries/pages/info/CountryInfo';
import Admin from './pages/home/admin/Admin';
import User from './pages/home/user/User';
import NotFound from './pages/not-found/NotFound';
import Products from './pages/products/Products';
import Suppliers from './pages/suppliers/Suppliers';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<User />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/countries' element={<Countries />} />
        <Route path='/admin/countries/add' element={<AddCountry />} />
        <Route path='/admin/countries/info/:id' element={<CountryInfo />} />
        <Route path='/admin/countries/edit/:id' element={<EditCountry />} />
        <Route path='/admin/brands' element={<Brands />} />
        <Route path='/admin/brands/add' element={<AddBrand />} />
        <Route path='/admin/brands/info/:id' element={<BrandInfo />} />
        <Route path='/admin/brands/edit/:id' element={<EditBrand />} />
        <Route path='/admin/categories' element={<Categories />} />
        <Route path='/admin/categories/add' element={<AddCategory />} />
        <Route path='/admin/categories/info/:id' element={<CategoryInfo />} />
        <Route path='/admin/categories/edit/:id' element={<EditCategory />} />
        <Route path='/admin/suppliers' element={<Suppliers />} />
        <Route path='/admin/products' element={<Products />} />
      </Routes>
    </Layout>
  );
}

export default App;

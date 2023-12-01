import { Route, Routes } from 'react-router-dom';

import AdminRoute from '@/routes/admin.route';
import UserRoute from '@/routes/user.route';

import About from './pages/about/About';
import Account from './pages/account/Account';
import Brands from './pages/brands/Brands';
import AddBrand from './pages/brands/pages/add/AddBrand';
import EditBrand from './pages/brands/pages/edit/EditBrand';
import BrandInfo from './pages/brands/pages/info/BrandInfo';
import Cart from './pages/cart/Cart';
import Categories from './pages/categories/Categories';
import AddCategory from './pages/categories/pages/add/AddCategory';
import EditCategory from './pages/categories/pages/edit/EditCategory';
import CategoryInfo from './pages/categories/pages/info/CategoryInfo';
import UserCategory from './pages/categories/pages/user-category/UserCategory';
import Contact from './pages/contact/Contact';
import Countries from './pages/countries/Countries';
import AddCountry from './pages/countries/pages/add/AddCountry';
import EditCountry from './pages/countries/pages/edit/EditCountry';
import CountryInfo from './pages/countries/pages/info/CountryInfo';
import Admin from './pages/home/admin/Admin';
import User from './pages/home/user/User';
import Invoice from './pages/invoice/InvoiseModal';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/NotFound';
import AddProduct from './pages/products/pages/add/AddProduct';
import EditProduct from './pages/products/pages/edit/EditProduct';
import ProductInfo from './pages/products/pages/info/ProductInfo';
import UserProduct from './pages/products/pages/user-product/UserProduct';
import Products from './pages/products/Products';
import AddSupplier from './pages/suppliers/pages/add/AddSupplier';
import EditSupplier from './pages/suppliers/pages/edit/EditSupplier';
import SupplierInfo from './pages/suppliers/pages/info/SupplierInfo';
import Suppliers from './pages/suppliers/Suppliers';
import TermsConditions from './pages/terms-conditions/TermsConditions';
import WishList from './pages/wish-list/WishList';

function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/login' element={<Login />} />
      <Route element={<UserRoute />}>
        <Route path='/' element={<User />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/wish-list' element={<WishList />} />
        <Route path='/terms-conditions' element={<TermsConditions />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart/invoice' element={<Invoice id='invoice' name='bill' />} />
        <Route path='/account' element={<Account />} />
        <Route path='/product/:id' element={<UserProduct />} />
        <Route path='/category/:id' element={<UserCategory />} />
      </Route>
      <Route element={<AdminRoute />}>
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
        <Route path='/admin/suppliers/add' element={<AddSupplier />} />
        <Route path='/admin/suppliers/info/:id' element={<SupplierInfo />} />
        <Route path='/admin/suppliers/edit/:id' element={<EditSupplier />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/products/add' element={<AddProduct />} />
        <Route path='/admin/products/edit/:id' element={<EditProduct />} />
        <Route path='/admin/products/info/:id' element={<ProductInfo />} />
      </Route>
    </Routes>
  );
}

export default App;

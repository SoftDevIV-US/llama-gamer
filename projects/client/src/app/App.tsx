import { Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import Brands from './pages/brands/Brands';
import Countries from './pages/countries/Countries';
import AddCountry from './pages/countries/pages/add/AddCountry';
import EditCountry from './pages/countries/pages/edit/EditCountry';
import CountryInfo from './pages/countries/pages/info/CountryInfo';
import RemoveCountry from './pages/countries/pages/remove/RemoveCountry';
import AdminHome from './pages/home/admin/AdminHome';
import UserHome from './pages/home/user/UserHome';
import NotFound from './pages/not-found/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<UserHome />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/admin/countries' element={<Countries />} />
        <Route path='/admin/countries/add' element={<AddCountry />} />
        <Route path='/admin/countries/info/:id' element={<CountryInfo />} />
        <Route path='/admin/countries/edit/:id' element={<EditCountry />} />
        <Route path='/admin/countries/remove/:id' element={<RemoveCountry />} />
        <Route path='/admin/brands' element={<Brands />} />
      </Routes>
    </Layout>
  );
}

export default App;

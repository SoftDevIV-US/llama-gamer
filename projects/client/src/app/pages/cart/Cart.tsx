import useNavigate from '@/app/hooks/useNavigate';
import useCartStore from '@/store/cart.store';

import ProductCart from './components/ProductCart';
import TotalBalance from './components/TotalBalance';

function Cart() {
  const { cart } = useCartStore();
  const { navigate } = useNavigate();

  return (
    <div className='grid h-screen w-full grid-flow-col place-content-center space-x-10 '>
      <div className='grid grid-flow-row  space-y-5'>
        <ProductCart
          name='KumaraK552'
          supplier='USA'
          tax='2.3'
          brand='ASUS'
          days='7'
          image={Keyboard1}
          price='160'
          quantity={2}
        />
        <ProductCart
          name='SUK552213'
          supplier='Mexico'
          tax='3.14'
          brand='Delux'
          days='3'
          image={Keyboard2}
          price='215'
          quantity={2}
        />
      </div>
      <div>
        <TotalBalance subtTotal={375} tax={12.5} />
      </div>
    </div>
  );
}

export default Cart;

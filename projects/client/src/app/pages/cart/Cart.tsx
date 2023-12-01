import ProductCart from '@/app/components/product-cart/ProductCart';
import TotalBalance from '@/app/components/total-balance/totalBalance';

import Keyboard1 from './assets/Teclado1.png';
import Keyboard2 from './assets/Teclado2.png';

function Cart() {
  return (
    <div className='grid h-screen w-full grid-flow-col place-content-center space-x-10 '>
      <div className='grid grid-flow-row  space-y-5'>
        <ProductCart
          name='KumaraK552'
          supplier='USA'
          tax='0.7'
          brand='ASUS'
          days='7'
          image={Keyboard1}
          price='160'
          quantity={2}
        />
        <ProductCart
          name='SUK552213'
          supplier='Mexico'
          tax='0.3'
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

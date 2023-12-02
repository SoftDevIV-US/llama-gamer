import { Document, Image, Page, Text, View } from '@react-pdf/renderer';

import { CartProduct } from '@/models/product.model';
import useAuthStore from '@/store/auth.store';

import logo from './assets/llama-logo.png';

type Props = {
  cart: CartProduct[];
  totalPrice: number;
};

function InvoicePDF({ cart, totalPrice }: Props) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES');
  const userInfo = useAuthStore.getState().auth?.user;

  const tax = totalPrice * 0.13;

  const subtotal = totalPrice.toFixed(2);
  const total = (tax + totalPrice).toFixed(2);
  const totalTax = (Number(total) - Number(subtotal)).toFixed(2);

  return (
    <Document>
      <Page
        size='A4'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 10,
          }}
        >
          <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
            <Image src={logo} style={{ maxWidth: '300px', maxHeight: '300px', marginRight: 120 }} />
            <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#3A4D5E', marginLeft: -50 }}>Billing</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ textAlign: 'center', marginRight: 120 }}>
              <Text style={{ fontSize: '16px', color: '#111111' }}>{`${userInfo?.name} ${userInfo?.lastName}`}</Text>
              <Text style={{ fontSize: '16px', color: '#111111' }}>{userInfo?.email}</Text>
            </View>

            <View style={{ textAlign: 'center', marginLeft: 120 }}>
              <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#111111', marginLeft: 20 }}>Date</Text>
              <Text style={{ fontSize: '16px', color: '#111111' }}>{formattedDate}</Text>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '32%', fontWeight: 'bold', backgroundColor: '#3A4D5E', color: '#FFFFFF' }}>
                Name
              </Text>
              <Text style={{ width: '13%', fontWeight: 'bold', backgroundColor: '#3A4D5E', color: '#FFFFFF' }}>
                Amount
              </Text>
              <Text style={{ width: '15%', fontWeight: 'bold', backgroundColor: '#3A4D5E', color: '#FFFFFF' }}>
                Unitary P.
              </Text>
              <Text style={{ width: '20%', fontWeight: 'bold', backgroundColor: '#3A4D5E', color: '#FFFFFF' }}>
                Tax
              </Text>
              <Text style={{ width: '20%', fontWeight: 'bold', backgroundColor: '#3A4D5E', color: '#FFFFFF' }}>
                Total
              </Text>
            </View>
            {cart.map((item) => (
              <View key={item.product.id} style={{ flexDirection: 'row' }}>
                <Text style={{ width: '32%' }}>{item.product.name}</Text>
                <Text style={{ width: '13%', textAlign: 'center' }}>{item.quantity}</Text>
                <Text style={{ width: '15%', textAlign: 'center' }}>{item.product.price}</Text>
                <Text style={{ width: '20%', textAlign: 'center' }}>{`${(item.totalPrice * item.tax).toFixed(
                  2
                )} Bs.`}</Text>

                <Text style={{ width: '20%', textAlign: 'center' }}>{`${item.totalPrice.toFixed(2)} Bs.`}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ width: '80%', fontWeight: 'bold', textAlign: 'right' }}>Subtotal</Text>
              <Text style={{ width: '20%', textAlign: 'right' }}>{` ${subtotal} Bs.`}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '80%', fontWeight: 'bold', textAlign: 'right' }}>Taxes</Text>
              <Text style={{ width: '20%', textAlign: 'right' }}>{`${totalTax} Bs.`}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '80%', fontWeight: 'bold', textAlign: 'right' }}>Total</Text>
              <Text style={{ width: '20%', textAlign: 'right' }}>{`${total} Bs.`}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDF;

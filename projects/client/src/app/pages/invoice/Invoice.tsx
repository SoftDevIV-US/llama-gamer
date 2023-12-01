/* eslint-disable import/no-extraneous-dependencies */
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';

import logo from './assets/llama-logo.png';

function InvoicePDF() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES');

  const items = [
    { name: 'KumaraK552', amount: 2, unitaryPrice: 160, tax: 2.3, total: 167.36 },
    { name: 'SUK552213', amount: 2, unitaryPrice: 215, tax: 3.14, total: 221.75 },
  ];

  return (
    <Document>
      <Page
        size='A4'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 10,
          }}
        >
          <View style={{ marginBottom: 12 }}>
            <Image src={logo} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#3A4D5E' }}>Billing</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ textAlign: 'center', marginRight: 12 }}>
              <Text style={{ fontSize: '16px', color: '#111111' }}>Alex Fernandez</Text>
              <Text style={{ fontSize: '16px', color: '#111111' }}>649 62 05 35</Text>
              <Text style={{ fontSize: '16px', color: '#111111' }}>afsprodesign@gmail.com</Text>
            </View>

            <View style={{ textAlign: 'center' }}>
              <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#111111' }}>Date</Text>
              <Text style={{ fontSize: '16px', color: '#111111' }}>{formattedDate}</Text>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Name</Text>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Amount</Text>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Unitary P.</Text>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Tax</Text>
              <Text style={{ width: '20%', fontWeight: 'bold' }}>Total</Text>
            </View>
            {items.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <View key={index} style={{ flexDirection: 'row' }}>
                <Text style={{ width: '20%' }}>{item.name}</Text>
                <Text style={{ width: '20%' }}>{item.amount}</Text>
                <Text style={{ width: '20%' }}>{item.unitaryPrice}</Text>
                <Text style={{ width: '20%' }}>{item.tax}</Text>
                <Text style={{ width: '20%' }}>{item.total}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDF;

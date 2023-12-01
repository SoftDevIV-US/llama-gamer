/* eslint-disable import/no-extraneous-dependencies */
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';

import logo from './assets/llama-logo.png';

function InvoicePDF() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES');

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
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDF;

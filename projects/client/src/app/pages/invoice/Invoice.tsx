import { Document, Image, Line, Page, Svg, Text, View } from '@react-pdf/renderer';
import React from 'react';

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
    <Document title='Invoice'>
      <Page size='A4'>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            paddingHorizontal: 50,
            paddingVertical: 15,
            gap: 5,
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src={logo} style={{ maxWidth: '300px', maxHeight: '300px', marginLeft: -30 }} />
            <Text
              style={{
                fontSize: '24px',
                fontFamily: 'Helvetica-Bold',
                color: '#3A4D5E',
                marginRight: 50,
              }}
            >
              Billing
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 40,
            }}
          >
            <View style={{ textAlign: 'left', marginLeft: 25, flexDirection: 'column', gap: 5 }}>
              <Text style={{ fontSize: '16px', color: '#111111' }}>{`${userInfo?.name} ${userInfo?.lastName}`}</Text>
              <Text style={{ fontSize: '16px', color: '#111111' }}>{userInfo?.email}</Text>
            </View>

            <View style={{ marginRight: 50, flexDirection: 'column', gap: 5 }}>
              <Text style={{ fontSize: '16px', fontFamily: 'Helvetica-Bold', color: '#111111', marginLeft: 20 }}>
                Date
              </Text>
              <Text style={{ fontSize: '16px', color: '#111111' }}>{formattedDate}</Text>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                width: '100%',
                height: '40px',
                backgroundColor: '#3A4D5E',
                fontSize: '14px',
                gap: 5,
                fontFamily: 'Helvetica-Bold',
                color: '#FFFFFF',
              }}
            >
              <View
                style={{
                  width: '30%',
                  paddingLeft: 25,
                  justifyContent: 'center',
                }}
              >
                <Text>Name</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Text>Amount</Text>
              </View>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  textAlign: 'right',
                }}
              >
                <Text>Unitary P.</Text>
              </View>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  textAlign: 'right',
                }}
              >
                <Text>Supplier Tax</Text>
              </View>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  textAlign: 'right',
                  paddingRight: 30,
                }}
              >
                <Text>Total</Text>
              </View>
            </View>
            {cart.map((item, index) => (
              <React.Fragment key={item.product.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    fontSize: '14px',
                    gap: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                >
                  <Text style={{ width: '30%', paddingLeft: 25 }}>{item.product.name}</Text>
                  <Text style={{ width: '10%', textAlign: 'center' }}>{item.quantity}</Text>
                  <Text style={{ width: '20%', textAlign: 'right' }}>{item.product.price} Bs</Text>
                  <Text style={{ width: '20%', textAlign: 'right', paddingRight: 10 }}>{`${(
                    item.totalPrice * item.tax
                  ).toFixed(2)} Bs`}</Text>

                  <Text style={{ width: '20%', textAlign: 'right', paddingRight: 15 }}>{`${item.totalPrice.toFixed(
                    2
                  )} Bs`}</Text>
                </View>
                {index !== cart.length - 1 && (
                  <Svg
                    height='5'
                    width='100%'
                    style={{
                      marginTop: 15,
                    }}
                  >
                    <Line x1='0' y1='5' x2='500' y2='5' strokeWidth={2} stroke='rgb(196,196,196)' />
                  </Svg>
                )}
              </React.Fragment>
            ))}
            <View
              style={{
                flexDirection: 'column',
                gap: 30,
                marginTop: 50,
                fontSize: '14px',
                textAlign: 'right',
                marginRight: 15,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '80%', fontFamily: 'Helvetica-Bold' }}>Subtotal</Text>
                <Text style={{ width: '20%' }}>{` ${subtotal} Bs`}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '80%', fontFamily: 'Helvetica-Bold' }}>Region Tax</Text>
                <Text style={{ width: '20%' }}>{`${totalTax} Bs`}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '80%', fontFamily: 'Helvetica-Bold' }}>Total</Text>
                <Text style={{ width: '20%', fontFamily: 'Helvetica-Bold' }}>{`${total} Bs`}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDF;

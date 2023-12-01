import { Button } from '@mui/material';

type Props = {
  subtTotal: number;
  tax: number;
};

function TotalBalance({ subtTotal, tax }: Props) {
  return (
    <div className='grid w-full grid-flow-row space-y-5 rounded-lg bg-white p-5'>
      <div className='grid grid-flow-col space-x-4'>
        <div className='grid grid-flow-row'>
          <p>Subtotal:</p>
          <p>Tax:</p>
        </div>
        <div className='grid grid-flow-row'>
          <p>Bs. {subtTotal}</p>
          <p style={{ color: 'green' }}>+Bs {tax}</p>
        </div>
      </div>

      <Button style={{ backgroundColor: '#00B517', color: 'white', borderRadius: '0.25rem' }}>Checkout</Button>
    </div>
  );
}

export default TotalBalance;

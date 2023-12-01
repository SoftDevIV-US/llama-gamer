import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { CartProduct } from '@/models/product.model';
import useCartStore from '@/store/cart.store';

import DocuPDF from './Invoice';

const defaultProps = {};

type Props = {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
  cart: CartProduct[];
  totalPrice: number;
};

function InvoiceModal({ id, name, open, onClose, cart, totalPrice }: Props) {
  const { clearCart } = useCartStore();

  const handleClose = () => {
    onClose();
    clearCart();
  };

  return (
    <div>
      <Modal
        id={id}
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        className='flex items-center justify-center'
      >
        <Box className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black bg-white px-4 pb-3 pt-2 shadow-md'>
          <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300 bg-white'>
            <PDFViewer style={{ width: '500px', height: '600px' }}>
              <DocuPDF cart={cart} totalPrice={totalPrice} />
            </PDFViewer>
            <button
              type='button'
              className='mt-4 bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring'
              onClick={handleClose}
            >
              Close Modal
            </button>
            <div>
              <PDFDownloadLink document={<DocuPDF cart={cart} totalPrice={totalPrice} />} fileName={`${name}.pdf`}>
                <Button type='button'> Download PDF</Button>
              </PDFDownloadLink>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

InvoiceModal.defaultProps = defaultProps;

export default InvoiceModal;

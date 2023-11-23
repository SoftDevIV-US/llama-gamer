import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PaymentIcon from '@mui/icons-material/Payment';
import QrCodeIcon from '@mui/icons-material/QrCode';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

import Button from '../button/Button';

function Footer() {
  return (
    <footer className='w-full overflow-y-auto bg-[#ffffff] py-2 shadow-md lg:py-4 sm:landscape:overflow-y-auto'>
      <div className='mx-auto flex flex-col justify-between px-4 text-center lg:max-w-7xl lg:flex-row lg:place-items-start lg:px-6 '>
        <div className='mb-4 flex flex-col items-start lg:mb-0 lg:items-start '>
          <p style={{ fontWeight: 'bold' }}>Headquarters</p>
          <p className='text-slate-500'>Square No45, Bucharest - 099455</p>
          <p style={{ fontWeight: 'bold' }}>Email</p>
          <p className='text-slate-500'>contact@shoperz.com</p>
          <p style={{ fontWeight: 'bold' }}>Telephone</p>
          <p className='text-slate-500'>(+40) 987 123 654</p>
        </div>

        <div className='mb-4 flex flex-col items-start lg:mb-0 lg:items-start'>
          <p style={{ fontWeight: 'bold' }}>Useful Links</p>
          <Button className='text-slate-500'>About</Button>
          <Button className='text-slate-500'>Contact</Button>
          <Button className='text-slate-500'>Wishlist</Button>
          <Button className='text-slate-500'>Terms & Conditions</Button>
        </div>

        <div className='flex flex-col items-start lg:items-start'>
          <p style={{ fontWeight: 'bold' }}>Customer Service</p>
          <Button className='text-slate-500'>My Account</Button>
          <Button className='text-slate-500'>My Cart</Button>
        </div>
      </div>
      <div className='mx-auto flex flex-col justify-between px-4 text-center lg:max-w-7xl lg:flex-row lg:place-items-start lg:px-6'>
        <div className='mb-4 flex flex-row items-start lg:mb-0 lg:items-start'>
          <Button>
            <FacebookIcon className='text-slate-500' fontSize='large' />
          </Button>
          <Button>
            <InstagramIcon className='text-slate-500' fontSize='large' />
          </Button>
          <Button>
            <LinkedInIcon className='text-slate-500' fontSize='large' />
          </Button>
          <Button>
            <TwitterIcon className='text-slate-500' fontSize='large' />
          </Button>
          <Button>
            <YouTubeIcon className='text-slate-500' fontSize='large' />
          </Button>
        </div>
        <div className='mb-4 flex flex-row items-start lg:mb-0 lg:items-start'>
          <Button>
            <QrCodeIcon className='text-slate-500' fontSize='large' />
          </Button>
          <Button>
            <PaymentIcon className='text-slate-500' fontSize='large' />
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

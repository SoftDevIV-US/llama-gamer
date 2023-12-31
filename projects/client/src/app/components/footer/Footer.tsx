import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PaymentIcon from '@mui/icons-material/Payment';
import QrCodeIcon from '@mui/icons-material/QrCode';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

import useNavigate from '@/app/hooks/useNavigate';

import Button from '../button/Button';

function Footer() {
  const { navigate } = useNavigate();
  const redirectToFacebook = () => {
    window.open('https://www.facebook.com', '_blank');
  };
  const redirectToInstagram = () => {
    window.open('https://www.instagram.com', '_blank');
  };

  const redirectToYouTube = () => {
    window.open('https://www.youtube.com', '_blank');
  };

  const redirectToTwitter = () => {
    window.open('https://www.twitter.com', '_blank');
  };

  const redirectToLinkedIn = () => {
    window.open('https://www.linkedin.com', '_blank');
  };
  const commonColor = 'text-slate-500';

  return (
    <footer className='w-full bg-[#ffffff] py-2 shadow-md lg:py-4 '>
      <div className='mx-auto flex flex-col justify-between px-4 text-center lg:max-w-7xl lg:flex-row lg:place-items-start lg:px-6 '>
        <div className='mb-4 flex flex-col items-start lg:mb-0 lg:items-start '>
          <p style={{ fontWeight: 'bold' }}>Headquarters</p>
          <p className={commonColor}>Square No45, Bucharest - 099455</p>
          <p style={{ fontWeight: 'bold' }}>Email</p>
          <p className={commonColor}>contact@shoperz.com</p>
          <p style={{ fontWeight: 'bold' }}>Telephone</p>
          <p className={commonColor}>(+40) 987 123 654</p>
        </div>

        <div className='mb-4 flex flex-col items-start lg:mb-0 lg:items-start'>
          <p style={{ fontWeight: 'bold' }}>Useful Links</p>
          <Button onClick={() => navigate('/about')} className={commonColor}>
            About
          </Button>
          <Button onClick={() => navigate('/contact')} className={commonColor}>
            Contact
          </Button>
          <Button onClick={() => navigate('/wish-list')} className={commonColor}>
            Wish List
          </Button>
          <Button onClick={() => navigate('/terms-conditions')} className={commonColor}>
            Terms & Conditions
          </Button>
        </div>

        <div className='flex flex-col items-start lg:items-start'>
          <p style={{ fontWeight: 'bold' }}>Customer Service</p>
          <Button onClick={() => navigate('/account')} className={commonColor}>
            My Account
          </Button>
          <Button onClick={() => navigate('/cart')} className={commonColor}>
            My Cart
          </Button>
        </div>
      </div>
      <div className='mx-auto flex flex-col justify-between px-4 text-center lg:max-w-7xl lg:flex-row lg:place-items-start lg:px-6'>
        <div className='mb-4 flex flex-row items-start lg:mb-0 lg:items-start'>
          <Button onClick={redirectToFacebook}>
            <FacebookIcon className={commonColor} fontSize='large' />
          </Button>
          <Button>
            <InstagramIcon onClick={redirectToInstagram} className={commonColor} fontSize='large' />
          </Button>
          <Button>
            <LinkedInIcon onClick={redirectToLinkedIn} className={commonColor} fontSize='large' />
          </Button>
          <Button>
            <TwitterIcon onClick={redirectToTwitter} className={commonColor} fontSize='large' />
          </Button>
          <Button>
            <YouTubeIcon onClick={redirectToYouTube} className={commonColor} fontSize='large' />
          </Button>
        </div>
        <div className='mb-4 flex flex-row items-start lg:mb-0 lg:items-start'>
          <QrCodeIcon className={commonColor} fontSize='large' />
          <PaymentIcon className={commonColor} fontSize='large' />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

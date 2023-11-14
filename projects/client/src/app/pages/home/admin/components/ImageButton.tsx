import Button from '@/app/components/button/Button';
import useNavigate from '@/app/hooks/useNavigate';

type Props = {
  src: string;
  title: string;
  url: string;
};

function ImageButton({ src, title, url }: Props) {
  const { navigate } = useNavigate();

  return (
    <Button
      className='grid w-full place-content-center gap-4 rounded-2xl bg-[#223343] px-3 py-2 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.9)]'
      onClick={() => navigate(url)}
    >
      <img src={src} alt={title} className='p-2' />
      <p className='font-bold text-white'>{title}</p>
    </Button>
  );
}

export default ImageButton;

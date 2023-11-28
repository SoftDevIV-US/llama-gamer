import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

type Props = {
  children: React.ReactNode;
};

function UserLayout({ children }: Props) {
  return (
    <div className='flex h-screen w-full flex-col bg-[#e4e3e8]'>
      <Header />
      <main className='h-full w-full grow overflow-hidden'>{children}</main>
      <Footer />
    </div>
  );
}

export default UserLayout;

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

type Props = {
  children: React.ReactNode;
};

function UserLayout({ children }: Props) {
  return (
    <div className='flex h-screen w-full flex-col overflow-y-auto bg-[#e4e3e8]'>
      <Header />
      <main className='h-fit grow'>{children}</main>
      <Footer />
    </div>
  );
}

export default UserLayout;

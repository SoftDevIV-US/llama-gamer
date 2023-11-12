import { Toaster } from 'sonner';

import Header from '../components/header/Header';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className='flex h-screen w-full flex-col bg-[#e4e3e8]'>
      <Header />
      <main className='mx-auto h-full w-full grow overflow-hidden p-4 lg:max-w-4xl lg:px-6 lg:py-8'>{children}</main>
      <Toaster position='bottom-right' visibleToasts={3} theme='dark' closeButton expand />
    </div>
  );
}

export default Layout;

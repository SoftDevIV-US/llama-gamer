import logo from './assets/llama-logo.png';

function Invoice() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES');

  return (
    <div className='flex-col bg-[#FFFFFF]'>
      <div className='flex items-center justify-center gap-12 bg-[#FFFFFF] bg-cover bg-center bg-no-repeat'>
        <img src={logo} alt='Llama Logo' className='max-w-[200px] md:max-w-[300px] lg:min-w-[330px]' />
        <p className='text-xs font-bold text-[#3A4D5E] md:text-2xl lg:text-3xl'>Billing</p>
      </div>
      <div className='flex items-center justify-center gap-12 bg-[#FFFFFF] bg-cover bg-center bg-no-repeat'>
        <div className='grid flex-col items-center justify-center bg-[#FFFFFF]'>
          <p className='text-xs text-[#111111] md:text-base lg:text-lg'>Alex Fernandez</p>
          <p className='text-xs text-[#111111] md:text-base lg:text-lg'>649 62 05 35</p>
          <p className='text-xs text-[#111111] md:text-base lg:text-lg'>afsprodesign@gmail.com</p>
        </div>
        <div className='grid flex-col items-center justify-center bg-[#FFFFFF]'>
          <p className='text-center text-xs font-bold text-[#111111]'>Date</p>
          <p className='text-xs text-[#111111]'>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default Invoice;

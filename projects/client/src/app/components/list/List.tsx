/* eslint-disable tailwindcss/no-custom-classname */
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import useNavigate from '@/app/hooks/useNavigate';

import Button from '../button/Button';
import Line from '../line/Line';
import Loading from '../loading/Loading';
import ListField from './components/ListField';

type Props = {
  recordList: RecordList;
  isLoading: boolean;
  isFound: boolean;
};

function Countries({ recordList, isLoading, isFound }: Props) {
  const { navigate } = useNavigate();

  return (
    <section
      className={`flex h-full max-h-full w-full flex-col gap-4 border-2 border-black p-4 font-bold ${
        isLoading || recordList.values.length === 0 ? 'h-full' : ''
      }`}
    >
      <div className='flex place-items-center gap-10 px-3'>
        <h1 className='text-3xl text-[#0D1B2A]/70'>{recordList.title}</h1>
        <Button className='flex place-items-center gap-1' onClick={() => navigate(`/admin/${recordList.url}/add`)}>
          <AddCircleOutlineIcon className='text-[#3E93FF]' />
          <p className='text-base text-[#3E93FF]'>Add</p>
        </Button>
      </div>
      <Line />
      <div className='w-full pr-[10px]'>
        <ul
          className={`grid-cols-${
            recordList.fields.length + 2
          }  mx-auto grid w-full py-4 text-center lg:max-w-5xl landscape:py-0 landscape:md:py-4`}
        >
          {recordList.fields.map((record) => (
            <ListField key={record.key}>{record.key}</ListField>
          ))}
          <ListField>Edit</ListField>
          <ListField>Info</ListField>
        </ul>
      </div>
      <Line />
      <div className='flex h-full flex-col gap-14 overflow-y-scroll'>
        {isLoading ? (
          <div className='grid h-full place-content-center py-5'>
            <Loading />
          </div>
        ) : !isFound || recordList.values.length === 0 ? (
          <div className='grid h-full place-content-center py-5 text-center'>
            <h2 className='text-2xl'>Not {recordList.title} Found</h2>
            <p className='text-lg'>Add new {recordList.title}</p>
          </div>
        ) : (
          recordList.values.map((country) => (
            <ul
              key={country.id}
              className={`grid-cols-${
                recordList.fields.length + 2
              } mx-auto grid w-full items-center text-center lg:max-w-5xl`}
            >
              {recordList.fields.map((record) => (
                <li key={record.key}>
                  <p className='inline break-words'>
                    {country[record.value]}
                    {record.decorator}
                  </p>
                </li>
              ))}
              <li>
                <Button onClick={() => navigate(`/admin/${recordList.url}/edit/${country.id}`)}>
                  <EditIcon />
                </Button>
              </li>
              <li>
                <Button onClick={() => navigate(`/admin/${recordList.url}/info/${country.id}`)}>
                  <InfoIcon />
                </Button>
              </li>
            </ul>
          ))
        )}
      </div>
    </section>
  );
}

export default Countries;

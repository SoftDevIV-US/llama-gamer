import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { CreateCountryDto } from '@/models/country.model';
import { createCountry } from '@/services/country.service';

type Props = {
  setIsNameCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTaxCorrect: React.Dispatch<React.SetStateAction<boolean>>;
};

const useAddCountry = ({ setIsNameCorrect, setIsTaxCorrect }: Props) => {
  const { navigate } = useNavigate();

  const addCountry = (country: CreateCountryDto) => {
    const response = toast.promise(createCountry(country), {
      loading: 'Creating country...',
      success: (res) => {
        navigate('/admin/countries');
        return `Country ${res.name} created successfully`;
      },
      error: (err) => {
        const { message } = err.response.data;
        let error = '';
        if (message instanceof Array) {
          [error] = message;
        } else {
          error = message;
        }
        if (error.includes('name')) {
          setIsNameCorrect(false);
          setIsTaxCorrect(true);
        }
        if (error.includes('tax')) {
          setIsTaxCorrect(false);
          setIsNameCorrect(true);
        }
        return error;
      },
    });
    return response;
  };

  return { addCountry };
};

export default useAddCountry;

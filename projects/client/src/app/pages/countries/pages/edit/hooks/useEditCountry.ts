import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { Country, UpdateCountryDto } from '@/models/country.model';
import { getCountryById, updateCountryById } from '@/services/country.service';

type Props = {
  id: string;
  setIsNameCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTaxCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useEditCountry = ({ id, setIsNameCorrect, setIsTaxCorrect, setIsLoading, setFound }: Props) => {
  const [country, setCountry] = useState<Country>({} as Country);
  const { navigate } = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getCountryById(id), {
      loading: 'Loading country...',
      success: (res) => {
        setCountry(res);
        return `Country ${res.name} loaded successfully`;
      },
      error: () => {
        setFound(false);
        return 'Country not found';
      },
      finally: () => setIsLoading(false),
    });
  }, [id, setIsLoading, setFound]);

  const editCountry = (countryToUpdate: UpdateCountryDto) => {
    const response = toast.promise(updateCountryById(id, countryToUpdate), {
      loading: 'Updating country...',
      success: (res) => {
        setIsNameCorrect(true);
        setIsTaxCorrect(true);
        navigate('/admin/countries');
        return `Country ${res.name} updated successfully`;
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

  return { country, editCountry };
};

export default useEditCountry;

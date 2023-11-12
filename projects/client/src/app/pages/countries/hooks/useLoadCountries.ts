import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Country } from '@/models/country.model';
import { getAllCountries } from '@/services/country.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLoadCountries = ({ setIsLoading, setIsFound }: Props) => {
  const [countries, setCountries] = useState<Country[]>([] as Country[]);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getAllCountries(), {
      loading: 'Loading countries...',
      success: (res) => {
        setCountries(res);
        setIsFound(true);
        return 'Countries loaded successfully';
      },
      error: () => {
        setIsFound(false);
        return 'Error loading countries';
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound]);

  return { countries };
};

export default useLoadCountries;

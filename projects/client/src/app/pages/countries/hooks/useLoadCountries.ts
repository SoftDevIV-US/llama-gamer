import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Country } from '@/models/country.model';
import { getAllCountries } from '@/services/country.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const useCountries = ({ setIsLoading }: Props) => {
  const [countries, setCountries] = useState<Country[]>([] as Country[]);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getAllCountries(), {
      loading: 'Loading countries...',
      success: (res) => {
        setCountries(res);
        setIsLoading(false);
        return 'Countries loaded successfully';
      },
      error: 'Error while loading countries',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { countries };
};

export default useCountries;

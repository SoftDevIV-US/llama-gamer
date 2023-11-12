import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Country } from '@/models/country.model';
import { getCountryById } from '@/services/country.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const useLoadCountryInfo = ({ setIsLoading, setIsFound, id }: Props) => {
  const [country, setCountry] = useState<Country>({} as Country);

  useEffect(() => {
    setIsLoading(true);
    toast.promise(getCountryById(id), {
      loading: 'Loading country...',
      success: (res) => {
        setCountry(res);
        setIsFound(true);
        return 'Country loaded successfully';
      },
      error: () => {
        setIsFound(false);
        return `Error loading country with ID ${id}`;
      },
      finally: () => setIsLoading(false),
    });
  }, [setIsLoading, setIsFound, id]);

  return { country };
};

export default useLoadCountryInfo;

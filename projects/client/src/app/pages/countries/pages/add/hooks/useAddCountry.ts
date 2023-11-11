import { toast } from 'sonner';

import { CreateCountryDto } from '@/models/country.model';
import { createCountry } from '@/services/country.service';

const useAddCountry = () => {
  const addCountry = (country: CreateCountryDto) => {
    const response = toast.promise(createCountry(country), {
      loading: 'Creating country...',
      success: (res) => `Country ${res.name}created successfully`,
      error: (err) => {
        const { message } = err.response.data;
        if (message instanceof Array) {
          return message[0];
        }
        return message;
      },
    });
    return response;
  };

  return { addCountry };
};

export default useAddCountry;

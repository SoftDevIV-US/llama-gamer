import { toast } from 'sonner';

import { UpdateCountryDto } from '@/models/country.model';
import { updateCountryById } from '@/services/country.service';

const useEditCountry = () => {
  const editCountry = (id: string, country: UpdateCountryDto) => {
    const response = toast.promise(updateCountryById(id, country), {
      loading: 'Updating country...',
      success: (res) => `Country ${res.name} updated successfully`,
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

  return { editCountry };
};

export default useEditCountry;

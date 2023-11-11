import { toast } from 'sonner';

import { deleteCountryById } from '@/services/country.service';

const useRemoveCountry = () => {
  const removeCountry = (id: string) => {
    const response = toast.promise(deleteCountryById(id), {
      loading: 'Deleting country...',
      success: (res) => `Country ${res.name} deleted successfully`,
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
  return { removeCountry };
};

export default useRemoveCountry;

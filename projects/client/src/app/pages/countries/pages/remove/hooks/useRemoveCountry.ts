import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { deleteCountryById } from '@/services/country.service';

type Props = {
  id: string;
};

const useRemoveCountry = ({ id }: Props) => {
  const { navigate } = useNavigate();

  const removeCountry = () => {
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
      finally: () => {
        navigate('/admin/countries');
      },
    });
    return response;
  };
  return { removeCountry };
};

export default useRemoveCountry;

import { toast } from 'sonner';

import useNavigate from '@/app/hooks/useNavigate';
import { CreateCategoryDto } from '@/models/category.model';
import { createCategory } from '@/services/category.service';

type Props = {
  setIsNameCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageCorrect: React.Dispatch<React.SetStateAction<boolean>>;
};

const useAddCategory = ({ setIsNameCorrect, setIsImageCorrect }: Props) => {
  const { navigate } = useNavigate();

  const addCategory = (category: CreateCategoryDto) => {
    const response = toast.promise(createCategory(category), {
      loading: 'Creating category...',
      success: (res) => {
        setIsNameCorrect(true);
        setIsImageCorrect(true);
        navigate('/admin/categories');
        return `Category ${res.name} created successfully`;
      },
      error: (err) => {
        const { message } = err.response.data;
        const error = Array.isArray(message) ? message[0] : message;

        if (error.includes('name')) {
          setIsNameCorrect(false);
          setIsImageCorrect(true);
        }
        if (error.includes('image')) {
          setIsImageCorrect(false);
          setIsNameCorrect(true);
        }
        return error;
      },
    });
    return response;
  };

  return { addCategory };
};

export default useAddCategory;

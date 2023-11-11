import { flushSync } from 'react-dom';
import { useNavigate as useReactNavigate } from 'react-router-dom';

const useNavigate = () => {
  const nav = useReactNavigate();

  function navigate(path: number): void;
  function navigate(path: string): void;
  function navigate(path: any): any {
    if (!document.startViewTransition) {
      nav(path);
    } else {
      document.startViewTransition(() => {
        flushSync(() => {
          nav(path);
        });
      });
    }
  }

  return { navigate };
};

export default useNavigate;

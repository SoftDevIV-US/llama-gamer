import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Supplier } from '@/models/supplier.model';
import { getCountryById } from '@/services/country.service';
import { getAllSuppliers } from '@/services/supplier.service';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const useLoadSuppliers = ({ setIsLoading, setIsFound }: Props) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([] as Supplier[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const allSuppliers = await getAllSuppliers();

        toast.promise(
          Promise.all(
            allSuppliers.map(async (supplier) => {
              const countryResponse = await getCountryById(String(supplier.countryId));
              const countryName = countryResponse.name;

              return { ...supplier, country: countryName };
            })
          ),
          {
            loading: 'Loading suppliers...',

            success: (res) => {
              setSuppliers(res);
              setIsFound(true);

              return 'Suppliers loaded successfully';
            },

            error: () => {
              setIsFound(false);

              return 'Error Suppliers not found';
            },
            finally: () => setIsLoading(false),
          }
        );
      } catch (error) {
        setIsFound(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading, setIsFound]);

  return { suppliers };
};

export default useLoadSuppliers;

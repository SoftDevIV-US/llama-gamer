import { useParams } from 'react-router-dom';

import Remove from '@/app/components/remove/Remove';

import useRemoveCountry from './hooks/useRemoveCountry';

function RemoveCountry() {
  const { id } = useParams<{ id: string }>();
  const { removeCountry } = useRemoveCountry({ id: String(id) });

  return (
    <Remove
      acceptAction={() => {
        removeCountry();
      }}
    >
      Country
    </Remove>
  );
}

export default RemoveCountry;

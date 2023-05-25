import { useState } from 'react';
import { SCRATCH_RADIO_GROUP_OPTIONS } from 'constants/index';

const useCreateGrid = () => {
  const DEFAULT_CLOUD_PROVIDER = SCRATCH_RADIO_GROUP_OPTIONS[0];

  const [currentSelectedCloudProvider, setCurrentCloudProvider] = useState(
    DEFAULT_CLOUD_PROVIDER
  );

  return {
    currentSelectedCloudProvider,
    setCurrentCloudProvider
  };
};

export default useCreateGrid;

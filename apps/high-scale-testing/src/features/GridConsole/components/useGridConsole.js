import { useEffect, useState } from 'react';

const useGridConsole = () => {
  const [currentListingType, setCurrentListingType] = useState('grids');

  useEffect(() => {
    setCurrentListingType('grids');
  }, []);

  return {
    currentListingType,
    setCurrentListingType
  };
};

export default useGridConsole;

import { useEffect, useState } from 'react';

const useGridConsole = () => {
  const [currentListingType, setCurrentListingType] = useState({
    index: 0,
    name: 'Grids',
    value: 'grids'
  });

  useEffect(() => {
    setCurrentListingType({
      index: 0,
      name: 'Grids',
      value: 'grids'
    });
  }, []);

  return {
    currentListingType,
    setCurrentListingType
  };
};

export default useGridConsole;

import { useEffect, useState } from 'react';

const useGridConsole = () => {
  const [currentListingType, setCurrentListingType] = useState({
    index: 0,
    name: 'Grids',
    value: 'grids'
  });
  const [showCreateGridCLIModal, setShowCreateGridCLIModal] = useState(false);

  const createGridBtnHandler = () => {
    setShowCreateGridCLIModal(true);
  };

  useEffect(() => {
    setCurrentListingType({
      index: 0,
      name: 'Grids',
      value: 'grids'
    });
  }, []);

  return {
    createGridBtnHandler,
    currentListingType,
    setCurrentListingType,
    setShowCreateGridCLIModal,
    showCreateGridCLIModal
  };
};

export default useGridConsole;

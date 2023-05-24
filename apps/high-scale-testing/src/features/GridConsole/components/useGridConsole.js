import { useEffect, useState } from 'react';

const useGridConsole = () => {
  const [currentListingType, setCurrentListingType] = useState('grids');
  const [showCreateGridCLIModal, setShowCreateGridCLIModal] = useState(false);

  const createGridBtnHandler = () => {
    setShowCreateGridCLIModal(true);
  };

  useEffect(() => {
    setCurrentListingType('grids');
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

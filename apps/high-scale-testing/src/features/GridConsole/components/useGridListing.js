import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getGridsData } from '../slices/selector';

const useGridListing = () => {
  const isRounded = true;
  const CLI_COMMAND = 'browserstack-cli ats delete grid --grid-id ';
  const HELM_COMMAND = 'helm uninstall ';

  // All Store variables:
  const gridList = useSelector(getGridsData);

  // All State Variables:
  const [activeGridName, setActiveGridName] = useState(null);
  const [activeGridIdentifier, setActiveGridIdentifier] = useState(null);
  const [deletionCommand, setDeletionCommand] = useState(null);
  const [showDeleteGridModal, setShowDeleteGridModal] = useState(false);

  const tableCellWrapperClassName =
    'text-xs px-6 py-3 text-base-500 font-medium';

  const closeDeleteGridModal = () => {
    setShowDeleteGridModal(false);
  };

  const deleteDropDownClickHandler = (
    gridIdentifer,
    gridName,
    gridSpawnedVia
  ) => {
    setActiveGridName(gridName);
    setActiveGridIdentifier(gridIdentifer);

    if (gridSpawnedVia.toLowerCase() === 'helm') {
      setDeletionCommand(`${HELM_COMMAND} ${gridName}`);
    } else if (gridSpawnedVia.toLowerCase() === 'cli') {
      setDeletionCommand(`${CLI_COMMAND} ${gridIdentifer}`);
    }
    setShowDeleteGridModal(true);
  };

  useEffect(() => {
    if (!showDeleteGridModal) {
      setActiveGridName(null);
      setActiveGridIdentifier(null);
    }
  }, [showDeleteGridModal]);

  return {
    activeGridName,
    activeGridIdentifier,
    closeDeleteGridModal,
    deleteDropDownClickHandler,
    deletionCommand,
    gridList,
    isRounded,
    showDeleteGridModal,
    tableCellWrapperClassName
  };
};

export { useGridListing };

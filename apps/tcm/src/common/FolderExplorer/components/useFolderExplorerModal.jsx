import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { injectFolderToParent } from 'utils/folderHelpers';

const useFolderExplorerModal = ({
  allFolders,
  confirmButtonCb,
  moveFolderOptions,
  projectId,
  show
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // related to folder explorer
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [primaryMoveLocation, setPrimaryMoveLocation] = useState(
    moveFolderOptions[0].id
  );
  const [internalAllFolders, setInternalAllFolders] = useState(null);

  // related to add folder modal
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [parentFolderId, setParentFolderId] = useState(null);

  const handleCreateFolderButtonClick = () => {
    setParentFolderId(null);
    setShowAddFolderModal(true);
  };

  const hideAddFolderModalHandler = () => {
    setShowAddFolderModal(false);
  };

  const handleActionClick = ({ folder, selectedOption }) => {
    setShowAddFolderModal(true);
    if (selectedOption?.id === 'add_folder') setParentFolderId(folder?.id);
  };

  const handleConfirmButtonClick = () => {
    confirmButtonCb?.({
      folderExplorerProjectId: projectId,
      internalAllFolders,
      primaryMoveLocation,
      selectedFolder
    });
  };

  const handleNewFolderCreated = (folder, parentId) => {
    if (!parentId)
      setInternalAllFolders(
        internalAllFolders ? [...internalAllFolders, folder] : [folder]
      );
    // root folder
    else {
      // sub folder
      const updatedFolders = injectFolderToParent(
        internalAllFolders,
        folder,
        parentId
      );
      setInternalAllFolders(updatedFolders);
    }
  };

  useEffect(() => {
    if (show) {
      setInternalAllFolders(allFolders);
      setPrimaryMoveLocation(moveFolderOptions[0].id);
      setSelectedFolder(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return {
    dispatch,
    handleActionClick,
    handleConfirmButtonClick,
    handleCreateFolderButtonClick,
    handleNewFolderCreated,
    hideAddFolderModalHandler,
    internalAllFolders,
    navigate,
    parentFolderId,
    primaryMoveLocation,
    selectedFolder,
    setInternalAllFolders,
    setPrimaryMoveLocation,
    setSelectedFolder,
    showAddFolderModal
  };
};

export default useFolderExplorerModal;

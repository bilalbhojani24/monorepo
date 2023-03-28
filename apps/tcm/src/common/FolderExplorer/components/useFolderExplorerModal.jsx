import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useFolderExplorerModal = ({
  projectId,
  selectedFolder,
  confirmButtonCb,
  internalAllFolders,
  primaryMoveLocation
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  return {
    navigate,
    dispatch,
    handleCreateFolderButtonClick,
    handleActionClick,
    hideAddFolderModalHandler,
    showAddFolderModal,
    parentFolderId,
    handleConfirmButtonClick
  };
};

export default useFolderExplorerModal;

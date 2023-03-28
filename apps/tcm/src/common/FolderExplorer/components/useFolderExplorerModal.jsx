import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useFolderExplorerModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [parentFolderId, setParentFolderId] = useState(null);

  const handleCreateFolderButtonClick = () => {
    setParentFolderId(null);
    setShowAddFolderModal(true);
  };

  const hideModalHandler = () => {
    setShowAddFolderModal(false);
  };

  const handleActionClick = ({ folder, selectedOption }) => {
    setShowAddFolderModal(true);
    if (selectedOption?.id === 'add_folder') setParentFolderId(folder?.id);
  };

  return {
    navigate,
    dispatch,
    handleCreateFolderButtonClick,
    handleActionClick,
    hideModalHandler,
    showAddFolderModal,
    parentFolderId
  };
};

export default useFolderExplorerModal;

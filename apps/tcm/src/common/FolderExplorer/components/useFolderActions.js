import { useState } from 'react';
import { deleteFolder } from 'api/folders.api';

import { folderDropOptions } from '../const/folderConst';

const useFolderActions = ({ hideModal }) => {
  const deleteFolderHandler = () => {
    // setOpenedModal(null);
    hideModal();
  };

  return {
    deleteFolderHandler
  };
};

export default useFolderActions;

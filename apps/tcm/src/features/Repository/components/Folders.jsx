import React from 'react';
import { CreateNewFolderOutlinedIcon } from 'assets/icons';
import { TMButton } from 'common/bifrostProxy';
import FolderExplorer from 'common/FolderExplorer';

import AddFolderModal from './AddFolderModal';
import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  const {
    projectId,
    folderId,
    allFolders,
    isAddFolderModalVisible,
    showAddFolderModal,
    folderClickHandler,
    folderUpdateHandler
  } = useFolders();

  return (
    <div className="flex h-full flex-col items-stretch">
      <AddFolderModal show={isAddFolderModalVisible} projectId={projectId} />
      <div className="border-base-300 flex items-center border-b p-3">
        <span className="text-base">Folders</span>
        <TMButton
          buttonType="half-rounded-button"
          variant="primary"
          colors="white"
          wrapperClassName="ml-2"
          size="extra-small"
          onClick={showAddFolderModal}
        >
          <CreateNewFolderOutlinedIcon className="text-base-500" />
        </TMButton>
      </div>
      <div className="flex h-full w-full flex-col items-stretch overflow-y-auto">
        <FolderExplorer
          projectId={projectId}
          folderId={folderId}
          allFolders={allFolders}
          actionsEnabled
          onFolderClick={folderClickHandler}
          onFoldersUpdate={folderUpdateHandler}
        />
      </div>
    </div>
  );
}

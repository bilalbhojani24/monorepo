import React from 'react';
import { CreateNewFolderOutlinedIcon } from 'assets/icons';
import { TMButton } from 'common/bifrostProxy';
import FolderExplorer from 'common/FolderExplorer';

import { addFolderModalKey, folderDropOptions } from '../const/folderConst';

import AddFolderModal from './AddFolderModal';
import DeleteFolder from './DeleteFolder';
import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  const {
    openedFolderModal,
    projectId,
    folderId,
    allFolders,
    showAddFolderModal,
    folderClickHandler,
    folderUpdateHandler,
    folderActionsHandler
  } = useFolders();

  return (
    <div className="flex h-full flex-col items-stretch">
      <AddFolderModal
        show={openedFolderModal?.modal === addFolderModalKey}
        projectId={projectId}
      />
      <AddFolderModal
        isSubFolder
        folderId={openedFolderModal?.folder?.id}
        show={openedFolderModal?.modal === folderDropOptions[0].body}
        projectId={projectId}
      />
      <DeleteFolder
        show={openedFolderModal?.modal === folderDropOptions[4].body}
        projectId={projectId}
      />
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
          actionOptions={folderDropOptions}
          actionClickHandler={folderActionsHandler}
        />
      </div>
    </div>
  );
}

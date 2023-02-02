import React from 'react';
import { CreateNewFolderOutlinedIcon, SourceOutlinedIcon } from 'assets/icons';
import { TMButton, TMEmptyState } from 'common/bifrostProxy';
import FolderExplorer from 'common/FolderExplorer';

import { addFolderModalKey, folderDropOptions } from '../const/folderConst';

import AddEditFolderModal from './AddEditFolderModal';
import DeleteFolder from './DeleteFolder';
import FolderExplorerModal from './FolderExplorerModal';
import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  const {
    openedFolderModal,
    projectId,
    folderId,
    allFolders,
    showAddFolderModal,
    updateRouteHelper,
    folderUpdateHandler,
    folderActionsHandler,
    moveFolderOnOkHandler,
    hideFolderModal
  } = useFolders();

  return (
    <div className="flex h-full flex-col items-stretch">
      <AddEditFolderModal
        show={openedFolderModal?.modal === addFolderModalKey}
        projectId={projectId}
      />
      <AddEditFolderModal
        isSubFolder
        folderId={openedFolderModal?.folder?.id}
        show={openedFolderModal?.modal === folderDropOptions[1].body}
        projectId={projectId}
      />
      <FolderExplorerModal
        show={openedFolderModal?.modal === folderDropOptions[2].body}
        heading="Move Folder"
        subHeading="Choose desired folder where you want to move the folder:"
        alertText="The selected folder will be moved from the current location to the above selected folder."
        onOK={moveFolderOnOkHandler}
        onClose={hideFolderModal}
      />
      <AddEditFolderModal
        isEditFolder
        currentData={openedFolderModal?.folder}
        folderId={openedFolderModal?.folder?.id}
        show={openedFolderModal?.modal === folderDropOptions[3].body}
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
        {allFolders.length ? (
          <FolderExplorer
            projectId={projectId}
            folderId={folderId}
            allFolders={allFolders}
            actionsEnabled
            onFolderClick={updateRouteHelper}
            onFoldersUpdate={folderUpdateHandler}
            actionOptions={folderDropOptions}
            actionClickHandler={folderActionsHandler}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-stretch justify-center">
            <TMEmptyState
              title="Create New Folder"
              description="You can get started by creating test cases/folders by entering details below."
              mainIcon={<SourceOutlinedIcon className="!h-12 !w-12" />}
              buttonProps={{
                  colors:"white",
                  children: 'Create Folder',
                onClick: showAddFolderModal
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

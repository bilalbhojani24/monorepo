/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import {
  CreateNewFolderOutlinedIcon,
  FindInPageOutlinedIcon,
  SourceOutlinedIcon
} from 'assets/icons';
import { TMButton, TMEmptyState } from 'common/bifrostProxy';
import FolderExplorer from 'common/FolderExplorer';
import Loader from 'common/Loader';

import { addFolderModalKey, folderDropOptions } from '../const/folderConst';

import AddEditFolderModal from './AddEditFolderModal';
import DeleteFolder from './DeleteFolder';
import FolderExplorerModal from './FolderExplorerModal';
import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  const {
    isFoldersLoading,
    testCasesCount,
    isSearchFilterView,
    filterSearchMeta,
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
    <div className="flex h-full w-full shrink-0 grow flex-col items-start overflow-hidden">
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
      {allFolders.length || isSearchFilterView || isFoldersLoading ? (
        <>
          <div className="border-base-300 flex w-full items-center border-b p-3">
            <span className="text-base">Folders</span>
            <TMButton
              buttonType="half-rounded-button"
              variant="primary"
              colors="white"
              wrapperClassName="ml-2 p-2"
              size="extra-small"
              onClick={showAddFolderModal}
            >
              <CreateNewFolderOutlinedIcon className="text-base-500  !h-5 !w-5" />
            </TMButton>
          </div>

          <div className="flex h-full w-full flex-1 shrink  flex-col overflow-y-auto">
            {isFoldersLoading ? (
              <Loader wrapperClass="h-full" />
            ) : (
              <>
                {!isSearchFilterView ? (
                  <FolderExplorer
                    projectId={projectId}
                    folderId={folderId}
                    allFolders={allFolders}
                    actionsEnabled
                    onFolderClick={updateRouteHelper}
                    onFoldersUpdate={folderUpdateHandler}
                    actionOptions={folderDropOptions}
                    actionClickHandler={folderActionsHandler}
                    isSingleSelect
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
                    <TMEmptyState
                      // title=""
                      title={`We found ${testCasesCount} Search Results for '${
                        filterSearchMeta?.searchKey || ''
                      }' across all folders`}
                      mainIcon={
                        <FindInPageOutlinedIcon className="text-base-400 !h-12 !w-12" />
                      }
                      buttonProps={null}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-stretch justify-center">
          <TMEmptyState
            title="Create New Folder"
            description="You can get started by creating test cases/folders by entering details below."
            mainIcon={<SourceOutlinedIcon className="!h-12 !w-12" />}
            buttonProps={{
              children: 'Create Folder',
              onClick: showAddFolderModal,
              colors: 'white'
            }}
          />
        </div>
      )}
    </div>
  );
}

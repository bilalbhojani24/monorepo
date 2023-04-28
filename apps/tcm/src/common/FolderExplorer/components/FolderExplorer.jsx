// if folderId and allFolders are null, allFolders will be fetched by the component itself using th projectId
// if folderId provided then the selected folder will be based on that param

import React from 'react';
import { MdOutlineCreateNewFolder } from '@browserstack/bifrost';
import { TMEmptyState } from 'common/bifrostProxy';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';

import ConrolledNestedTree from './ConrolledNestedTree';
import useFolderExplorer from './useFolderExplorer';

const FolderExplorer = ({
  actionsEnabled,
  allFolders,
  projectId,
  folderId,
  onFolderClick,
  onFoldersUpdate,
  actionOptions,
  actionClickHandler,
  isSingleSelect,
  isAddFoldersEnabled,
  onAddNewFolderClick
  // disabledFolders // these folders wont be able to be selected/opened
}) => {
  const {
    isInitialFetchDone,
    selectedNodesId,
    folderClickHandler,
    foldersArray,
    subFolderOpenHandler
  } = useFolderExplorer({
    allFolders,
    projectId,
    folderId,
    onFolderClick,
    onFoldersUpdate,
    isSingleSelect
  });

  return (
    <>
      {isAddFoldersEnabled && isInitialFetchDone && !foldersArray.length ? (
        <div className="mt-10 flex w-full flex-col items-center justify-center">
          <div className="w-64">
            <TMEmptyState
              title={<p className="text-base-800">Add Folders</p>}
              description="No folders available. Create a folder by clicking on the button below"
              mainIcon={
                <MdOutlineCreateNewFolder className="text-base-400 m-auto h-12 w-12" />
              }
              buttonProps={{
                children: 'Create Folder',
                onClick: () => onAddNewFolderClick(true),
                colors: 'white'
              }}
            />
          </div>
        </div>
      ) : (
        <>
          {foldersArray.length ? (
            <ConrolledNestedTree
              actionOptions={actionOptions}
              foldersArray={foldersArray}
              actionsEnabled={actionsEnabled}
              onFolderClick={folderClickHandler}
              onFolderOpen={subFolderOpenHandler}
              onActionClick={actionClickHandler}
              // disabledFolders={disabledFolders}
              selectedNodesId={
                folderId ? [parseInt(folderId, 10)] : selectedNodesId
              }
            />
          ) : (
            <div className="flex h-3/4 items-center justify-center">
              <Loader />
            </div>
          )}
        </>
      )}
    </>
  );
};

FolderExplorer.propTypes = {
  allFolders: PropTypes.arrayOf(PropTypes.object),
  onFolderClick: PropTypes.func,
  onFoldersUpdate: PropTypes.func,
  actionClickHandler: PropTypes.func,
  onAddNewFolderClick: PropTypes.func,
  projectId: PropTypes.string,
  folderId: PropTypes.string,
  actionsEnabled: PropTypes.bool,
  isSingleSelect: PropTypes.bool,
  isAddFoldersEnabled: PropTypes.bool,
  actionOptions: PropTypes.arrayOf(PropTypes.object)
  // disabledFolders: PropTypes.arrayOf(PropTypes.number)
};

FolderExplorer.defaultProps = {
  allFolders: [],
  projectId: null,
  folderId: null,
  onFolderClick: () => {},
  onFoldersUpdate: () => {},
  actionClickHandler: () => {},
  onAddNewFolderClick: () => {},
  actionsEnabled: false,
  isSingleSelect: true,
  isAddFoldersEnabled: false,
  actionOptions: []
  // disabledFolders: []
};

export default FolderExplorer;

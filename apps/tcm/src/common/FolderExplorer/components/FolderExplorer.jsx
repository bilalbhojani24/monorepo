// if folderId and allFolders are null, allFolders will be fetched by the component itself using th projectId
// if folderId provided then the selected folder will be based on that param

import React from 'react';
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
  isSingleSelect
  // disabledFolders // these folders wont be able to be selected/opened
}) => {
  const {
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
  );
};

FolderExplorer.propTypes = {
  allFolders: PropTypes.arrayOf(PropTypes.object),
  onFolderClick: PropTypes.func,
  onFoldersUpdate: PropTypes.func,
  actionClickHandler: PropTypes.func,
  projectId: PropTypes.string,
  folderId: PropTypes.string,
  actionsEnabled: PropTypes.bool,
  isSingleSelect: PropTypes.bool,
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
  actionsEnabled: false,
  isSingleSelect: true,
  actionOptions: []
  // disabledFolders: []
};

export default FolderExplorer;

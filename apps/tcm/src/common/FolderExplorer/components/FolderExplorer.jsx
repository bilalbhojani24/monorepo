// if folderId and allFolders are null, allFolders will be fetched by the component itself using th projectId

import React from 'react';
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
  actionClickHandler
}) => {
  const { folderClickHandler, foldersArray, subFolderOpenHandler, hideModal } =
    useFolderExplorer({
      allFolders,
      projectId,
      folderId,
      onFolderClick,
      onFoldersUpdate
    });

  return (
    <>
      <ConrolledNestedTree
        actionOptions={actionOptions}
        foldersArray={foldersArray}
        actionsEnabled={actionsEnabled}
        onFolderClick={folderClickHandler}
        onFolderOpen={subFolderOpenHandler}
        onActionClick={actionClickHandler}
      />
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
  actionOptions: PropTypes.arrayOf(PropTypes.object)
};

FolderExplorer.defaultProps = {
  allFolders: [],
  projectId: null,
  folderId: null,
  onFolderClick: () => {},
  onFoldersUpdate: () => {},
  actionClickHandler: () => {},
  actionsEnabled: false,
  actionOptions: []
};

export default FolderExplorer;

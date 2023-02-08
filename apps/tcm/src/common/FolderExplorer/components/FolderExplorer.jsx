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
  actionClickHandler,
  isSingleSelect
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
      <ConrolledNestedTree
        actionOptions={actionOptions}
        foldersArray={foldersArray}
        actionsEnabled={actionsEnabled}
        onFolderClick={folderClickHandler}
        onFolderOpen={subFolderOpenHandler}
        onActionClick={actionClickHandler}
        selectedNodesId={selectedNodesId}
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
  isSingleSelect: PropTypes.bool,
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
  isSingleSelect: true,
  actionOptions: []
};

export default FolderExplorer;

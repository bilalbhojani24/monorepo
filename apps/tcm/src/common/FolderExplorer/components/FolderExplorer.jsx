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
  onFoldersUpdate
}) => {
  const { folderClickHandler, foldersArray, subFolderOpenHandler } =
    useFolderExplorer({
      allFolders,
      projectId,
      folderId,
      onFolderClick,
      onFoldersUpdate
    });

  return (
    <div className="w-full">
      <ConrolledNestedTree
        foldersArray={foldersArray}
        actionsEnabled={actionsEnabled}
        onFolderClick={folderClickHandler}
        onFolderOpen={subFolderOpenHandler}
      />
    </div>
  );
};

FolderExplorer.propTypes = {
  allFolders: PropTypes.arrayOf(PropTypes.object),
  onFolderClick: PropTypes.func,
  onFoldersUpdate: PropTypes.func,
  projectId: PropTypes.string,
  folderId: PropTypes.string,
  actionsEnabled: PropTypes.bool
};

FolderExplorer.defaultProps = {
  allFolders: [],
  projectId: null,
  folderId: null,
  onFolderClick: () => {},
  onFoldersUpdate: () => {},
  actionsEnabled: false
};

export default FolderExplorer;

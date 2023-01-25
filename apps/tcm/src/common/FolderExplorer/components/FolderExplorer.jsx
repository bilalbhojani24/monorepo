// if folderId and allFolders are null, allFolders will be fetched by the component itself using th projectId

import React from 'react';
import PropTypes from 'prop-types';

import { folderDropOptions } from '../const/folderConst';

import ConrolledNestedTree from './ConrolledNestedTree';
import DeleteFolder from './DeleteFolder';
import useFolderActions from './useFolderActions';
import useFolderExplorer from './useFolderExplorer';

const FolderExplorer = ({
  actionsEnabled,
  allFolders,
  projectId,
  folderId,
  onFolderClick,
  onFoldersUpdate
}) => {
  const {
    openedModal,
    folderClickHandler,
    foldersArray,
    subFolderOpenHandler,
    actionClickHandler,
    hideModal
  } = useFolderExplorer({
    allFolders,
    projectId,
    folderId,
    onFolderClick,
    onFoldersUpdate
  });

  return (
    <>
      <ConrolledNestedTree
        foldersArray={foldersArray}
        actionsEnabled={actionsEnabled}
        onFolderClick={folderClickHandler}
        onFolderOpen={subFolderOpenHandler}
        onActionClick={actionClickHandler}
      />
      <DeleteFolder
        show={openedModal === folderDropOptions[4]?.body}
        hideModal={hideModal}
      />
    </>
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

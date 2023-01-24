import React from 'react';
import PropTypes from 'prop-types';

import ConrolledNestedTree from './ConrolledNestedTree';
import useFolderExplorer from './useFolderExplorer';

const FolderExplorer = ({ allFolders, projectId, onFolderClick }) => {
  const { folderClickHandler, foldersArray } = useFolderExplorer({
    allFolders,
    projectId,
    onFolderClick,
  });

  return (
    <div className="w-full">
      <ConrolledNestedTree foldersArray={foldersArray} />
    </div>
  );
};

FolderExplorer.propTypes = {
  allFolders: PropTypes.arrayOf(PropTypes.object),
  onFolderClick: PropTypes.func,
  projectId: PropTypes.string,
};

FolderExplorer.defaultProps = {
  allFolders: [],
  projectId: null,
  onFolderClick: () => {},
};

export default FolderExplorer;

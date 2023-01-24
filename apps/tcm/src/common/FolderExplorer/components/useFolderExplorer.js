import { useEffect, useState } from 'react';

const useFolderExplorer = ({ projectId, onFolderClick, allFolders }) => {
  const [foldersArray, setFoldersArray] = useState([]);
  const folderClickHandler = (item) => {
    onFolderClick(item);
  };

  useEffect(() => {
    setFoldersArray(allFolders);
  }, [allFolders]);

  return { foldersArray, folderClickHandler };
};
export default useFolderExplorer;

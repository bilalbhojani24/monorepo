import { useEffect, useState } from 'react';

const useFolderExplorer = ({ onFolderClick, allFolders }) => {
  const [foldersArray, setFoldersArray] = useState([]);
  const folderClickHandler = (selectedFolder) => {
    setFoldersArray(
      foldersArray.map((item) =>
        item.id === selectedFolder.id
          ? { ...item, isSelected: true, isOpened: true }
          : { ...item, isSelected: false, isOpened: false }
      )
    );
    onFolderClick(selectedFolder);
  };

  useEffect(() => {
    setFoldersArray(
      allFolders.map((item) => ({
        ...item,
        isSelected: false,
        isOpened: false
      }))
    );
  }, [allFolders]);

  return { foldersArray, folderClickHandler };
};
export default useFolderExplorer;

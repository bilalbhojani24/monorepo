import { useEffect, useState } from 'react';

const useFolderExplorer = ({
  folderId,
  projectId,
  onFolderClick,
  allFolders,
}) => {
  const [foldersArray, setFoldersArray] = useState([]);

  const folderClickHandler = (selectedFolder) => {
    setFoldersArray(
      foldersArray.map((item) =>
        item.id === selectedFolder.id
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false },
      ),
    );
    onFolderClick(selectedFolder);
  };

  useEffect(() => {
    setFoldersArray(
      allFolders.map((item) => ({
        ...item,
        isSelected: `${item.id}` === folderId,
        isOpened: false,
      })),
    );
  }, [allFolders]);

  return { foldersArray, folderClickHandler };
};
export default useFolderExplorer;

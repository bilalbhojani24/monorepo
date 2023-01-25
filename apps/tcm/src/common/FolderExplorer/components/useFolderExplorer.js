import { useEffect, useState } from 'react';
import { getFolders } from 'api/folders.api';

const useFolderExplorer = ({
  folderId,
  projectId,
  onFolderClick,
  allFolders
}) => {
  const [foldersArray, setFoldersArray] = useState([]);

  const folderClickHandler = (selectedFolder) => {
    setFoldersArray(
      foldersArray.map((item) =>
        item.id === selectedFolder.id
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
    onFolderClick(selectedFolder);
  };

  const fetchAllFolders = () => {
    if (projectId && !allFolders && !folderId)
      getFolders({ projectId }).then((data) => {
        setFoldersArray(data?.folders || []);
      });
  };

  useEffect(() => {
    if (allFolders)
      setFoldersArray(
        allFolders.map((item) => ({
          ...item,
          isSelected: `${item.id}` === folderId,
          isOpened: false
        }))
      );
  }, [allFolders, folderId]);

  useEffect(() => {
    fetchAllFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { foldersArray, folderClickHandler };
};
export default useFolderExplorer;

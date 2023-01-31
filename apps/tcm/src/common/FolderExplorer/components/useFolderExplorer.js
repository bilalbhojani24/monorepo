import { useEffect, useState } from 'react';
import { getFolders, getSubFolders } from 'api/folders.api';
import { folderArrayUpdateHelper } from 'utils/folderHelpers';

const useFolderExplorer = ({
  folderId,
  projectId,
  onFolderClick,
  allFolders,
  onFoldersUpdate
}) => {
  const [onLoadFolderSelected, setOnLoadFolderSelection] = useState(false);
  const [foldersArray, setFoldersArray] = useState([]);

  const fireOnFoldersUpdate = (folders, testCases) => {
    onFoldersUpdate(folders, testCases);
  };

  const fetchAllFolders = () => {
    if (projectId && !allFolders && !folderId)
      getFolders({ projectId }).then((data) => {
        setFoldersArray(data?.folders || []);
        fireOnFoldersUpdate(data?.folders);
      });
  };

  const folderClickHandler = (selectedFolder) => {
    setFoldersArray(
      folderArrayUpdateHelper(
        foldersArray,
        selectedFolder.id,
        selectedFolder?.isOpened,
        true,
        selectedFolder?.contents,
        true,
        folderId,
        onFolderClick
      )
    );
    onFolderClick(selectedFolder);
  };

  const subFolderOpenHandler = (openedFolder) => {
    if (!openedFolder?.isOpened) {
      if (openedFolder?.id)
        getSubFolders({ projectId, folderId: openedFolder.id }).then((data) => {
          const newMap = folderArrayUpdateHelper(
            foldersArray,
            openedFolder?.id,
            true,
            false,
            data.folders,
            false,
            folderId,
            onFolderClick
          );
          fireOnFoldersUpdate(newMap, data?.test_cases || []);
          setFoldersArray(newMap);
        });
    } else {
      const newMap = folderArrayUpdateHelper(
        foldersArray,
        openedFolder?.id,
        false,
        openedFolder?.isSelected,
        null,
        false,
        folderId,
        onFolderClick
      );

      setFoldersArray(newMap);
    }
  };

  const initFoldersArray = () => {
    if (allFolders)
      if (!onLoadFolderSelected && folderId) {
        // should only set allFolders on initial load only
        setFoldersArray(
          folderArrayUpdateHelper(
            allFolders,
            folderId,
            false,
            true,
            null,
            false,
            folderId,
            onFolderClick
          )
        );
        setOnLoadFolderSelection(true);
      } else setFoldersArray(allFolders);
  };

  useEffect(() => {
    initFoldersArray();
    // if folderId enabled it will screw up the isSelected functioning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFolders]);

  useEffect(() => {
    fetchAllFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    foldersArray,
    folderClickHandler,
    subFolderOpenHandler
  };
};
export default useFolderExplorer;

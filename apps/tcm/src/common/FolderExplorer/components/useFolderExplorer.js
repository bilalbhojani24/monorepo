import { useEffect, useState } from 'react';
import { getFolders, getSubFolders } from 'api/folders.api';
import { folderArrayUpdateHelper } from 'utils/folderHelpers';

const useFolderExplorer = ({
  folderId,
  projectId,
  onFolderClick,
  allFolders,
  onFoldersUpdate,
  isSingleSelect
}) => {
  const [selectedNodesId, setSelectedNodesId] = useState([]);
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
    if (isSingleSelect) {
      if (selectedFolder?.id) setSelectedNodesId([`${selectedFolder.id}`]);
    } else {
      // multi select TODO
    }
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
        null,
        false,
        folderId,
        onFolderClick
      );

      setFoldersArray(newMap);
    }
  };

  const initFoldersArray = () => {
    if (allFolders) {
      setFoldersArray(allFolders);
    }
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

  useEffect(() => {
    if (isSingleSelect) {
      const thisFolderID = folderId || allFolders[0].id;
      setSelectedNodesId([thisFolderID]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  return {
    selectedNodesId,
    foldersArray,
    folderClickHandler,
    subFolderOpenHandler
  };
};
export default useFolderExplorer;

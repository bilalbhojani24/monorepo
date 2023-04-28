import { useEffect, useState } from 'react';
import { getFolders, getSubFolders } from 'api/folders.api';
import { findFolder, folderArrayUpdateHelper } from 'utils/folderHelpers';

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
  const [isInitialFetchDone, setInitialFetch] = useState(false);

  const fireOnFoldersUpdate = (folders, thisSelectedNodesId, testCases) => {
    onFoldersUpdate(folders, thisSelectedNodesId, testCases);
  };

  const fetchAllFolders = () => {
    if (projectId && !allFolders && !folderId)
      getFolders({ projectId }).then((data) => {
        setFoldersArray(data?.folders || []);
        fireOnFoldersUpdate(data?.folders, selectedNodesId);
        setInitialFetch(true);
      });
  };

  const folderClickHandler = (selectedFolder) => {
    if (isSingleSelect) {
      if (selectedFolder?.id)
        setSelectedNodesId([parseInt(selectedFolder.id, 10)]);
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
          fireOnFoldersUpdate(newMap, selectedNodesId, data?.test_cases || []);
          setFoldersArray(newMap);
        });
    } else {
      if (openedFolder?.contents) {
        // if the current selected folder is in the closing folder
        const isChildrenIDs = selectedNodesId.filter((item) =>
          findFolder(openedFolder.contents, item)
        );
        if (isChildrenIDs.length) {
          if (isSingleSelect)
            setSelectedNodesId([parseInt(openedFolder.id, 10)]);
        } else {
          // TODO multi selection
        }
      }

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
      const thisFolderID = folderId || foldersArray[0]?.id;
      setSelectedNodesId([parseInt(thisFolderID, 10)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  return {
    selectedNodesId,
    foldersArray,
    isInitialFetchDone,
    folderClickHandler,
    subFolderOpenHandler
  };
};
export default useFolderExplorer;

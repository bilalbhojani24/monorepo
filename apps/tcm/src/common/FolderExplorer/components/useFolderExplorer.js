import { useEffect, useState } from 'react';
import { getFolders, getSubFolders } from 'api/folders.api';

const useFolderExplorer = ({
  folderId,
  projectId,
  onFolderClick,
  allFolders,
  onFoldersUpdate
}) => {
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

  const findSelectedFolder = (thisArray, findFolderId) => {
    if (!thisArray || !thisArray.length) return false;
    let selectedItem = null;
    thisArray?.every((item) => {
      if (`${item.id}` === findFolderId) {
        selectedItem = item;
        return false;
      }
      if (item.contents) {
        const matched = findSelectedFolder(item.contents, findFolderId);
        if (matched) {
          selectedItem = matched;
          return false;
        }
      }
      return true;
    });
    return selectedItem;
  };

  const folderArrayUpdateHelper = (
    folders,
    workingFolderId,
    isOpened,
    isSelected,
    newContents,
    level = 0,
    isSelectTriggered
  ) =>
    folders?.map((item) => {
      if (`${item.id}` === `${workingFolderId}`) {
        const isCurrentFolderAChild = findSelectedFolder(
          item.contents,
          folderId
        );
        const thisFolderItem = {
          ...item,
          contents: folderArrayUpdateHelper(
            newContents,
            workingFolderId,
            isOpened,
            false,
            null,
            level + 1,
            isSelectTriggered
          ),
          isOpened,
          isSelected: isCurrentFolderAChild ? true : isSelected // if oneof the current selected item is a child of this folder, then set this folder as the next selected folder
        };
        if (isCurrentFolderAChild) {
          onFolderClick(thisFolderItem);
        }
        return thisFolderItem;
      }

      if (item?.contents?.length) {
        const updatedContents = folderArrayUpdateHelper(
          item.contents,
          workingFolderId,
          isOpened,
          isSelected,
          newContents,
          level + 1,
          isSelectTriggered
        );
        return {
          ...item,
          isSelected: false,
          contents: updatedContents
        };
      }

      return {
        ...item,
        isSelected: isSelectTriggered || isSelected ? false : item?.isSelected // if a not selected folder is closed, then do not clear the isSelected status of other folders
      };
    });

  const folderClickHandler = (selectedFolder) => {
    setFoldersArray(
      folderArrayUpdateHelper(
        foldersArray,
        selectedFolder.id,
        selectedFolder?.isOpened,
        true,
        selectedFolder?.contents,
        0,
        true
      )
    );
    onFolderClick(selectedFolder);
  };

  const subFolderOpenHandler = (openedFolder) => {
    if (!openedFolder?.isOpened) {
      onFolderClick(openedFolder);
      if (openedFolder?.id)
        getSubFolders({ projectId, folderId: openedFolder.id }).then((data) => {
          const newMap = folderArrayUpdateHelper(
            foldersArray,
            openedFolder?.id,
            true,
            true,
            data.folders
          );
          fireOnFoldersUpdate(newMap, data?.test_cases || []);
          setFoldersArray(newMap);
        });
    } else {
      const newMap = folderArrayUpdateHelper(
        foldersArray,
        openedFolder?.id,
        false,
        openedFolder?.isSelected
      );

      setFoldersArray(newMap);
    }
  };

  const initFoldersArray = () => {
    if (allFolders)
      // should only set allFolders on initial load only
      setFoldersArray(allFolders);
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

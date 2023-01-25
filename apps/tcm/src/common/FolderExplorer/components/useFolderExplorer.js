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

  const folderArrayUpdateHelper = (
    folders,
    workingFolderId,
    isOpened,
    isSelected,
    newContents,
    level = 0
  ) =>
    folders.map((item) => {
      if (`${item.id}` === `${workingFolderId}`) {
        return { ...item, contents: newContents, isOpened, isSelected };
      }

      if (item?.contents?.length) {
        const updatedContents = folderArrayUpdateHelper(
          item.contents,
          workingFolderId,
          isOpened,
          isSelected,
          newContents,
          level + 1
        );
        return {
          ...item,
          isSelected:
            !!updatedContents.find((inItem) => inItem.isSelected) || false,
          contents: updatedContents
        };
      }

      return {
        ...item,
        isSelected: false
      };
    });

  const folderClickHandler = (selectedFolder) => {
    setFoldersArray(
      folderArrayUpdateHelper(
        foldersArray,
        selectedFolder.id,
        selectedFolder?.isOpened,
        true,
        selectedFolder?.contents
      )
    );
    onFolderClick(selectedFolder);
  };

  const subFolderOpenHandler = (openedFolder) => {
    if (!openedFolder?.isOpened) {
      folderClickHandler(openedFolder);
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

  useEffect(() => {
    if (allFolders)
      setFoldersArray(
        folderArrayUpdateHelper(allFolders, folderId, false, false)
      );
    // if folderId enabled it will screw up the isSelected functioning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFolders]);

  useEffect(() => {
    fetchAllFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { foldersArray, folderClickHandler, subFolderOpenHandler };
};
export default useFolderExplorer;

export const findSelectedFolder = (thisArray, findFolderId) => {
  if (!thisArray || !thisArray.length) return false;
  let selectedItem = null;
  thisArray?.every((item) => {
    if (item.id === findFolderId) {
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

export const folderArrayUpdateHelper = (
  folders,
  workingFolderId,
  isOpened,
  isSelected,
  newContents,
  isSelectTriggered,
  folderId,
  onFolderClick,
  level = 0
) =>
  folders?.map((item) => {
    if (`${item.id}` === `${workingFolderId}`) {
      const isCurrentFolderAChild = !isOpened
        ? findSelectedFolder(item.contents, parseInt(folderId, 10))
        : false;
      debugger;
      const thisFolderItem = {
        ...item,
        contents: folderArrayUpdateHelper(
          newContents,
          workingFolderId,
          isOpened,
          false,
          null,
          isSelectTriggered,
          folderId,
          onFolderClick,
          level + 1
        ),
        isOpened,
        isSelected: isCurrentFolderAChild ? true : isSelected // if oneof the current selected item is a child of this folder, then set this folder as the next selected folder
      };
      if (isCurrentFolderAChild) {
        onFolderClick?.(thisFolderItem);
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
        isSelectTriggered,
        folderId,
        onFolderClick,
        level + 1
      );
      return {
        ...item,
        isSelected: isSelectTriggered ? false : item?.isSelected,
        contents: updatedContents
      };
    }

    return {
      ...item,
      isSelected: isSelectTriggered || isSelected ? false : item?.isSelected // if a not selected folder is closed, then do not clear the isSelected status of other folders
    };
  });

export const deleteFolderFromArray = (foldersArray, thisFolderID) => {
  let removedArray = foldersArray.filter(
    (thisFolder) => thisFolder.id !== thisFolderID
  );
  if (removedArray.length < foldersArray.length) return removedArray;

  removedArray = foldersArray.map((item) => {
    if (item?.contents)
      return {
        ...item,
        contents: deleteFolderFromArray(item.contents, thisFolderID)
      };
    return item;
  });

  return removedArray;
};

export const injectFolderToParent = (array, toBeInjectedFolder, parentID) =>
  array.map((item) => {
    if (item.id === parentID) {
      if (item?.contents)
        return { ...item, contents: [...item.contents, toBeInjectedFolder] };
      return { ...item, contents: [toBeInjectedFolder] };
    }
    if (item?.contents) {
      return {
        ...item,
        contents: injectFolderToParent(
          item.contents,
          toBeInjectedFolder,
          parentID
        )
      };
    }
    return item;
  });

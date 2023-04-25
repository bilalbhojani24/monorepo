export const findFolder = (thisArray, findFolderId) => {
  if (!thisArray || !thisArray.length) return false;
  let selectedItem = null;
  thisArray?.every((item) => {
    if (item.id === findFolderId) {
      selectedItem = item;
      return false;
    }
    if (item.contents) {
      const matched = findFolder(item.contents, findFolderId);
      if (matched) {
        selectedItem = matched;
        return false;
      }
    }
    return true;
  });
  return selectedItem;
};

export const resetFolderProps = (thisArray) => {
  if (!thisArray || !thisArray.length) return false;

  return thisArray?.map((item) => {
    if (item.contents) {
      return {
        ...item,
        isOpened: false,
        contents: resetFolderProps(item.contents)
      };
    }
    return { ...item, isOpened: false };
  });
};

export const folderArrayUpdateHelper = (
  folders, // all folders
  workingFolderId, // folder to which the changes is to be applied
  isOpened, // is the item to be set to opened"bool
  newContents, // contents value for a folder
  isSelectTriggered, // if the function is called to set Selected State
  folderId, // current selected Folder
  onFolderClick,
  level = 0
) =>
  folders?.map((item) => {
    if (`${item.id}` === `${workingFolderId}`) {
      const isCurrentFolderAChild = !isOpened
        ? findFolder(item.contents, parseInt(folderId, 10))
        : false;
      const thisFolderItem = {
        ...item,
        contents: folderArrayUpdateHelper(
          newContents,
          workingFolderId,
          isOpened,
          null,
          isSelectTriggered,
          folderId,
          onFolderClick,
          level + 1
        ),
        isOpened
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
        newContents,
        isSelectTriggered,
        folderId,
        onFolderClick,
        level + 1
      );
      return {
        ...item,
        contents: updatedContents
      };
    }

    return item;
  });

export const deleteFolderFromArray = (foldersArray, thisFolderID) => {
  let removedArray = foldersArray.filter(
    (thisFolder) => thisFolder.id !== thisFolderID
  );
  if (removedArray.length < foldersArray.length) return removedArray;

  removedArray = foldersArray.map((item) => {
    if (item?.contents) {
      const contents = deleteFolderFromArray(item.contents, thisFolderID);

      return {
        ...item,
        contents,
        sub_folders_count: contents.length || 0
      };
    }
    return item;
  });

  return removedArray;
};

export const injectFolderToParent = (array, toBeInjectedFolder, parentID) =>
  array.map((item) => {
    if (item.id === parentID) {
      const resetedFolder = resetFolderProps([toBeInjectedFolder]);
      const contents = item?.contents
        ? [...item.contents, ...resetedFolder]
        : resetedFolder;

      return { ...item, contents, sub_folders_count: contents.length || 0 };
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

export const replaceFolderHelper = (array, toBeReplacedFolder) =>
  array.map((item) => {
    if (item.id === toBeReplacedFolder.id) {
      if (item?.contents)
        return { ...toBeReplacedFolder, contents: [...item.contents] };
      return { ...toBeReplacedFolder };
    }
    if (item?.contents) {
      return {
        ...item,
        contents: replaceFolderHelper(item.contents, toBeReplacedFolder)
      };
    }
    return item;
  });

// export const findFolderRouted = (thisArray, findFolderId, depth = 0) => {
//   if (!thisArray || !thisArray.length) return false;

//   let selectedItem = null;
//   let ancestors = [];
//   thisArray?.every((item) => {
//     if (item.id === findFolderId) {
//       selectedItem = item;
//       return false;
//     }
//     if (item.contents) {
//       const matched = findFolderRouted(item.contents, findFolderId, depth + 1);
//       if (matched.length) {
//         const thisItem = { ...item };
//         delete thisItem.contents;
//         ancestors = [{ ...thisItem, depth }, ...matched];
//         return false;
//       }
//     }
//     return true;
//   });

//   return ancestors.length ? ancestors : [{ ...selectedItem, depth }];
// };

export const findFolderPath = (thisArray, targetFolderId, folderPath = []) => {
  if (!thisArray || !thisArray.length) return folderPath;

  for (let i = 0; i < thisArray.length; i += 1) {
    console.log('loop through', thisArray[i]);
    if (thisArray[i].id === targetFolderId) {
      console.log('inside equal', thisArray[i].id);
      folderPath.unshift(thisArray[i].name);
      return folderPath;
    }
    if (thisArray[i].contents) {
      console.log('inside contents', thisArray[i].contents);
      const path = findFolderPath(
        thisArray[i].contents,
        targetFolderId,
        folderPath
      );
      if (path.length) folderPath.unshift(thisArray[i].name);

      return folderPath;
    }
  }
  return folderPath;
};

// thisArray.forEach((item) => {
//   if (item.id === targetFolderId) {
//     folderPath.unshift(item.name);
//     return folderPath;
//   }
//   if (item.contents) {
//     const path = findFolderPath(item.contents, targetFolderId, folderPath);
//     if (path.length) folderPath.unshift(item.name);

//     return folderPath;
//   }
//   return [];
// });

// export const findFolderRouted = (thisArray, findFolderId, parentId) => {
//   if (!thisArray || !thisArray.length) return false;

//   let selectedItem = null;
//   let ancestors = [];
//   thisArray?.every((item) => {
//     if (item.id === findFolderId) {
//       selectedItem = item;
//       return false;
//     }
//     if (item.contents) {
//       const matched = findFolderRouted(item.contents, findFolderId, depth + 1);
//       if (matched.length) {
//         const thisItem = { ...item };
//         delete thisItem.contents;
//         ancestors = [{ ...thisItem, depth }, ...matched];
//         return false;
//       }
//     }
//     return true;
//   });

//   return ancestors.length ? ancestors : [{ ...selectedItem, depth }];
// };

export const folderPropertyUpdater = (
  folders, // all folders
  workingFolderId, // folder to which the changes is to be applied
  propertyName, // name of the property to be updated
  propertyValue, // value of the property
  level = 0
) =>
  folders?.map((item) => {
    if (`${item.id}` === `${workingFolderId}`) {
      return {
        ...item,
        [propertyName]: propertyValue
      };
    }

    if (item?.contents?.length) {
      const updatedContents = folderPropertyUpdater(
        item.contents,
        workingFolderId,
        propertyName,
        propertyValue,
        level + 1
      );
      return {
        ...item,
        contents: updatedContents
      };
    }

    return item;
  });

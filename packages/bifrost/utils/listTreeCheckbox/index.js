// recurisvelyIterateALl
const bfsTraversal = (rootNode, onEveryItemCallback) => {
  let queue = rootNode?.contents || [];
  while (queue.length) {
    let childs = [];
    queue.forEach((el) => {
      const doIncludeCurrentItemsChildItems = onEveryItemCallback(el);
      if (el?.contents?.length > 0 && doIncludeCurrentItemsChildItems) {
        childs = childs.concat(el.contents);
      }
    });
    queue = childs;
  }
};

/*
  if 0-0-1 is clicked then it gives list of objects (child-parent-grandparent-grandgrandparent)
*/
const getTargetHierarchyByIndex = (items, targetIndexes) => {
  const indexes = targetIndexes.split('-');
  const targetItem = [];
  // list of items impacted like child, parent, grandparent
  indexes.forEach((el, idx) => {
    if (idx === 0) {
      targetItem.push(items[el]);
    } else {
      targetItem.unshift(targetItem[0].contents[el]);
    }
  });
  return targetItem;
};

const getSearchResultsCustomBSFTraversal = (
  allItemsList,
  searchLogicCallback,
  filteredList
) => {
  const newFilterUUUIDValue = {
    searchedUUIDs: {},
    filteredUUIDsWithHierarchy: {}
  };
  bfsTraversal({ contents: filteredList || allItemsList }, (item) => {
    if (searchLogicCallback(item)) {
      newFilterUUUIDValue.searchedUUIDs[item.uuid] = item;
      const data = getTargetHierarchyByIndex(allItemsList, item.uuid);
      data.forEach((el) => {
        newFilterUUUIDValue.filteredUUIDsWithHierarchy[el.uuid] = el.uuid;
      });
      return false;
    }
    return true;
  });
  return newFilterUUUIDValue;
};

const adjustParentOfClicked = (targetItem) => {
  const newTarget = targetItem;
  for (let i = 1; i < newTarget.length; i += 1) {
    const { contents } = newTarget[i];
    const deepCopyForBreakCheck = { ...targetItem[i] };
    const checked = contents.filter((item) => item.isChecked);
    const indeterminate = contents.some((item) => item.isIndeterminate);
    if (indeterminate) {
      newTarget[i].isIndeterminate = true;
      newTarget[i].isChecked = true;
    } else if (checked.length === contents.length) {
      newTarget[i].isChecked = true;
      newTarget[i].isIndeterminate = false;
    } else if (checked.length === 0) {
      newTarget[i].isChecked = false;
      newTarget[i].isIndeterminate = false;
    } else {
      newTarget[i].isChecked = true;
      newTarget[i].isIndeterminate = true;
    }
    if (
      deepCopyForBreakCheck.isChecked === newTarget[i].isChecked &&
      deepCopyForBreakCheck.isIndeterminate === newTarget[i].isIndeterminate
    ) {
      break;
    }
  }
};

// listTreeCheckboxHelper
const updateTargetNodes = (isChecked, targetIndexes, listOfItems) => {
  const newItems = JSON.parse(JSON.stringify(listOfItems));
  // adjust (check/uncheck) current clicked item
  const targetItem = getTargetHierarchyByIndex(newItems, targetIndexes);
  targetItem[0].isChecked = isChecked;
  targetItem[0].isIndeterminate = false;
  // adjust children of current clicked item
  bfsTraversal(targetItem[0], (item) => {
    const newItem = item;
    newItem.isChecked = isChecked;
    newItem.isIndeterminate = false;
    return true;
  });
  // adjust parents of current clicked items
  adjustParentOfClicked(targetItem);
  return { newItems, targetItem };
};

const getSelectedNodesOnItemSelect = (targetItemVal, newValuesData) => {
  const targetItem = targetItemVal;
  const newValues = newValuesData;
  let inserted = false;
  for (let i = targetItem.length - 1; i >= 0; i -= 1) {
    if (targetItem[i].isIndeterminate === false && !inserted) {
      newValues[targetItem[i].uuid] = targetItem[i];
      bfsTraversal(targetItem[i], (item) => {
        delete newValues[item.uuid];
        return true;
      });
      inserted = true;
    } else if (targetItem[i].isIndeterminate === true) {
      delete newValues[targetItem[i].uuid];
    }
  }
};

const getSelectedListTreeItems = (prevItems, targetItem, isChecked) => {
  const newValues = { ...prevItems };
  if (isChecked) {
    getSelectedNodesOnItemSelect(targetItem, newValues);
  } else {
    for (let i = targetItem.length - 1; i >= 0; i -= 1) {
      if (targetItem[i].isChecked === false) {
        delete newValues[targetItem[i].uuid];
        bfsTraversal(targetItem[i], (item) => {
          delete newValues[item.uuid];
          return true;
        });
        break;
      } else if (targetItem[i].isIndeterminate === true) {
        delete newValues[targetItem[i].uuid];
        bfsTraversal(targetItem[i], (item) => {
          if (item.isChecked === true && item.isIndeterminate === false) {
            newValues[item.uuid] = item;
            return false;
          }
          return true;
        });
      }
    }
  }
  return { selectedValuesAdjusted: newValues };
};

export {
  bfsTraversal,
  getSearchResultsCustomBSFTraversal,
  getSelectedListTreeItems,
  getTargetHierarchyByIndex,
  updateTargetNodes
};

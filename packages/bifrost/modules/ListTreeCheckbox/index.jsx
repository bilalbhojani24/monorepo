/* eslint-disable no-param-reassign */
/* eslint-disable sonarjs/cognitive-complexity */

const iterateAllChildren = (childrenItems, onEveryItemCallback) => {
  let newChildren = [];
  childrenItems.forEach((el) => {
    const doIncludeCurrentItemsChildItems = onEveryItemCallback(el);
    if (el?.contents?.length > 0 && doIncludeCurrentItemsChildItems) {
      newChildren = newChildren.concat(el.contents);
    }
  });
  return newChildren;
};

const iterateAllChildrenRecusively = (parentItem, onEveryItemCallback) => {
  let childrenItems = parentItem?.contents || [];
  let hasMoreChildren = parentItem?.contents?.length;
  while (hasMoreChildren) {
    const childs = iterateAllChildren(childrenItems, onEveryItemCallback);
    if (childs.length === 0) {
      hasMoreChildren = false;
    }
    childrenItems = childs;
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

const ListTreeCheckboxHelper = (isChecked, targetIndexes, listOfItems) => {
  const newItems = JSON.parse(JSON.stringify(listOfItems));
  // adjust (check/uncheck) current clicked item
  const targetItem = getTargetHierarchyByIndex(newItems, targetIndexes);
  targetItem[0].isChecked = isChecked;
  targetItem[0].isIndeterminate = false;
  // adjust children of current clicked item
  iterateAllChildrenRecusively(targetItem[0], (item) => {
    item.isChecked = isChecked;
    item.isIndeterminate = false;
    return true;
  });
  // adjust parents of current clicked items
  for (let i = 1; i < targetItem.length; i += 1) {
    let areAllTrue = true;
    let areAllFalse = true;
    let isAnyChildInderminate = false;
    targetItem[i].contents.forEach((contentItem) => {
      if (contentItem.isIndeterminate === true) {
        isAnyChildInderminate = true;
      }
      if (contentItem.isChecked === true) {
        areAllFalse = false;
      } else if (contentItem.isChecked === false) {
        areAllTrue = false;
      }
    });
    if (targetItem[i].contents.length !== 0) {
      if (isAnyChildInderminate) {
        targetItem[i].isIndeterminate = true;
        targetItem[i].isChecked = true;
      } else if (areAllTrue) {
        targetItem[i].isChecked = true;
        targetItem[i].isIndeterminate = false;
      } else if (areAllFalse) {
        targetItem[i].isChecked = false;
        targetItem[i].isIndeterminate = false;
      } else if (!areAllFalse && !areAllTrue) {
        targetItem[i].isChecked = true;
        targetItem[i].isIndeterminate = true;
      }
    }
  }
  return { newItems, targetItem };
};

const ListTreeSelectionHelper = (prevItems, targetItem, isChecked) => {
  const newValues = { ...prevItems };
  if (isChecked) {
    let inserted = false;
    for (let i = targetItem.length - 1; i >= 0; i -= 1) {
      if (targetItem[i].isIndeterminate === false && !inserted) {
        newValues[targetItem[i].uuid] = targetItem[i];
        iterateAllChildrenRecusively(targetItem[i], (item) => {
          delete newValues[item.uuid];
          return true;
        });
        inserted = true;
      } else if (targetItem[i].isIndeterminate === true) {
        delete newValues[targetItem[i].uuid];
      }
    }
  } else {
    for (let i = targetItem.length - 1; i >= 0; i -= 1) {
      if (targetItem[i].isChecked === false) {
        delete newValues[targetItem[i].uuid];
        iterateAllChildrenRecusively(targetItem[i], (item) => {
          delete newValues[item.uuid];
          return true;
        });
        break;
      } else if (targetItem[i].isIndeterminate === true) {
        delete newValues[targetItem[i].uuid];
        iterateAllChildrenRecusively(targetItem[i], (item) => {
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
  ListTreeCheckboxHelper,
  iterateAllChildren as ListTreeIterateChildren,
  iterateAllChildrenRecusively as ListTreeIterateChildrenRecursively,
  ListTreeSelectionHelper,
  getTargetHierarchyByIndex as ListTreeTargetHierarcyByIndex
};

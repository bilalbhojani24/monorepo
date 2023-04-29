import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import listTreeCheckboxHelper from '../../utils/listTreeCheckbox/index';

const { bfsTraversal, getTargetHierarchyByIndex } = listTreeCheckboxHelper;

const ListTreeRootWrapper = ({
  // filteredUUIDs,
  openNodeMap,
  setOpenNodeMap,
  onSelectCallback,
  data,
  children
}) => {
  const wrapperRef = useRef(null);
  const focusElementByUUID = (uuidToFocus) => {
    document.querySelector(`[data-focus-id="${uuidToFocus}"]`)?.focus();
  };
  const getFocusID = useCallback(() => {
    const { activeElement } = document;
    // get focus id from active element
    const focusId = activeElement?.dataset?.focusId;
    let parentFocusId;
    if (!focusId) {
      // if no focus id then get focus id from closet element which will always be listtreenode div
      parentFocusId =
        activeElement.closest('[data-focus-id]')?.dataset?.focusId;
    }
    // if still no focus consider as root element is focused
    if (!parentFocusId && data?.length > 0) parentFocusId = '0';
    return { focusId, parentFocusId };
  }, [data?.length]);
  const handleArrowRightPress = useCallback(
    (selectedNodeHierarchy) => {
      if (!openNodeMap[selectedNodeHierarchy[0]?.uuid]) {
        // open node if the current focused node is in closed state
        setOpenNodeMap((prev) => {
          const newList = { ...prev };
          newList[selectedNodeHierarchy[0]?.uuid] = true;
          return newList;
        });
      } else if (
        selectedNodeHierarchy[0]?.contents?.length &&
        openNodeMap[selectedNodeHierarchy[0]?.uuid] === true
      ) {
        // focus first child if the state is already open
        focusElementByUUID(selectedNodeHierarchy[0]?.contents[0]?.uuid);
      }
    },
    [openNodeMap, setOpenNodeMap]
  );
  const handleArrowLeftPress = useCallback(
    (selectedNodeHierarchy) => {
      if (openNodeMap[selectedNodeHierarchy[0]?.uuid] === true) {
        // close node if the current focused node is in open state
        setOpenNodeMap((prev) => {
          const newList = { ...prev };
          newList[selectedNodeHierarchy[0]?.uuid] = false;
          return newList;
        });
      } else if (
        selectedNodeHierarchy[1]?.contents?.at(-1)?.uuid ===
        selectedNodeHierarchy[0]?.uuid
      ) {
        // focus parent if the current focused node is the last node
        focusElementByUUID(selectedNodeHierarchy[1].uuid);
      }
    },
    [openNodeMap, setOpenNodeMap]
  );
  const handleSelectionPress = useCallback(
    (focusId) => {
      if (focusId) onSelectCallback(focusId); // init selection callback
    },
    [onSelectCallback]
  );
  const handleHomePress = useCallback((homeId) => {
    focusElementByUUID(homeId); // move focus to first element
  }, []);
  const handleEndPress = useCallback((endId) => {
    focusElementByUUID(endId); // move focus to last element
  }, []);
  const handleArrowUpExceptFirstElement = useCallback(
    (selectedNodeHierarchy) => {
      let targetUUID = null;
      // if it has no hierarchy it has sibling get siblings using some other method
      if (selectedNodeHierarchy[1]) {
        selectedNodeHierarchy[1]?.contents?.forEach((el, index) => {
          if (el.uuid === selectedNodeHierarchy[0]?.uuid) {
            targetUUID = selectedNodeHierarchy[1]?.contents[index - 1]?.uuid;
          }
        });
      } else {
        // item with no hierarchy means that it is one of the root nodes
        data?.forEach((el, index) => {
          if (el.uuid === selectedNodeHierarchy[0]?.uuid && data[index - 1]) {
            targetUUID = data[index - 1]?.uuid;
          }
        });
      }
      if (targetUUID) focusElementByUUID(targetUUID);
    },
    [data]
  );
  const handleArrowUpPress = useCallback(
    (selectedNodeHierarchy) => {
      if (
        selectedNodeHierarchy[1]?.contents?.at(0)?.uuid !==
        selectedNodeHierarchy[0]?.uuid
      ) {
        handleArrowUpExceptFirstElement(selectedNodeHierarchy);
      } else if (selectedNodeHierarchy[1]?.uuid) {
        focusElementByUUID(selectedNodeHierarchy[1]?.uuid);
      }
    },
    [handleArrowUpExceptFirstElement]
  );
  const handleArrowDownExceptThanLastElement = useCallback(
    (selectedNodeHierarchy) => {
      let targetUUID = null;
      if (selectedNodeHierarchy[1]) {
        selectedNodeHierarchy[1]?.contents?.forEach((el, index) => {
          if (el.uuid === selectedNodeHierarchy[0]?.uuid) {
            targetUUID = selectedNodeHierarchy[1]?.contents[index + 1]?.uuid;
          }
        });
      } else {
        // item with no hierarchy means that it is one of the root nodes
        data?.forEach((el, index) => {
          if (el.uuid === selectedNodeHierarchy[0]?.uuid && data[index + 1]) {
            targetUUID = data[index + 1]?.uuid;
          }
        });
      }
      if (targetUUID) focusElementByUUID(targetUUID);
    },
    [data]
  );
  const handleArrowDownPress = useCallback(
    (selectedNodeHierarchy) => {
      if (
        selectedNodeHierarchy[0]?.contents?.length &&
        openNodeMap[selectedNodeHierarchy[0]?.uuid] === true
      ) {
        focusElementByUUID(selectedNodeHierarchy[0]?.contents[0]?.uuid);
      } else if (
        selectedNodeHierarchy[1]?.contents?.at(-1)?.uuid !==
        selectedNodeHierarchy[0]?.uuid
      ) {
        handleArrowDownExceptThanLastElement(selectedNodeHierarchy);
      }
    },
    [handleArrowDownExceptThanLastElement, openNodeMap]
  );
  const handleAsteriskPress = useCallback(
    (listOfItems) => {
      const newOpenNodeMap = { ...openNodeMap };
      bfsTraversal({ contents: listOfItems }, (item) => {
        newOpenNodeMap[item.uuid] = true;
        return true;
      });
      setOpenNodeMap(newOpenNodeMap);
    },
    [openNodeMap, setOpenNodeMap]
  );
  const onKeyPress = useCallback(
    (e) => {
      const { focusId, parentFocusId } = getFocusID();
      if (focusId !== undefined || parentFocusId !== undefined) {
        const selectedNodeHierarchy = getTargetHierarchyByIndex(
          data,
          focusId || parentFocusId
        );
        if (selectedNodeHierarchy?.length === 0) return;
        switch (e.key) {
          case 'ArrowRight':
            handleArrowRightPress(selectedNodeHierarchy);
            break;
          case 'ArrowLeft':
            handleArrowLeftPress(selectedNodeHierarchy);
            break;
          case ' ':
            handleSelectionPress(focusId);
            break;
          case 'Enter':
            handleSelectionPress(focusId);
            break;
          case 'Home':
            handleHomePress(data[0]?.uuid);
            break;
          case 'End':
            handleEndPress(data.at(-1)?.uuid);
            break;
          case '*':
            handleAsteriskPress(data);
            break;
          case 'ArrowUp':
            if (e.ctrlKey) {
              handleHomePress(data[0]?.uuid);
            } else {
              handleArrowUpPress(selectedNodeHierarchy);
            }
            break;
          case 'ArrowDown':
            if (e.ctrlKey) {
              handleEndPress(data.at(-1)?.uuid);
            } else {
              handleArrowDownPress(selectedNodeHierarchy);
            }
            break;
          default:
            break;
        }
      }
    },
    [
      data,
      getFocusID,
      handleArrowDownPress,
      handleArrowLeftPress,
      handleArrowRightPress,
      handleArrowUpPress,
      handleAsteriskPress,
      handleEndPress,
      handleHomePress,
      handleSelectionPress
    ]
  );
  useEffect(() => {
    document.addEventListener('keyup', onKeyPress);
    return () => {
      document.removeEventListener('keyup', onKeyPress);
    };
  }, [data, onKeyPress, onSelectCallback, openNodeMap, setOpenNodeMap]);

  return (
    <div role="tree" tabIndex={0} ref={wrapperRef} aria-busy="true">
      <div role="group">{children}</div>
    </div>
  );
};

ListTreeRootWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string
    })
  ).isRequired,
  setOpenNodeMap: PropTypes.func.isRequired,
  openNodeMap: PropTypes.shape({}).isRequired,
  // filteredUUIDs: PropTypes.any.isRequired,
  onSelectCallback: PropTypes.func.isRequired
};

export default ListTreeRootWrapper;

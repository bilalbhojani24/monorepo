import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import listTreeCheckboxHelper from '../../utils/listTreeCheckbox/index';

const { bfsTraversal, getTargetHierarchyByIndex } = listTreeCheckboxHelper;

const ListTreeRootWrapper = ({
  filteredUUIDs,
  openNodeMap,
  setOpenNodeMap,
  onSelectCallback,
  data,
  focusIDPrefix,
  children
}) => {
  const filteredUUIDsHierarchyArray = useMemo(
    () =>
      filteredUUIDs?.filteredUUIDsWithHierarchy
        ? Object.keys(filteredUUIDs?.filteredUUIDsWithHierarchy)
        : [],
    [filteredUUIDs?.filteredUUIDsWithHierarchy]
  );
  const searchedUUIDsArray = useMemo(
    () =>
      filteredUUIDs?.searchedUUIDs
        ? Object.keys(filteredUUIDs?.searchedUUIDs)
        : [],
    [filteredUUIDs?.searchedUUIDs]
  );
  const getFilteredContents = useCallback(
    (item, selectedNodeHierarchy) => {
      const selectedNodeHierarchyIds = selectedNodeHierarchy?.map(
        (el) => el.uuid
      );
      if (
        selectedNodeHierarchyIds.some((el) => searchedUUIDsArray.includes(el))
      ) {
        return item?.contents;
      }
      if (
        filteredUUIDsHierarchyArray?.length &&
        filteredUUIDsHierarchyArray?.length !== 0
      ) {
        return item?.contents?.filter((el) =>
          filteredUUIDsHierarchyArray.includes(el.uuid)
        );
      }
      return item?.contents;
    },
    [filteredUUIDsHierarchyArray, searchedUUIDsArray]
  );
  const wrapperRef = useRef(null);
  const focusElementByUUID = useCallback(
    (uuidToFocus) => {
      if (uuidToFocus)
        document
          .querySelector(`[data-focus-id="${focusIDPrefix + uuidToFocus}"]`)
          ?.focus();
    },
    [focusIDPrefix]
  );
  const removePrefixFromID = useCallback(
    (uuidToFocus) =>
      uuidToFocus?.includes(focusIDPrefix)
        ? uuidToFocus?.substring(focusIDPrefix.length, uuidToFocus.length)
        : uuidToFocus,
    [focusIDPrefix]
  );
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
    if (!parentFocusId && data?.length > 0) {
      const uuidOfFirstVisibleItem = getFilteredContents(
        { contents: data },
        []
      ).at(0)?.uuid;
      parentFocusId = `${focusIDPrefix}${uuidOfFirstVisibleItem}`;
    }
    const parsedFocusId = removePrefixFromID(focusId);
    const parsedParentFocusId = removePrefixFromID(parentFocusId);
    return { parsedFocusId, parsedParentFocusId };
  }, [data, focusIDPrefix, getFilteredContents, removePrefixFromID]);
  const handleArrowRightPress = useCallback(
    (selectedNodeHierarchy) => {
      const filteredContents = getFilteredContents(
        selectedNodeHierarchy[0],
        selectedNodeHierarchy
      );
      const targetContentHierarchySecond = getFilteredContents(
        selectedNodeHierarchy[1],
        selectedNodeHierarchy
      );
      if (
        !openNodeMap[selectedNodeHierarchy[0]?.uuid] &&
        filteredContents?.length
      ) {
        // open node if the current focused node is in closed state
        setOpenNodeMap((prev) => {
          const newList = { ...prev };
          newList[selectedNodeHierarchy[0]?.uuid] = true;
          return newList;
        });
      } else if (
        filteredContents?.length &&
        openNodeMap[selectedNodeHierarchy[0]?.uuid] === true
      ) {
        // focus first visible child if the state is already open
        const firstVisibleChildUUID = filteredContents?.at(0)?.uuid;
        focusElementByUUID(firstVisibleChildUUID);
      } else if (
        selectedNodeHierarchy?.length === 1 &&
        !filteredContents?.length
      ) {
        // if no children focus next visible parent
        // item with no hierarchy means that it is one of the root nodes
        const filteredItems = getFilteredContents(
          { contents: data },
          selectedNodeHierarchy
        );
        filteredItems?.forEach((el, index) => {
          if (
            el.uuid === selectedNodeHierarchy[0]?.uuid &&
            filteredItems[index + 1]
          ) {
            focusElementByUUID(filteredItems[index + 1]?.uuid);
          }
        });
      } else if (
        targetContentHierarchySecond?.at(-1)?.uuid !==
          selectedNodeHierarchy[0]?.uuid &&
        !filteredContents?.length
      ) {
        // if no child focus the next visible parent
        // item with hierarchy use hierarchy to get siblings
        const filteredItems = getFilteredContents(
          selectedNodeHierarchy[1],
          selectedNodeHierarchy
        );
        filteredItems?.forEach((el, index) => {
          if (el.uuid === selectedNodeHierarchy[0]?.uuid) {
            focusElementByUUID(filteredItems[index + 1]?.uuid);
          }
        });
      }
    },
    [data, focusElementByUUID, getFilteredContents, openNodeMap, setOpenNodeMap]
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
        getFilteredContents(
          selectedNodeHierarchy[1],
          selectedNodeHierarchy.slice(1)
        )?.at(-1)?.uuid === selectedNodeHierarchy[0]?.uuid
      ) {
        // focus parent if the current focused node is the last node
        focusElementByUUID(selectedNodeHierarchy[1].uuid);
      }
    },
    [focusElementByUUID, getFilteredContents, openNodeMap, setOpenNodeMap]
  );
  const handleSelectionPress = useCallback(
    (focusId) => {
      if (focusId) onSelectCallback(focusId); // init selection callback
    },
    [onSelectCallback]
  );
  const handleHomePress = useCallback(
    (homeId) => {
      focusElementByUUID(homeId); // move focus to first element
    },
    [focusElementByUUID]
  );
  const handleEndPress = useCallback(
    (endId) => {
      focusElementByUUID(endId); // move focus to last element
    },
    [focusElementByUUID]
  );
  const handleArrowUpPress = useCallback(
    (selectedNodeHierarchy) => {
      const selectionParentsFirstChildID = getFilteredContents(
        selectedNodeHierarchy[1],
        selectedNodeHierarchy.slice(1)
      )?.at(0)?.uuid;
      if (selectedNodeHierarchy?.length === 1) {
        // item with no hierarchy means that it is one of the root nodes so use data which is array of root nodes.
        const filteredContents = getFilteredContents(
          { contents: data },
          selectedNodeHierarchy
        );
        filteredContents?.forEach((el, index) => {
          if (
            el.uuid === selectedNodeHierarchy[0]?.uuid &&
            filteredContents[index - 1]
          ) {
            focusElementByUUID(filteredContents[index - 1]?.uuid);
          }
        });
      } else if (
        selectionParentsFirstChildID !== undefined &&
        selectionParentsFirstChildID !== selectedNodeHierarchy[0]?.uuid
      ) {
        // if the current selected node is not the first element among the sibling then use parent to get previous visbile sibling
        const filteredContents = getFilteredContents(
          selectedNodeHierarchy[1],
          selectedNodeHierarchy
        );
        filteredContents?.forEach((el, index) => {
          if (el.uuid === selectedNodeHierarchy[0]?.uuid) {
            focusElementByUUID(filteredContents[index - 1]?.uuid);
          }
        });
      } else if (
        selectedNodeHierarchy[1]?.uuid &&
        selectedNodeHierarchy?.length !== 0
      ) {
        // if the current selected node is the first element among siblings and has hierarchy then focus the hierarchy
        focusElementByUUID(selectedNodeHierarchy[1]?.uuid);
      }
    },
    [data, focusElementByUUID, getFilteredContents]
  );
  const handleArrowDownPress = useCallback(
    (selectedNodeHierarchy) => {
      const targetContentHierarchyFirst = getFilteredContents(
        selectedNodeHierarchy[0],
        selectedNodeHierarchy
      );
      const targetContentHierarchySecond = getFilteredContents(
        selectedNodeHierarchy[1],
        selectedNodeHierarchy
      );
      if (
        targetContentHierarchyFirst?.length &&
        openNodeMap[selectedNodeHierarchy[0]?.uuid] === true
      ) {
        // if selected node is open then focus the first visible child
        focusElementByUUID(targetContentHierarchyFirst[0]?.uuid);
      } else if (selectedNodeHierarchy?.length === 1) {
        // item with no hierarchy means that it is one of the root nodes
        const filteredContents = getFilteredContents(
          { contents: data },
          selectedNodeHierarchy
        );
        filteredContents?.forEach((el, index) => {
          if (
            el.uuid === selectedNodeHierarchy[0]?.uuid &&
            filteredContents[index + 1]
          ) {
            focusElementByUUID(filteredContents[index + 1]?.uuid);
          }
        });
      } else if (
        targetContentHierarchySecond?.at(-1)?.uuid !==
        selectedNodeHierarchy[0]?.uuid
      ) {
        // item with hierarchy use hierarchy to get siblings
        const filteredContents = getFilteredContents(
          selectedNodeHierarchy[1],
          selectedNodeHierarchy
        );
        filteredContents?.forEach((el, index) => {
          if (el.uuid === selectedNodeHierarchy[0]?.uuid) {
            focusElementByUUID(filteredContents[index + 1]?.uuid);
          }
        });
      }
    },
    [data, focusElementByUUID, getFilteredContents, openNodeMap]
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
      const { parsedFocusId: focusId, parsedParentFocusId: parentFocusId } =
        getFocusID();
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
    <div role="tree" ref={wrapperRef} aria-busy="true">
      <div role="group">{children}</div>
    </div>
  );
};

ListTreeRootWrapper.defaultProps = {
  focusIDPrefix: ''
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
  filteredUUIDs: PropTypes.shape({
    filteredUUIDsWithHierarchy: {},
    searchedUUIDs: {}
  }).isRequired,
  focusIDPrefix: PropTypes.string,
  onSelectCallback: PropTypes.func.isRequired
};

export default ListTreeRootWrapper;

/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import listTreeCheckboxHelper from '../../utils/listTreeCheckbox/index';

const { getTargetHierarchyByIndex } = listTreeCheckboxHelper;

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
  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    const onKeyPress = (e) => {
      const { activeElement } = document;
      const focusId = activeElement?.dataset?.focusId;
      let parentFocusId;
      if (!focusId) {
        parentFocusId =
          activeElement.closest('[data-focus-id]')?.dataset?.focusId;
      }
      if (!parentFocusId && data?.length > 0) parentFocusId = '0';
      if (focusId !== undefined || parentFocusId !== undefined) {
        const selectedNodeHierarchy = getTargetHierarchyByIndex(
          data,
          focusId || parentFocusId
        );
        if (selectedNodeHierarchy?.length === 0) return;
        switch (e.key) {
          case 'ArrowRight':
            if (!openNodeMap[selectedNodeHierarchy[0]?.uuid]) {
              setOpenNodeMap((prev) => {
                const newList = { ...prev };
                newList[selectedNodeHierarchy[0]?.uuid] = true;
                return newList;
              });
            } else if (
              selectedNodeHierarchy[0]?.contents?.length &&
              openNodeMap[selectedNodeHierarchy[0]?.uuid] === true
            ) {
              focusElementByUUID(selectedNodeHierarchy[0]?.contents[0]?.uuid);
            }
            break;
          case 'ArrowLeft':
            if (openNodeMap[selectedNodeHierarchy[0]?.uuid] === true) {
              setOpenNodeMap((prev) => {
                const newList = { ...prev };
                newList[selectedNodeHierarchy[0]?.uuid] = false;
                return newList;
              });
            } else if (
              selectedNodeHierarchy[1]?.contents?.at(-1)?.uuid ===
              selectedNodeHierarchy[0]?.uuid
            ) {
              focusElementByUUID(selectedNodeHierarchy[1].uuid);
            }
            break;
          case ' ':
            if (focusId) onSelectCallback(focusId);
            break;
          case 'Enter':
            if (focusId) onSelectCallback(focusId);
            break;
          case 'Home':
            focusElementByUUID(data[0]?.uuid); // move focus to first element
            break;
          case 'End':
            focusElementByUUID(data.at(-1)?.uuid); // move focus to last element
            break;
          case 'Asterisk':
            console.log('open all nodes');
            break;
          case 'ArrowUp':
            if (e.ctrlKey) {
              focusElementByUUID(data[0]?.uuid); // move focus to first element
            } else if (
              selectedNodeHierarchy[1]?.contents?.at(0)?.uuid !==
              selectedNodeHierarchy[0]?.uuid
            ) {
              let targetUUID = null;
              // if it has no hierarchy it has sibling get siblings using some other method
              if (selectedNodeHierarchy[1]) {
                selectedNodeHierarchy[1]?.contents?.forEach((el, index) => {
                  if (el.uuid === selectedNodeHierarchy[0]?.uuid) {
                    targetUUID =
                      selectedNodeHierarchy[1]?.contents[index - 1]?.uuid;
                  }
                });
              } else {
                // item with no hierarchy means that it is one of the root nodes
                data?.forEach((el, index) => {
                  if (
                    el.uuid === selectedNodeHierarchy[0]?.uuid &&
                    data[index - 1]
                  ) {
                    targetUUID = data[index - 1]?.uuid;
                  }
                });
              }
              if (targetUUID) focusElementByUUID(targetUUID);
            } else if (selectedNodeHierarchy[1]?.uuid) {
              focusElementByUUID(selectedNodeHierarchy[1]?.uuid);
            }
            break;
          case 'ArrowDown':
            if (e.ctrlKey) {
              focusElementByUUID(data.at(-1)?.uuid); // move focus to last element
            } else if (
              selectedNodeHierarchy[0]?.contents?.length &&
              openNodeMap[selectedNodeHierarchy[0]?.uuid] === true
            ) {
              focusElementByUUID(selectedNodeHierarchy[0]?.contents[0]?.uuid);
            } else if (
              selectedNodeHierarchy[1]?.contents?.at(-1)?.uuid !==
              selectedNodeHierarchy[0]?.uuid
            ) {
              let targetUUID = null;
              if (selectedNodeHierarchy[1]) {
                selectedNodeHierarchy[1]?.contents?.forEach((el, index) => {
                  if (el.uuid === selectedNodeHierarchy[0]?.uuid) {
                    targetUUID =
                      selectedNodeHierarchy[1]?.contents[index + 1]?.uuid;
                  }
                });
              } else {
                // item with no hierarchy means that it is one of the root nodes
                data?.forEach((el, index) => {
                  if (
                    el.uuid === selectedNodeHierarchy[0]?.uuid &&
                    data[index + 1]
                  ) {
                    targetUUID = data[index + 1]?.uuid;
                  }
                });
              }
              if (targetUUID) focusElementByUUID(targetUUID);
            }
            break;
          default:
            break;
        }
      }
    };
    document.addEventListener('keyup', onKeyPress);
    return () => {
      document.removeEventListener('keyup', onKeyPress);
    };
  }, [data, onSelectCallback, openNodeMap, setOpenNodeMap]);

  return (
    <div role="tree" tabIndex={0} ref={wrapperRef} aria-busy="true">
      <div role="group">{children}</div>
    </div>
  );
};

ListTreeRootWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.any.isRequired,
  setOpenNodeMap: PropTypes.any.isRequired,
  openNodeMap: PropTypes.any.isRequired,
  // filteredUUIDs: PropTypes.any.isRequired,
  onSelectCallback: PropTypes.func.isRequired
};

export default ListTreeRootWrapper;

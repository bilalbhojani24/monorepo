import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  ListTree,
  listTreeCheckboxHelper,
  ListTreeNode,
  ListTreeNodeContents,
  MdFolderSpecial,
  MdInsertDriveFile
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yInputField, O11yPopover } from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const {
  updateTargetNodes,
  getSelectedListTreeItems,
  getSearchResultsCustomBSFTraversal
} = listTreeCheckboxHelper;

const ControlledNestedTreeWithCheckbox = ({
  data,
  openNodeMap,
  setOpenNodeMap,
  searchValue,
  filteredUUIDs,
  allowFilter,
  onCheckboxChange,
  isParentSearched,
  indent = 1
}) =>
  data?.map((item) => {
    if (
      allowFilter &&
      !filteredUUIDs?.filteredUUIDsWithHierarchy?.[item.uuid] &&
      !isParentSearched
    ) {
      return null;
    }
    const startIndex = item.name.toLowerCase().indexOf(searchValue);
    const endIndex = startIndex + searchValue.length;
    return (
      <ListTree
        key={item.name}
        indentationLevel={indent}
        isTreeOpen={openNodeMap[item.uuid]}
      >
        <ListTreeNode
          showIcon={false}
          label={
            <Checkbox
              isFullWidthLabel
              inputClassName="w-3 h-3"
              data={{
                label: (
                  <p className="flex items-center">
                    {!isEmpty(item.contents) ? (
                      <MdFolderSpecial className="text-info-400 mr-2 inline-block h-5 w-5 shrink-0 select-none" />
                    ) : (
                      <MdInsertDriveFile className="text-base-400 mr-2 inline-block h-5 w-5 shrink-0 select-none" />
                    )}
                    <span className="text-base-700 mr-2 text-xs leading-5">
                      {searchValue.length && startIndex !== -1 ? (
                        <>
                          {item.name.slice(0, startIndex)}
                          <mark>{item.name.slice(startIndex, endIndex)}</mark>
                          {item.name.slice(endIndex, item.name.length)}
                        </>
                      ) : (
                        item.name
                      )}
                    </span>
                  </p>
                ),
                value: item.uuid
              }}
              border={false}
              indeterminate={item.isIndeterminate}
              checked={item.isChecked}
              onChange={() => {
                onCheckboxChange(!item.isChecked, item);
              }}
              wrapperClassName="py-0"
              labelClassName="w-full flex"
            />
          }
          isNodeSelectable={false}
          onNodeOpen={() => {
            const newOpenNodeMap = { ...openNodeMap };
            if (newOpenNodeMap[item.uuid] !== undefined) {
              newOpenNodeMap[item.uuid] = !openNodeMap[item.uuid];
            } else {
              newOpenNodeMap[item.uuid] = true;
            }
            setOpenNodeMap({ ...newOpenNodeMap });
          }}
          isNodeSelected={false}
          isFocused={false}
          leadingIcon={<></>}
          hideArrowIcon={isEmpty(item.contents)}
        />
        {!!item?.contents && (
          <ListTreeNodeContents isTreeOpen={openNodeMap[item.uuid]}>
            <ControlledNestedTreeWithCheckbox
              openNodeMap={openNodeMap}
              setOpenNodeMap={setOpenNodeMap}
              onCheckboxChange={onCheckboxChange}
              filteredUUIDs={filteredUUIDs}
              allowFilter={allowFilter}
              data={item.contents}
              searchValue={searchValue}
              isParentSearched={
                !!filteredUUIDs?.searchedUUIDs?.[item.uuid] ||
                !!isParentSearched
              }
              indent={1 + indent}
            />
          </ListTreeNodeContents>
        )}
      </ListTree>
    );
  });

const dataItem = {
  uuid: PropTypes.string,
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  contents: PropTypes.arrayOf(PropTypes.shape({}))
};

ControlledNestedTreeWithCheckbox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataItem)).isRequired,
  isParentSearched: PropTypes.bool.isRequired,
  filteredUUIDs: PropTypes.shape({
    filteredUUIDsWithHierarchy: PropTypes.shape({}).isRequired,
    searchedUUIDs: PropTypes.shape({}).isRequired
  }).isRequired,
  allowFilter: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  indent: PropTypes.number
};

ControlledNestedTreeWithCheckbox.defaultProps = {
  indent: 1
};

export const FolderFilter = ({
  listTreeCheckboxData,
  onChange,
  prevSelectedValues
}) => {
  const [listOfItems, setListOfItems] = useState(listTreeCheckboxData);
  const [searchValue, setSearchValue] = useState(''); // Debounce this state for optimal performance
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [selectedValue, setSelectedValue] = useState(prevSelectedValues);

  const [filteredUUIDs, setFilteredUUIDs] = useState({
    searchedUUIDs: {},
    filteredUUIDsWithHierarchy: {}
  });
  const [openNodeMap, setOpenNodeMap] = useState({});

  useEffect(() => {
    setListOfItems(listTreeCheckboxData);
  }, [listTreeCheckboxData]);

  useEffect(() => {
    setSelectedValue(prevSelectedValues);
  }, [prevSelectedValues]);

  const onSearchChange = (e) => {
    const newSearchValue = e.target.value;
    let newFilterUUUIDValue;
    const searchLogicCallback = (item) =>
      item.name.toLowerCase().includes(newSearchValue.toLowerCase());
    if (newSearchValue.includes(searchValue) && searchValue.length > 0) {
      newFilterUUUIDValue = getSearchResultsCustomBSFTraversal(
        listOfItems,
        searchLogicCallback,
        Object.values(filteredUUIDs.searchedUUIDs)
      );
    } else {
      newFilterUUUIDValue = getSearchResultsCustomBSFTraversal(
        listOfItems,
        searchLogicCallback
      );
    }
    const newOpenNodeMap = {};
    Object.keys(newFilterUUUIDValue.filteredUUIDsWithHierarchy).forEach(
      (uuid) => {
        newOpenNodeMap[uuid] = true;
      }
    );
    setOpenNodeMap((prev) => ({ ...prev, ...newOpenNodeMap }));
    setFilteredUUIDs(newFilterUUUIDValue);
    setSearchValue(newSearchValue);
  };

  const onCheckboxChange = (isChecked, targetNode) => {
    const { newItems, targetItem } = updateTargetNodes(
      isChecked,
      targetNode.uuid,
      JSON.parse(JSON.stringify(listOfItems)) // pass a deep copy of the object preferably loadsh deep copy
    );
    const { selectedValuesAdjusted } = getSelectedListTreeItems(
      selectedValue,
      targetItem,
      isChecked
    );
    setSelectedValue(selectedValuesAdjusted);
    setListOfItems(newItems);
    onChange(Object.values(selectedValuesAdjusted)?.map((sValue) => sValue.id));
  };

  const closeFilterPopover = () => {
    setSearchValue('');
    setShowFilterPopover(false);
  };

  const removeSelectedItem = (item) => {
    onCheckboxChange(false, item);
  };

  return (
    <>
      <O11yPopover
        theme="light"
        arrowWidth={0}
        arrowHeight={0}
        placementAlign="end"
        placementSide="bottom"
        size="lg"
        content={
          // eslint-disable-next-line tailwindcss/no-arbitrary-value
          <div className="flex max-h-80 w-[335px] flex-col overflow-hidden">
            <div className="py-2">
              <O11yInputField
                value={searchValue}
                onChange={onSearchChange}
                placeholder="Select..."
                id="select-folders"
              />
            </div>
            <div className="flex-1 overflow-auto pb-2">
              <div className="min-w-min">
                {Object.keys(filteredUUIDs.filteredUUIDsWithHierarchy)
                  .length === 0 && searchValue.length ? (
                  <p className="text-sm">No items matching search results</p>
                ) : (
                  <ControlledNestedTreeWithCheckbox
                    openNodeMap={openNodeMap}
                    setOpenNodeMap={setOpenNodeMap}
                    data={listOfItems}
                    filteredUUIDs={filteredUUIDs}
                    isParentSearched={false}
                    searchValue={searchValue}
                    allowFilter={!!searchValue.length}
                    onCheckboxChange={onCheckboxChange}
                  />
                )}
              </div>
            </div>
          </div>
        }
        show={showFilterPopover}
        onOpenChange={(isOpen) => {
          if (isOpen) setShowFilterPopover(true);
          else closeFilterPopover();
        }}
        wrapperClassName="px-2 py-0"
      >
        <div>
          <div className="mb-1 text-left">
            <span className="text-base-700 text-sm font-medium">Folder</span>
          </div>
          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
          <div
            className={twClassNames(
              'border-base-300 flex min-h-[38px] flex-wrap gap-2 rounded-md border px-3 py-2 shadow',
              {
                "after:content-['Select'] after:text-sm after:font-normal after:text-base-500":
                  isEmpty(Object.values(selectedValue))
              }
            )}
          >
            {Object.values(selectedValue).map((el) => (
              <FileBadge
                key={el.uuid}
                text={el.name}
                hasRemoveButton
                isRounded
                onClose={() => removeSelectedItem(el)}
              />
            ))}
          </div>
        </div>
      </O11yPopover>
    </>
  );
};

FolderFilter.propTypes = {
  listTreeCheckboxData: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
  onChange: PropTypes.func.isRequired,
  prevSelectedValues: PropTypes.objectOf(PropTypes.any)
};

FolderFilter.defaultProps = {
  listTreeCheckboxData: [],
  prevSelectedValues: {}
};

export function FileBadge({
  onClose,
  text,
  wrapperClassName,
  onClick,
  disabled,
  hasRemoveButton
}) {
  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <span
      onClick={handleClick}
      onKeyDown={() => {}}
      role="button"
      tabIndex={-1}
      className={twClassNames(
        'inline-flex items-center font-medium cursor-pointer px-2.5 py-0.5 text-xs bg-base-100 text-base-800 rounded-full pr-0.5 truncate max-w-[150px]',
        {
          'cursor-not-allowed': disabled,
          'hover:bg-base-200': !disabled
        },
        wrapperClassName
      )}
    >
      <span className="truncate" dir="rtl">
        {text}
      </span>
      {hasRemoveButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
          type="button"
          disabled={disabled}
          className={twClassNames(
            'ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full focus:text-white focus:outline-none focus:bg-base-500 text-base-400',
            {
              'cursor-not-allowed': disabled,
              'hover:text-base-500 hover:bg-base-200': !disabled
            }
          )}
        >
          <span className="sr-only">Remove small option</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

FileBadge.propTypes = {
  hasRemoveButton: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

FileBadge.defaultProps = {
  disabled: false,
  onClick: () => {},
  wrapperClassName: ''
};

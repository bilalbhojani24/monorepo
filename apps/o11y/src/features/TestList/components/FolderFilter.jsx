import React, { useMemo, useState } from 'react';
import {
  Checkbox,
  ListTree,
  ListTreeIterateChildrenRecursively,
  ListTreeNode,
  ListTreeNodeContents,
  ListTreeTargetHierarcyByIndex,
  MdFolderSpecial,
  MdInsertDriveFile
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yInputField, O11yPopover } from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const ControlledNestedTreeWithCheckbox = ({
  data,
  searchValue,
  filteredUUIDs,
  allowFilter,
  onCheckboxChange,
  isParentSearched,
  indent = 1
}) => {
  const [openNodeMap, setOpenNodeMap] = useState({});

  return data?.map((item) => {
    if (
      allowFilter &&
      !filteredUUIDs?.filteredUUIDsWithHierarchy?.[item.uuid] &&
      !isParentSearched
    ) {
      return null;
    }
    const startIndex = item.name.indexOf(searchValue);
    const endIndex = startIndex + searchValue.length;
    return (
      <ListTree
        key={item.name}
        indentationLevel={indent}
        isTreeOpen={
          openNodeMap[item.name] ||
          filteredUUIDs?.filteredUUIDsWithHierarchy?.[item.uuid]
        }
      >
        <ListTreeNode
          showIcon={false}
          label={
            <Checkbox
              inputClassName="w-3 h-3"
              data={{
                label: (
                  <>
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
                  </>
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
            if (openNodeMap[item.name] !== undefined) {
              openNodeMap[item.name] = !openNodeMap[item.name];
            } else {
              openNodeMap[item.name] = true;
            }
            setOpenNodeMap({ ...openNodeMap });
          }}
          isNodeSelected={false}
          isFocused={false}
          leadingIcon={<></>}
        />
        {!!item?.contents && (
          <ListTreeNodeContents
            isTreeOpen={
              openNodeMap[item.name] ||
              !!filteredUUIDs?.filteredUUIDsWithHierarchy?.[item.uuid]
            }
          >
            <ControlledNestedTreeWithCheckbox
              onCheckboxChange={onCheckboxChange}
              filteredUUIDs={filteredUUIDs}
              allowFilter={allowFilter}
              data={item.contents}
              searchValue={searchValue}
              isParentSearched={
                filteredUUIDs?.searchedUUIDs?.[item.uuid] || isParentSearched
              }
              indent={1 + indent}
            />
          </ListTreeNodeContents>
        )}
      </ListTree>
    );
  });
};

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
  const [searchValue, setSearchValue] = useState(''); // Debounce this state for optimal performance
  const [showFilterPopover, setShowFilterPopover] = useState(false);

  const onSearchChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
  };

  const onCheckboxChange = (isChecked, targetNode) => {
    setSearchValue('');
    const selectedIdSet = new Set();
    Object.values(prevSelectedValues).forEach((item) => {
      selectedIdSet.add(item.id);
    });
    if (isChecked) selectedIdSet.add(targetNode.id);
    else {
      selectedIdSet.delete(targetNode.id);
    }
    onChange([...selectedIdSet]);
  };

  const filteredUUIDs = useMemo(() => {
    const newValue = {
      searchedUUIDs: {},
      filteredUUIDsWithHierarchy: {}
    };
    if (searchValue.length) {
      ListTreeIterateChildrenRecursively(
        { contents: listTreeCheckboxData },
        (item) => {
          if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
            newValue.searchedUUIDs[item.uuid] = item.uuid;
            const data = ListTreeTargetHierarcyByIndex(
              listTreeCheckboxData,
              item.uuid
            );
            data.forEach((el) => {
              newValue.filteredUUIDsWithHierarchy[el.uuid] = el.uuid;
            });
          }
          return true;
        }
      );
    }
    return newValue;
  }, [listTreeCheckboxData, searchValue]);

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
          <div className="flex max-h-80 w-96 flex-col overflow-hidden">
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
                    data={listTreeCheckboxData}
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
        <div className="mb-1 text-left">
          <span className="text-base-700 text-sm font-medium">Folder</span>
        </div>
        {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
        <div
          className={twClassNames(
            'border-base-300 flex min-h-[38px] flex-wrap gap-2 rounded-md border px-3 py-2 shadow',
            {
              "after:content-['Select'] after:text-sm after:font-normal after:text-base-500":
                isEmpty(Object.values(prevSelectedValues))
            }
          )}
        >
          {Object.values(prevSelectedValues).map((el) => (
            <FileBadge
              key={el.uuid}
              text={el.name}
              hasRemoveButton
              isRounded
              onClose={() => removeSelectedItem(el)}
            />
          ))}
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
        'inline-flex items-center font-medium cursor-pointer px-2.5 py-0.5 text-xs bg-base-100 text-base-800 rounded-full pr-0.5 truncate max-w-[200px]',
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

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTreeCheckboxHelper } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yInputField, O11yPopover } from 'common/bifrostProxy';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { setSelectedFilters } from 'features/FilterSkeleton/slices/filterSlice';
import {
  getSelectedFiltersByType,
  getStaticFiltersByType
} from 'features/FilterSkeleton/slices/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { constructTreeData } from '../utils';

import FileBadge from './FileBadge';
import FolderTree from './FolderTree';

const {
  updateTargetNodes,
  getSelectedListTreeItems,
  getSearchResultsCustomBSFTraversal
} = listTreeCheckboxHelper;

export default function FolderFilterField() {
  const dispatch = useDispatch();

  const staticFolderOptions = useSelector(
    getStaticFiltersByType(ADV_FILTER_TYPES.folders.key)
  );
  const selectedFolders = useSelector(
    getSelectedFiltersByType(ADV_FILTER_TYPES.folders.key)
  );

  const { treeData, selectedNodes } = useMemo(
    () => constructTreeData(staticFolderOptions, selectedFolders),
    [staticFolderOptions, selectedFolders]
  );

  const handleFolderTreeSelectChange = (selectedValues) => {
    const modifiedSelectedValues = selectedValues.map((sValue) => ({
      id: sValue.id,
      text: sValue.name,
      value: sValue.id,
      type: ADV_FILTER_TYPES.folders.key,
      appliedText: ADV_FILTER_TYPES.folders.key
        ? `${ADV_FILTER_TYPES.folders.key}: ${sValue.name}`
        : sValue.name,
      isApplied: false
    }));

    const toBeDeletedItems = selectedFolders.filter(
      (sValue) =>
        !modifiedSelectedValues.find((mValue) => mValue.id === sValue.id)
    );

    const toBeAddedItems = modifiedSelectedValues.filter(
      (mValue) => !selectedFolders.find((pValue) => pValue.id === mValue.id)
    );

    toBeDeletedItems.forEach((dItem) => {
      dispatch(
        setSelectedFilters({
          type: dItem.type,
          operationType: 'removeOperation',
          id: dItem.id,
          text: null,
          value: null
        })
      );
    });

    toBeAddedItems.forEach((newItem) => {
      dispatch(
        setSelectedFilters({
          type: newItem.type,
          operationType: 'addOperation',
          id: newItem.id,
          text: newItem.text,
          value: newItem.value
        })
      );
    });
  };

  return (
    <FolderFilterChild
      listTreeCheckboxData={treeData}
      onChange={handleFolderTreeSelectChange}
      prevSelectedValues={selectedNodes}
    />
  );
}

const FolderFilterChild = ({
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

  const handleSearchChange = useCallback(
    (event) => {
      const newSearchValue = event.target.value;
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
    },
    [filteredUUIDs.searchedUUIDs, listOfItems, searchValue]
  );

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
    onChange(Object.values(selectedValuesAdjusted)?.map((sValue) => sValue));
  };

  const closeFilterPopover = () => {
    setSearchValue('');
    setShowFilterPopover(false);
  };

  const removeSelectedItem = (item) => {
    onCheckboxChange(false, item);
  };

  return (
    <div>
      <div className="mb-1 text-left">
        <span className="text-base-700 text-sm font-medium">Folder</span>
      </div>
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
                onChange={handleSearchChange}
                placeholder="Search"
                id="select-folders"
              />
            </div>
            <div className="flex-1 overflow-auto pb-2">
              <div className="min-w-min">
                {Object.keys(filteredUUIDs.filteredUUIDsWithHierarchy)
                  .length === 0 && searchValue.length ? (
                  <p className="text-base-500 px-2 py-1 text-sm">
                    No items matching search results
                  </p>
                ) : (
                  <FolderTree
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
          else {
            closeFilterPopover();
          }
        }}
        wrapperClassName="px-2 py-0"
      >
        <button type="button" className="w-full">
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
        </button>
      </O11yPopover>
    </div>
  );
};

FolderFilterChild.propTypes = {
  listTreeCheckboxData: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
  onChange: PropTypes.func.isRequired,
  prevSelectedValues: PropTypes.objectOf(PropTypes.any)
};

FolderFilterChild.defaultProps = {
  listTreeCheckboxData: [],
  prevSelectedValues: {}
};

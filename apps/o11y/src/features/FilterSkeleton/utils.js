import { listTreeCheckboxHelper } from '@browserstack/bifrost';
import { O11Y_DATE_RANGE, o11yHistory } from 'constants/common';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { updateUrlQueryParam } from 'utils/common';
import { getDateInFormat, getO11yTimeBounds } from 'utils/dateTime';

import { resetFilters } from './slices/filterSlice';
import {
  ADV_FILTER_FIELD_TYPES,
  ADV_FILTER_TYPES,
  ADV_FILTERS_FIELD_GROUPS,
  ADV_FILTERS_PREFIX
} from './constants';

const ALL_FILTER_FIELD_KEYS = Object.values(ADV_FILTER_TYPES).map(
  (filterField) => filterField.key
);

export const getAppliedFilterObj = ({ id, text, type, value }) => ({
  id,
  text,
  type,
  appliedText: `${ADV_FILTERS_PREFIX[type]}: ${text}`,
  isApplied: true,
  value
});

export const getSearchStringFromFilters = (appliedFilters = []) => {
  const searchParams = new URLSearchParams(window.location.search);
  Object.values(ADV_FILTER_TYPES).forEach((filterTypeObj) => {
    const { key } = filterTypeObj;

    if (ADV_FILTER_TYPES.dateRange.key === key) {
      const filters = appliedFilters.find((item) => item.type === key);
      if (filters) {
        searchParams.set('daterangetype', filters.id);
        if (filters.id === 'custom') {
          searchParams.set(
            key,
            `${filters.value.lowerBound},${filters.value.upperBound}`
          );
        }
      }
    } else {
      const filters = appliedFilters
        .filter((item) => item.type === key)
        .map((i) => i?.value);
      if (!isEmpty(filters)) {
        searchParams.set(key, filters);
      } else {
        searchParams.delete(key);
      }
    }
  });
  return searchParams;
};

export const getFilterQueryParams = (appliedFilters = []) => {
  const searchParams = new URLSearchParams();
  Object.values(ADV_FILTER_TYPES).forEach((filterTypeObj) => {
    const { key } = filterTypeObj;

    if (ADV_FILTER_TYPES.dateRange.key === key) {
      const filters = appliedFilters.find((item) => item.type === key);
      if (filters) {
        if (filters.id === 'custom') {
          searchParams.set(
            key,
            `${filters.value.lowerBound},${filters.value.upperBound}`
          );
        } else {
          const { lowerBound, upperBound } = getO11yTimeBounds(filters.id);
          searchParams.set(key, `${lowerBound},${upperBound}`);
        }
      }
    } else {
      const filters = appliedFilters
        .filter((item) => item.type === key)
        .map((i) => i?.value);
      if (!isEmpty(filters)) {
        searchParams.set(key, filters);
      }
    }
  });
  return searchParams;
};

const getDefaultDateRange = () => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('daterangetype', O11Y_DATE_RANGE.days7.key);
  searchParams.delete(ADV_FILTER_TYPES.dateRange.key);
  updateUrlQueryParam(searchParams);
  return getO11yTimeBounds(O11Y_DATE_RANGE.days7.key);
};

const sanitizeSearchParams = (searchParams) => {
  const searchParamKeys = [...searchParams.keys()];

  searchParamKeys.forEach((key) => {
    if (!ALL_FILTER_FIELD_KEYS.includes(key) && key !== 'daterangetype') {
      searchParams.delete(key);
    }
  });
  return searchParams;
};

export const getFilterFromSearchString =
  (excludeDateRange = false) =>
  // eslint-disable-next-line no-unused-vars
  (dispatch) => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams = sanitizeSearchParams(searchParams);
    if (excludeDateRange) {
      searchParams.delete('daterangetype');
      searchParams.delete(ADV_FILTER_TYPES.dateRange.key);
      return searchParams;
    }
    const dateRangeType = searchParams.get('daterangetype');
    if (dateRangeType && dateRangeType !== 'custom') {
      const { lowerBound, upperBound } = getO11yTimeBounds(dateRangeType);
      searchParams.set(
        ADV_FILTER_TYPES.dateRange.key,
        `${lowerBound},${upperBound}`
      );
    } else if (
      !dateRangeType ||
      (dateRangeType === 'custom' &&
        !searchParams.get(ADV_FILTER_TYPES.dateRange.key))
    ) {
      const { lowerBound, upperBound } = getDefaultDateRange();
      searchParams.set('daterangetype', O11Y_DATE_RANGE.days7.key);
      searchParams.set(
        ADV_FILTER_TYPES.dateRange.key,
        `${lowerBound},${upperBound}`
      );
    }

    return searchParams;
  };

export const getDateRangeFromSearchString = () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('daterangetype') === 'custom') {
    return searchParams.get(ADV_FILTER_TYPES.dateRange.key);
  }
  const dateBounds = getO11yTimeBounds(searchParams.get('daterangetype'));
  return `${dateBounds.lowerBound},${dateBounds.upperBound}`;
};

const { updateTargetNodes } = listTreeCheckboxHelper;

export function parseSimpleTreeData(treeData, { id, pId, rootPId }) {
  const keyNodes = {};
  const rootNodeList = [];

  // Fill in the map
  const nodeList = treeData.map((node) => {
    const clone = { ...node };
    const key = clone[id];
    keyNodes[key] = clone;
    clone.key = clone.key || key;
    return clone;
  });

  // Connect tree
  nodeList.forEach((node) => {
    const parentKey = node[pId];
    const parent = keyNodes[parentKey];

    // Fill parent
    if (parent) {
      parent.contents = parent.contents || [];
      parent.contents.push(node);
    }

    // Fill root tree node
    if (parentKey === rootPId || (!parent && rootPId === null)) {
      rootNodeList.push(node);
    }
  });

  return rootNodeList;
}

export const constructTreeData = (folders, selectedValues) => {
  const selectedNodes = {};
  let parsedTreeNodes = parseSimpleTreeData(folders, {
    id: 'id',
    pId: 'pId',
    rootPId: null
  });

  function recursiveTreeData(parentNodes = [], appendId = '') {
    parentNodes.forEach((pNode, index) => {
      const copyNode = pNode;
      copyNode.uuid = `${appendId}${index}`;
      copyNode.name = copyNode.label;
      copyNode.isChecked = false;
      copyNode.isIndeterminate = false;
      if (!isEmpty(copyNode.contents)) {
        recursiveTreeData(copyNode.contents, `${copyNode.uuid}-`);
      }
    });
    selectedValues?.forEach((sValue) => {
      const matched = parentNodes.find((pNode) => pNode.id === sValue.value);
      if (matched) {
        selectedNodes[matched.uuid] = matched;
        // matched.isChecked = true;
      }
    });
  }
  recursiveTreeData(parsedTreeNodes);
  Object.keys(selectedNodes).forEach((sNodeIdx) => {
    const { newItems } = updateTargetNodes(
      true,
      sNodeIdx,
      JSON.parse(JSON.stringify(parsedTreeNodes))
    );
    parsedTreeNodes = newItems;
  });
  return { treeData: parsedTreeNodes, selectedNodes };
};

const removeAllFilterFieldsFromParams = () => {
  const searchParams = new URLSearchParams(window?.location?.search);
  Object.values(ADV_FILTER_TYPES).forEach(({ key }) => {
    if (searchParams.get(key)) {
      searchParams.delete(key);
    }
  });
  if (searchParams.get('daterangetype')) {
    searchParams.delete('daterangetype');
  }
  o11yHistory.navigate({ search: searchParams.toString() }, { replace: true });
};

export const resetAllAppliedFilters = () => (dispatch) => {
  dispatch(resetFilters());
  removeAllFilterFieldsFromParams();
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const updatedFilterFields = (data, searchParams) => {
  const selectedFilters = [];

  if (!isEmpty(data?.applied)) {
    const { applied } = data;
    Object.keys(applied).forEach((appliedKey) => {
      const fieldType = Object.keys(ADV_FILTERS_FIELD_GROUPS).find(
        (filterFieldKey) =>
          ADV_FILTERS_FIELD_GROUPS[filterFieldKey].includes(appliedKey)
      );
      const appliedValue = applied[appliedKey];
      switch (fieldType) {
        case ADV_FILTER_FIELD_TYPES.LIST:
          if (!isEmpty(appliedValue)) {
            appliedValue.forEach((item) => {
              selectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: appliedKey
                })
              );
            });
          }
          break;
        case ADV_FILTER_FIELD_TYPES.BOOLEAN:
          if (!isNil(appliedValue))
            selectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: appliedValue,
                value: appliedValue,
                type: appliedKey
              })
            );
          break;
        case ADV_FILTER_FIELD_TYPES.STRING:
          if (appliedValue?.length > 0)
            selectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: appliedValue,
                value: appliedValue,
                type: appliedKey
              })
            );
          break;
        case ADV_FILTER_FIELD_TYPES.DATE_RANGE:
          if (applied[appliedKey]) {
            const daterangetype = searchParams.get('daterangetype');
            let text = '';
            let id = '';
            if (daterangetype !== 'custom') {
              id = daterangetype;
            } else {
              text = `${getDateInFormat(
                applied[appliedKey].lowerBound
              )} - ${getDateInFormat(applied[appliedKey].upperBound)}`;
              id = 'custom';
            }

            selectedFilters.push({
              type: ADV_FILTER_TYPES.dateRange.key,
              id,
              value: applied[ADV_FILTER_TYPES.dateRange.key],
              text,
              isApplied: true
            });
          }
          break;
        default:
          break;
      }
    });
  }

  let staticFilters = [];

  if (!isEmpty(data?.staticFilters)) {
    staticFilters = data.staticFilters;
  }

  return {
    selectedFilters,
    staticFilters
  };
};

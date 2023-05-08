import { listTreeCheckboxHelper } from '@browserstack/bifrost';
import isEmpty from 'lodash/isEmpty';
import { getSubtractedUnixTime } from 'utils/dateTime';

import { ADV_FILTER_TYPES, ADV_FILTERS_PREFIX } from './constants';

export const getAppliedFilterObj = ({ id, text, type, value }) => ({
  id,
  text,
  type,
  appliedText: `${ADV_FILTERS_PREFIX[type]}: ${text}`,
  isApplied: true,
  value
});

const DATE_RANGE_KEYS = {
  days7: 'days7',
  days15: 'days15',
  days30: 'days30',
  months2: 'months2'
};

export function getTimeBounds(activeKey) {
  const timebounds = {
    upperBound: Date.now(),
    lowerBound: 0
  };
  switch (activeKey) {
    case DATE_RANGE_KEYS.days7: {
      timebounds.lowerBound = getSubtractedUnixTime(7) * 1000;
      break;
    }
    case DATE_RANGE_KEYS.days15: {
      timebounds.lowerBound = getSubtractedUnixTime(15) * 1000;
      break;
    }
    case DATE_RANGE_KEYS.days30: {
      timebounds.lowerBound = getSubtractedUnixTime(30) * 1000;
      break;
    }
    case DATE_RANGE_KEYS.months2: {
      timebounds.lowerBound = getSubtractedUnixTime(2, 'months') * 1000;
      break;
    }
    default:
      break;
  }
  return timebounds;
}

export const getSearchStringFromFilters = (appliedFilters = []) => {
  const searchParams = new URLSearchParams();
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
          const { lowerBound, upperBound } = getTimeBounds(filters.id);
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

export const getFilterFromSearchString = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const daterangetype = searchParams.get('daterangetype');

  if (daterangetype && daterangetype !== 'custom') {
    const { lowerBound, upperBound } = getTimeBounds(daterangetype);
    searchParams.set(
      ADV_FILTER_TYPES.dateRange.key,
      `${lowerBound},${upperBound}`
    );
  }

  return searchParams;
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

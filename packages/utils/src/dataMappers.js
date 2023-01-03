import { unionBy } from 'lodash';

/**
 * A util functions which merges two maps with each other on the basis of keys and filterMap provided.
 * @param {object} targetMap Target map object
 * @param {object} sourceMap Source map object which will be merged to the target map
 * @param {object} mapKeys A set of keys which decide the property on which the merging happens between
 * the two maps. `identifierKey` is the key which is used to filter the properties to be mapped.
 * `updateKey` denotes the property which needs to be updated on merging.
 * @param {object} filterMap(optional) A map whose keys decide the fields to be merged to the target map.
 * Rest of the keys in source map are simply ignored.
 */
export const mergeMapsOnKey = (targetMap, sourceMap, mapKeys, filterMap) => {
  const { identifierKey, updateKey } = mapKeys;
  Object.keys(sourceMap).forEach((key) => {
    let currentTargetMapVal = targetMap[key];
    const currentSourceMapVal = sourceMap[key];

    // If the map value is an array, then only loop through the array to merge values
    if (Array.isArray(currentTargetMapVal)) {
      currentTargetMapVal.map((aItem) => {
        const itemIndexInB = currentSourceMapVal.findIndex((bItem) => bItem[identifierKey] === aItem[identifierKey]);
        if (itemIndexInB !== -1) {
          // Assuming updateKey holds a numerical value only(`count`);
          aItem[updateKey] += currentSourceMapVal[itemIndexInB][updateKey];
        }
        return aItem;
      });
      currentTargetMapVal = unionBy(currentTargetMapVal, currentSourceMapVal, identifierKey);
    } else {
      // If the target val is not an array, the source map val is to be set directly
      // to the target val
      currentTargetMapVal = currentSourceMapVal;
    }

    // Filter out data on the basis of filterMap provided
    if (filterMap && filterMap[key]) {
      targetMap[key] = currentTargetMapVal;
    }
  });

  return targetMap;
};

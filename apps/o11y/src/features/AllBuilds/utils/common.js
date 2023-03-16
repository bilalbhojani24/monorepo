export const getParamsFromFiltersObject = (filters) => {
  const paramsObject = {};
  Object.keys(filters).forEach((singleItem) => {
    const targetValue = filters[singleItem];
    if (
      singleItem === 'dateRange' &&
      targetValue.lowerBound &&
      targetValue.upperBound
    ) {
      paramsObject[
        singleItem
      ] = `${targetValue.lowerBound},${targetValue.upperBound}`;
    } else if (singleItem === 'searchText' && targetValue.length) {
      paramsObject.search = targetValue;
    } else if (
      ['tags', 'users', 'statuses', 'frameworks'].includes(singleItem) &&
      targetValue.length
    ) {
      paramsObject[singleItem] = targetValue.join(',');
    }
  });
  return paramsObject;
};

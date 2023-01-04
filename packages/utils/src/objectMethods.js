/*
Get value from nested objects.
returns undefined if value not available for the key order
Params: object, keys concatinated with .
example: getNestedObjValue({a:{b: 1}}, 'a.b') = 1
*/
export const getNestedObjValue = (obj, keys) =>
  keys.split('.').reduce((a, b) => (typeof a !== 'object' || !a ? undefined : a[b]), obj);

/*
Create a nested object from providedKeys
Params: keys concatinated with ., finalValue
example: getNestedObjFromKeys('a.b', 1) = {a: {b: 1}}
*/
export function getNestedObjFromKeys(keys, value) {
  const obj = {};
  const allKeys = keys.split('.');
  const currKey = allKeys.shift();
  if (allKeys.length) {
    obj[currKey] = getNestedObjFromKeys(allKeys.join('.'), value);
  } else {
    obj[currKey] = value;
  }
  return obj;
}

export const convertKeysToCamelCase = (obj, onlyAtRootLevel) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key.replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', '')),
      onlyAtRootLevel || !(val instanceof Object) ? val : convertKeysToCamelCase(val)
    ])
  );

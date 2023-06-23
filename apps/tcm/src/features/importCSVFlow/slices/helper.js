import {
  ADD_FIELD_VALUE,
  IGNORE_FIELD_VALUE
} from '../const/importCSVConstants';

const valueInternalMapHelper = (value, isIgnore) =>
  Object.keys(value).reduce((obj, nestedKey) => {
    if (value[nestedKey] === null)
      return {
        ...obj,
        [nestedKey]: { action: isIgnore ? IGNORE_FIELD_VALUE : ADD_FIELD_VALUE }
      };
    return { ...obj, [nestedKey]: value[nestedKey] };
  }, {});

export const calcValueMappings = (
  valueMappingsRes,
  allFields,
  fieldMappings,
  defaultFields
) => {
  const valueMappings = {};
  Object.keys(valueMappingsRes).forEach((key) => {
    const fieldDetail = defaultFields?.find(
      (item) => item.name === fieldMappings[key]
    );
    valueMappings[key] = valueInternalMapHelper(
      valueMappingsRes[key],
      fieldDetail?.restrict_add
    );
  });

  const existingMappings = Object.keys(fieldMappings);
  allFields.forEach((field) => {
    if (!existingMappings.includes(field)) {
      valueMappings[field] = {
        action: ADD_FIELD_VALUE
      };
    }
  });
  return valueMappings;
};

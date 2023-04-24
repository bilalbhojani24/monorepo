import { ADD_FIELD_VALUE } from '../const/importCSVConstants';

const valueInternalMapHelper = (value) =>
  Object.keys(value).reduce((obj, nestedKey) => {
    if (value[nestedKey] === null)
      return { ...obj, [nestedKey]: { action: 'add' } };
    return { ...obj, [nestedKey]: value[nestedKey] };
  }, {});

export const calcValueMappings = (
  valueMappingsRes,
  allFields,
  fieldMappings
) => {
  const valueMappings = {};
  Object.keys(valueMappingsRes).forEach((key) => {
    valueMappings[key] = valueInternalMapHelper(valueMappingsRes[key]);
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

/* eslint-disable no-param-reassign */

// function that looks at the data schema of a field
// and recursively builds out a response according to the required schema
const parseFieldsForCreateHelper = (
  { $type, $items, $properties, $const },
  fieldData
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  let val = null;
  switch ($type) {
    case 'number':
      // is a string, parse to number and assign value
      if (typeof fieldData === 'string') val = Number(fieldData);
      // value is embedded in value
      else val = fieldData.value;
      break;
    case 'string':
      // is a string, directly assign value
      if (typeof fieldData === 'string') val = fieldData;
      // value is embedded in value
      else val = fieldData.value;
      break;
    case 'array':
      val = fieldData?.map((fieldItem) =>
        // loop through through field data and build item based on $item structur
        parseFieldsForCreateHelper($items, fieldItem)
      );
      break;
    case 'object':
      val = Object.entries($properties).reduce((acc, curr) => {
        const [currItemKey, currItemVal] = curr;
        // call itself with the inner property and break down the field data inc ase the
        // the property is an object
        if (currItemVal.$type === 'object') {
          if (fieldData[currItemKey]) {
            acc[currItemKey] = parseFieldsForCreateHelper(
              currItemVal,
              fieldData[currItemKey]
            );
          }
        } else {
          acc[currItemKey] = parseFieldsForCreateHelper(currItemVal, fieldData);
        }
        return acc;
      }, {});
      break;
    default:
      // special field type
      if ($const) {
        val = $const;
      } else {
        val = fieldData;
      }
  }
  return val;
};
export const parseFieldsForCreate = (createMeta, fieldData) =>
  // loop through create meta
  createMeta?.reduce((parsedFields, currentMetaField) => {
    // if the meta field has data in the state i.e. fieldData
    if (currentMetaField.key in fieldData) {
      // check if the field with data is a system field or a custom field
      if (currentMetaField.schema.system_field === true) {
        // field is a system field

        // pass the helper the schema and state data for the field in question
        parsedFields[currentMetaField.key] = parseFieldsForCreateHelper(
          currentMetaField.schema.data_format,
          fieldData[currentMetaField.key]
        );
      } else {
        // field is a custom field

        // if not, add custom key in outer object
        if (!parsedFields.custom) parsedFields.custom = {};
        // pass the helper the schema and state data for the field in question
        parsedFields.custom[currentMetaField.key] = parseFieldsForCreateHelper(
          currentMetaField.schema.data_format,
          fieldData[currentMetaField.key]
        );
      }
    }
    return parsedFields;
  }, {});

const getIsNewValueEqualToCurrentValue = (currentValue, newValue) => {
  if (typeof currentValue === 'string' || typeof currentValue === 'number') {
    return currentValue === newValue;
  }

  if (Array.isArray(newValue)) {
    if (!Array.isArray(currentValue)) return false;
    return currentValue.every((currentValueItem) =>
      Boolean(newValue.find((item) => item.value === currentValueItem.key))
    );
  }

  if (typeof currentValue === 'object') {
    return 'options' in currentValue
      ? currentValue.key === newValue.value &&
          currentValue.options.key === newValue.child.value
      : currentValue.key === newValue.value;
  }

  return false;
};
export const removedUnchangedFields = (updateMeta, fieldData) => {
  updateMeta.forEach((field) => {
    if (field.key in fieldData && field.current_value) {
      const isNewValueEqualToCurrentValue = getIsNewValueEqualToCurrentValue(
        field.current_value,
        fieldData[field.key]
      );
      if (isNewValueEqualToCurrentValue) {
        delete fieldData[field.key];
      }
    }
  });
  return fieldData;
};

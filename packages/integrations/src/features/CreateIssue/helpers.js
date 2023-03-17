const parseFieldsForCreateHelper = (
  { $type, $items, $properties, $const },
  fieldData
) => {
  let val = null;
  switch ($type) {
    case 'float':
      val = fieldData;
      break;
    case 'string':
      if (typeof fieldData === 'string') val = fieldData;
      else val = fieldData.value;
      break;
    case 'array':
      val = fieldData.map((fieldItem) =>
        parseFieldsForCreateHelper($items, fieldItem)
      );
      break;
    case 'object':
      val = Object.entries($properties).reduce((acc, curr) => {
        const [currItemKey, currItemVal] = curr;
        // eslint-disable-next-line no-param-reassign
        acc[currItemKey] = parseFieldsForCreateHelper(currItemVal, fieldData);
        return acc;
      }, {});
      break;
    default:
      if ($const) {
        val = $const;
      } else {
        val = fieldData;
      }
  }
  return val;
};
export const parseFieldsForCreate = (createMeta, fieldData) =>
  createMeta.reduce((parsedFields, currentMetaField) => {
    if (currentMetaField.key in fieldData) {
      // eslint-disable-next-line no-param-reassign
      parsedFields[currentMetaField.key] = parseFieldsForCreateHelper(
        currentMetaField.schema.data_format,
        fieldData[currentMetaField.key]
      );
    }
    return parsedFields;
  }, {});

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setFieldsMapping,
  setMapFieldModalConfig,
  setValueMappings
} from '../slices/importCSVSlice';

const useMapFields = ({
  importId,
  defaultFields,
  customFields,
  importFields
}) => {
  const dispatch = useDispatch();
  const rowRef = useRef([]);
  const myFieldMappings = useSelector((state) => state.importCSV.fieldsMapping);
  const valueMappings = useSelector((state) => state.importCSV.valueMappings);

  const defaultOptions = defaultFields.map((field) => ({
    label: field.display_name,
    value: field.display_name
  }));

  const customOptions = customFields.map((field) => ({
    label: field.display_name,
    value: field.display_name
  }));

  const displayOptions = [
    { label: 'Ignore Column', value: 'Ignore Column' },
    { label: 'Add', value: 'Add' },
    ...defaultOptions,
    ...customOptions
  ]; // all display options

  const defaultNameToDisplayMapper = defaultFields.reduce(
    (mapObject, field) => {
      const key = field.name;
      const value = field.display_name;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const customNameToDisplayMapper = customFields.reduce((mapObject, field) => {
    const key = field.name;
    const value = field.display_name;
    return { ...mapObject, [key]: value };
  }, {});

  const mapNameToDisplay = {
    ...defaultNameToDisplayMapper,
    ...customNameToDisplayMapper
  }; // maps field name to display name

  const defaultDisplayToNameMapper = defaultFields.reduce(
    (mapObject, field) => {
      const key = field.display_name;
      const value = field.name;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const customDisplayToNameMapper = customFields.reduce((mapObject, field) => {
    const key = field.display_name;
    const value = field.name;
    return { ...mapObject, [key]: value };
  }, {});

  const mapDisplayToName = {
    ...defaultDisplayToNameMapper,
    ...customDisplayToNameMapper
  };

  const defaultTypeMapper = defaultFields.reduce((mapObject, field) => {
    const key = field.name;
    const value = field.type;
    return { ...mapObject, [key]: value };
  }, {});

  const customTypeMapper = customFields.reduce((mapObject, field) => {
    const key = field.name;
    const value = field.type;
    return { ...mapObject, [key]: value };
  }, {});

  const typeMapper = { ...defaultTypeMapper, ...customTypeMapper };

  if (myFieldMappings && Object.keys(myFieldMappings).length) {
    rowRef.current = importFields.map((item) => ({
      field: item,
      mappedField: {
        displayOptions,
        defaultValue: {
          label: mapNameToDisplay[myFieldMappings[item]],
          value: mapNameToDisplay[myFieldMappings[item]]
        }
      },
      mappedValue: myFieldMappings[item]
    }));
  }

  const handleSelectMenuChange = (field) => (d) => {
    dispatch(
      setFieldsMapping({ key: field, value: mapDisplayToName[d.label] })
    );
  };

  const handleUpdateClick = (value) => () => {
    dispatch(setMapFieldModalConfig({ show: true, field: value })); // isme value from api add karna hai
    dispatch(
      setValueMappings({
        importId,
        field: mapNameToDisplay[value],
        mapped_field: value
      })
    );
  };

  return {
    displayOptions,
    mapNameToDisplay,
    mapDisplayToName,
    typeMapper,
    myFieldMappings,
    rowRef,
    valueMappings,
    handleSelectMenuChange,
    handleUpdateClick
  };
};

export default useMapFields;

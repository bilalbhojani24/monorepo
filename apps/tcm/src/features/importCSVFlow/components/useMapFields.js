import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { useLocation } from 'react-router-dom';
import {
  setFieldsMapping,
  setMapFieldModalConfig,
  setValueMappings,
  setValueMappingsThunk
} from '../slices/importCSVSlice';

const useMapFields = ({
  importId,
  defaultFields,
  customFields,
  importFields
}) => {
  const dispatch = useDispatch();
  // const { search } = useLocation();
  // const queryParams = new URLSearchParams(search);
  const rowRef = useRef([]);
  const myFieldMappings = useSelector((state) => state.importCSV.fieldsMapping);
  const defaultValueMappings = useSelector(
    (state) => state.importCSV.valueMappings
  );

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

  const allowedValueMapper = defaultFields.reduce((mapObject, field) => {
    const { name } = field;
    const allowedValueDisplayOptions = field.allowed_types?.map((item) => ({
      label: item.display_name,
      value: item.display_name
    }));
    const allowedValueDisplayToNameMapper = field.allowed_types?.reduce(
      (obj, item) => ({
        ...obj,
        [item.display_name]: item.name
      }),
      {}
    );
    return {
      ...mapObject,
      [name]: {
        allowedValueDisplayOptions,
        allowedValueDisplayToNameMapper
      }
    };
  }, {});

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
    if (d.label === 'Add')
      dispatch(setFieldsMapping({ key: field, value: { action: 'add' } }));
    else
      dispatch(
        setFieldsMapping({ key: field, value: mapDisplayToName[d.label] })
      );
    // dispatch value mappings
  };

  const handleUpdateClick = (value) => () => {
    dispatch(
      setMapFieldModalConfig({
        show: true,
        field: value,
        displayName: mapNameToDisplay[value]
      })
    ); // isme value from api add karna hai
    dispatch(
      setValueMappingsThunk({
        importId,
        field: mapNameToDisplay[value],
        mapped_field: value
      })
    );
  };

  const handleValueMappingMenuChange = (actualName, value) => (d) => {
    dispatch(
      setValueMappings({
        key: actualName,
        value:
          allowedValueMapper[value].allowedValueDisplayToNameMapper[d.label] // ye Plain Text select karne par plain dega and HTML par html
      })
    );
  };

  const handleMappingProceedClick = () => {
    // console.log('query params', queryParams);
    // dispatch(submitMappingData({ importId }));
  };

  return {
    allowedValueMapper,
    displayOptions,
    mapNameToDisplay,
    mapDisplayToName,
    typeMapper,
    myFieldMappings,
    rowRef,
    defaultValueMappings,
    handleValueMappingMenuChange,
    handleSelectMenuChange,
    handleUpdateClick,
    handleMappingProceedClick
  };
};

export default useMapFields;

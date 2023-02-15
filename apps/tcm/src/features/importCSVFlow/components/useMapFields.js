import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  setFieldsMapping,
  setMapFieldModalConfig,
  setValueMappings,
  setValueMappingsThunk,
  submitMappingData
} from '../slices/importCSVSlice';

const useMapFields = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const rowRef = useRef([]);
  const currentSelectedModalCSVKey = useRef(null);
  const currentSelectedModalField = useRef(null);
  const currentSelectedModalOption = useRef(null);
  const mapFieldsConfig = useSelector(
    (state) => state.importCSV.mapFieldsConfig
  );
  const myFieldMappings = useSelector((state) => state.importCSV.fieldsMapping);
  const valueMappings = useSelector((state) => state.importCSV.valueMappings);
  const VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN = useSelector(
    (state) => state.importCSV.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN
  );
  const modalConfig = useSelector(
    (state) => state.importCSV.mapFieldModalConfig
  );

  const defaultOptions = mapFieldsConfig.defaultFields.map((field) => ({
    label: field.display_name,
    value: field.display_name
  }));

  const customOptions = mapFieldsConfig.customFields.map((field) => ({
    label: field.display_name,
    value: field.display_name
  }));

  const displayOptions = [
    { label: 'Ignore Column', value: 'Ignore Column' },
    { label: 'Add', value: 'Add' },
    ...defaultOptions,
    ...customOptions
  ]; // all display options

  const defaultNameToDisplayMapper = mapFieldsConfig.defaultFields.reduce(
    (mapObject, field) => {
      const key = field.name;
      const value = field.display_name;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const customNameToDisplayMapper = mapFieldsConfig.customFields.reduce(
    (mapObject, field) => {
      const key = field.name;
      const value = field.display_name;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const mapNameToDisplay = {
    ...defaultNameToDisplayMapper,
    ...customNameToDisplayMapper
  }; // maps field name to display name

  const defaultDisplayToNameMapper = mapFieldsConfig.defaultFields.reduce(
    (mapObject, field) => {
      const key = field.display_name;
      const value = field.name;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const customDisplayToNameMapper = mapFieldsConfig.customFields.reduce(
    (mapObject, field) => {
      const key = field.display_name;
      const value = field.name;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const mapDisplayToName = {
    ...defaultDisplayToNameMapper,
    ...customDisplayToNameMapper
  };

  const defaultTypeMapper = mapFieldsConfig.defaultFields.reduce(
    (mapObject, field) => {
      const key = field.name;
      const value = field.type;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const customTypeMapper = mapFieldsConfig.customFields.reduce(
    (mapObject, field) => {
      const key = field.name;
      const value = field.type;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const typeMapper = { ...defaultTypeMapper, ...customTypeMapper };

  const allowedValueMapper = mapFieldsConfig.defaultFields.reduce(
    (mapObject, field) => {
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
    },
    {}
  );

  if (myFieldMappings && Object.keys(myFieldMappings).length) {
    rowRef.current = mapFieldsConfig.importFields.map((item) => ({
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

  const handleUpdateClick = (actualName, value) => () => {
    dispatch(
      setMapFieldModalConfig({
        field: actualName,
        mapped_field: value,
        show: true
      })
    ); // isme value from api add karna hai
  };

  const handleSelectMenuChange = (field) => (selectedOption) => {
    if (selectedOption.label === 'Add') {
      dispatch(setFieldsMapping({ key: field, value: { action: 'add' } }));
      return;
    }
    dispatch(
      setFieldsMapping({
        key: field,
        value: mapDisplayToName[selectedOption.label]
      })
    );

    // dispatch value mappings
    dispatch(
      setValueMappingsThunk({
        importId: mapFieldsConfig.importId,
        field,
        mapped_field: mapDisplayToName[selectedOption.label]
      })
    );
    const name = mapDisplayToName[selectedOption.label]; // description
    const mappedValue = allowedValueMapper[name];
    const defaultSelectedValue =
      mappedValue.allowedValueDisplayToNameMapper[
        mappedValue.allowedValueDisplayOptions[0].label // it is the default selected option
      ];
    dispatch(
      setValueMappings({
        key: field,
        value: defaultSelectedValue
      })
    );
  };

  const setDefaultDropdownValue = (
    actualName,
    value,
    defaultSelectedOption
  ) => {
    dispatch(
      setValueMappings({
        key: actualName,
        value:
          allowedValueMapper[value].allowedValueDisplayToNameMapper[
            defaultSelectedOption.label
          ]
      })
    );
  };

  const handleValueMappingMenuChange = (actualName, value) => (d) => {
    // last column dropdown changes handled by this func
    dispatch(
      setValueMappings({
        key: actualName,
        value:
          allowedValueMapper[value].allowedValueDisplayToNameMapper[d.label] // ye Plain Text select karne par plain dega and HTML par html
      })
    );
  };

  const handleModalSelectMenuChange = (key, field) => (selectedOption) => {
    currentSelectedModalCSVKey.current = key;
    currentSelectedModalField.current = field;
    currentSelectedModalOption.current = selectedOption;
  };

  const onModalCloseHandler = () => {
    dispatch(setMapFieldModalConfig({ ...modalConfig, show: false }));
    currentSelectedModalCSVKey.current = null;
    currentSelectedModalOption.current = null;
    currentSelectedModalField.current = null;
  };

  const handleSaveClick = () => {
    const selectedLabel =
      currentSelectedModalCSVKey.current.toLowerCase() === 'priority'
        ? currentSelectedModalOption.current.label.toLowerCase()
        : currentSelectedModalOption.current.label; // converting it to lowerCase in case of priority

    if (currentSelectedModalOption.current.label === 'Add') {
      dispatch(
        setValueMappings({
          key: currentSelectedModalCSVKey.current,
          value: {
            ...valueMappings[currentSelectedModalField.current],
            [currentSelectedModalField.current]: { action: 'add' }
          }
        })
      );
    } else
      dispatch(
        setValueMappings({
          key: currentSelectedModalCSVKey.current,
          value: {
            ...valueMappings[currentSelectedModalField.current],
            [currentSelectedModalField.current]: selectedLabel
          }
        })
      );
  };

  const handleMappingProceedClick = () => {
    console.log('final paylaod', myFieldMappings, valueMappings);
    console.log('query params', queryParams.get('project'));
    const projectId = queryParams.get('project');
    dispatch(
      submitMappingData({
        importId: mapFieldsConfig.importId,
        projectId,
        myFieldMappings,
        valueMappings
      })
    );
  };

  return {
    allowedValueMapper,
    displayOptions,
    mapNameToDisplay,
    mapDisplayToName,
    typeMapper,
    myFieldMappings,
    rowRef,
    valueMappings,
    VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN,
    handleSaveClick,
    onModalCloseHandler,
    setDefaultDropdownValue,
    handleValueMappingMenuChange,
    handleSelectMenuChange,
    handleUpdateClick,
    handleMappingProceedClick,
    handleModalSelectMenuChange
  };
};

export default useMapFields;

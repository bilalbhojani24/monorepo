import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  ADD_FIELD_LABEL,
  ADD_FIELD_VALUE,
  ADD_VALUE_LABEL,
  ADD_VALUE_VALUE,
  DEFAULT_TABLE_DROPDOWN_OPTIONS,
  IGNORE_FIELD_LABEL,
  IGNORE_FIELD_VALUE,
  IGNORE_VALUE_LABEL,
  IGNORE_VALUE_VALUE
} from '../const/importCSVConstants';
import {
  setFieldsMappingThunk,
  setValueMappingsThunk,
  submitMappingData
} from '../slices/csvThunk';
import {
  // setErrorLabelInMapFields,
  setFieldsMapping,
  setMapFieldModalConfig,
  setMapFieldsError,
  setValueMappings
} from '../slices/importCSVSlice';

// eslint-disable-next-line sonarjs/cognitive-complexity
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
  const mapFieldsError = useSelector(
    (state) => state.importCSV.mappingFieldsError
  );
  const mapFieldProceedLoading = useSelector(
    (state) => state.importCSV.mapFieldsProceedLoading
  );
  const errorLabelInMapFields = useSelector(
    (state) => state.importCSV.errorLabelInMapFields
  );
  const showSelectMenuErrorInMapFields = useSelector(
    (state) => state.importCSV.showSelectMenuErrorInMapFields
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
    ...DEFAULT_TABLE_DROPDOWN_OPTIONS,
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

  const typeMapper = {
    ...defaultTypeMapper,
    ...customTypeMapper,
    add: 'Add'
  };

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

  rowRef.current = mapFieldsConfig.importFields.map((item) => ({
    field: item,
    mappedField: {
      displayOptions,
      defaultValue: {
        label: mapNameToDisplay[myFieldMappings?.[item]],
        value: mapNameToDisplay[myFieldMappings?.[item]]
      }
    },
    mappedValue: myFieldMappings[item]?.action || myFieldMappings?.[item]
  }));

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
    if (selectedOption.label === ADD_FIELD_LABEL) {
      dispatch(
        setFieldsMapping({ key: field, value: { action: ADD_FIELD_VALUE } })
      );
      dispatch(
        setValueMappings({ key: field, value: { action: ADD_FIELD_VALUE } })
      );
      return;
    }
    if (selectedOption.label === IGNORE_FIELD_LABEL) {
      dispatch(
        setFieldsMapping({ key: field, value: { action: IGNORE_FIELD_VALUE } })
      );
      dispatch(
        setValueMappings({ key: field, value: { action: IGNORE_FIELD_VALUE } })
      );
      return;
    }
    if (selectedOption.label === 'Title') dispatch(setMapFieldsError('')); // to resolve the title should be mapped error

    dispatch(
      setFieldsMappingThunk({
        key: field,
        value: mapDisplayToName[selectedOption.label],
        label: selectedOption.label
      })
    );

    // dispatch value mappings
    if (
      typeMapper[mapDisplayToName[selectedOption.label]] &&
      typeMapper[mapDisplayToName[selectedOption.label]] === 'field_dropdown'
    ) {
      dispatch(
        setValueMappingsThunk({
          importId: mapFieldsConfig?.importId,
          field,
          projectId: queryParams.get('project'),
          mapped_field: mapDisplayToName[selectedOption.label]
        })
      );
    }

    const name = mapDisplayToName[selectedOption.label]; // description
    const mappedValue = allowedValueMapper[name];
    if (mappedValue?.allowedValueDisplayOptions) {
      const defaultSelectedValue =
        mappedValue?.allowedValueDisplayToNameMapper[
          mappedValue?.allowedValueDisplayOptions?.[0]?.label // it is the default selected option
        ];
      dispatch(
        setValueMappings({
          key: field,
          value: defaultSelectedValue
        })
      );
    } else {
      // agar hame mappedValue nahi milta hai toh
      dispatch(
        setValueMappings({
          key: field,
          value: 'delete'
        })
      );
    }
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
    if (
      currentSelectedModalCSVKey.current &&
      currentSelectedModalField.current &&
      currentSelectedModalOption.current
    ) {
      const selectedLabel =
        currentSelectedModalCSVKey.current.toLowerCase() === 'priority'
          ? currentSelectedModalOption.current.label.toLowerCase()
          : currentSelectedModalOption.current.label; // converting label to lowerCase in case of priority

      if (currentSelectedModalOption.current.label === ADD_VALUE_LABEL) {
        dispatch(
          setValueMappings({
            key: currentSelectedModalCSVKey.current,
            value: {
              ...valueMappings[currentSelectedModalCSVKey.current],
              [currentSelectedModalField.current]: { action: ADD_VALUE_VALUE }
            }
          })
        );
      } else if (
        currentSelectedModalOption.current.label === IGNORE_VALUE_LABEL
      ) {
        dispatch(
          setValueMappings({
            key: currentSelectedModalCSVKey.current,
            value: {
              ...valueMappings[currentSelectedModalCSVKey.current],
              [currentSelectedModalField.current]: {
                action: IGNORE_VALUE_VALUE
              }
            }
          })
        );
      } else
        dispatch(
          setValueMappings({
            key: currentSelectedModalCSVKey.current,
            value: {
              ...valueMappings[currentSelectedModalCSVKey.current],
              [currentSelectedModalField.current]: selectedLabel
            }
          })
        );
    }
    dispatch(setMapFieldModalConfig({ ...modalConfig, show: false }));
  };

  const handleMappingProceedClick = () => {
    // console.log('final paylaod', myFieldMappings, valueMappings);
    // console.log('query params', queryParams.get('project'));
    const projectId = queryParams.get('project');
    const folderId = queryParams.get('folder');
    dispatch(
      submitMappingData({
        importId: mapFieldsConfig.importId,
        projectId,
        folderId,
        myFieldMappings,
        valueMappings
      })
    );
  };

  return {
    mapFieldsError,
    allowedValueMapper,
    displayOptions,
    mapNameToDisplay,
    mapDisplayToName,
    typeMapper,
    myFieldMappings,
    rowRef,
    valueMappings,
    errorLabelInMapFields,
    mapFieldProceedLoading,
    showSelectMenuErrorInMapFields,
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

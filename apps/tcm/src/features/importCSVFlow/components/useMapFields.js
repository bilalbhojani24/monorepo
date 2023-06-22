import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { logEventHelper } from 'utils/logEvent';

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
  // setFieldsMapping,
  setMapFieldModalConfig,
  setMapFieldsError,
  setShowMappings,
  setSingleFieldValueMapping,
  setValueMappings,
  updateSingleFieldValueMapping
} from '../slices/importCSVSlice';

// eslint-disable-next-line sonarjs/cognitive-complexity
const useMapFields = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { projectId } = useParams();
  const queryParams = new URLSearchParams(search);
  const rowRef = useRef([]);
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
  const showMappings = useSelector((state) => state.importCSV.showMappings);
  const currentFieldValueMapping = useSelector(
    (state) => state.importCSV.currentFieldValueMapping
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
    ...customNameToDisplayMapper,
    ...{ add: 'Add New Field' } // this is to map add -> Add new Field in second column (default value)
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
      const allowedValueNameToDisplayMapper = field.allowed_types?.reduce(
        (obj, item) => ({
          ...obj,
          [item.name]: item.display_name
        }),
        {}
      );
      return {
        ...mapObject,
        [name]: {
          allowedValueDisplayOptions,
          allowedValueDisplayToNameMapper,
          allowedValueNameToDisplayMapper
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
        label:
          mapNameToDisplay[myFieldMappings?.[item]] ||
          mapNameToDisplay[myFieldMappings?.[item]?.action],
        value:
          mapNameToDisplay[myFieldMappings?.[item]] ||
          mapNameToDisplay[myFieldMappings?.[item]?.action]
      }
    },
    mappedValue:
      myFieldMappings[item]?.action ||
      myFieldMappings?.[item] ||
      ADD_FIELD_VALUE
  }));

  const customFieldNames = mapFieldsConfig.customFields.reduce(
    (mapObject, field) => {
      const key = field.name;
      const value = true;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const handleUpdateClick = (actualName, value) => () => {
    dispatch(
      logEventHelper('TM_CiValueUpdateLinkClicked', {
        project_id: projectId
      })
    );
    dispatch(
      setMapFieldModalConfig({
        field: actualName,
        mapped_field: value,
        show: true
      })
    );
    dispatch(setSingleFieldValueMapping(valueMappings[actualName]));
  };

  const handleSelectMenuChange = (field) => (selectedOption) => {
    if (selectedOption.label === ADD_FIELD_LABEL) {
      dispatch(
        setFieldsMappingThunk({
          key: field,
          value: { action: ADD_FIELD_VALUE },
          mapper: mapNameToDisplay
        })
      );
      dispatch(
        setValueMappings({ key: field, value: { action: ADD_FIELD_VALUE } })
      );
      return;
    }
    if (selectedOption.label === IGNORE_FIELD_LABEL) {
      dispatch(
        setFieldsMappingThunk({
          key: field,
          value: { action: IGNORE_FIELD_VALUE },
          mapper: mapNameToDisplay
        })
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
        mapper: mapNameToDisplay
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
          projectId,
          mappedField: mapDisplayToName[selectedOption.label]
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
      // when we do not have any value mapping, we delete the key
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

  const handleModalSelectMenuChange = (field) => (selectedOption) => {
    const selectedLabel = selectedOption.label;
    const selectedValue = selectedOption.value;
    if (selectedLabel === ADD_VALUE_LABEL) {
      dispatch(
        updateSingleFieldValueMapping({
          key: field,
          value: { action: ADD_VALUE_VALUE }
        })
      );
    } else if (selectedLabel === IGNORE_VALUE_LABEL) {
      dispatch(
        updateSingleFieldValueMapping({
          key: field,
          value: {
            action: IGNORE_VALUE_VALUE
          }
        })
      );
    } else
      dispatch(
        updateSingleFieldValueMapping({
          key: field,
          value: selectedValue
        })
      );
  };

  const onModalCloseHandler = () => {
    dispatch(setMapFieldModalConfig({ ...modalConfig, show: false }));
  };

  const handleSaveClick = (key) => {
    dispatch(
      logEventHelper('TM_CiValueUpdateSaveCtaClicked', {
        project_id: projectId
      })
    );
    dispatch(setValueMappings({ key, value: currentFieldValueMapping }));
    dispatch(setMapFieldModalConfig({ ...modalConfig, show: false }));
  };

  const editMappingHandler = () => {
    dispatch(
      logEventHelper('TM_CiEditFieldValueMapBtnClicked', {
        project_id: projectId
      })
    );
    dispatch(setShowMappings(false));
  };

  const ampEventMapPageLoaded = () => {
    dispatch(
      logEventHelper('TM_CiMapFieldsPageLoaded', {
        project_id: projectId,
        field_mapping: JSON.stringify(myFieldMappings),
        value_mapping: JSON.stringify(valueMappings)
      })
    );
  };

  const handleMappingProceedClick = () => {
    dispatch(
      logEventHelper('TM_CiMapProceedCtaClicked', {
        project_id: projectId,
        field_mapping: JSON.stringify(myFieldMappings),
        value_mapping: JSON.stringify(valueMappings)
      })
    );
    const folderId = queryParams.get('folder');
    const mappingData = {
      importId: mapFieldsConfig.importId,
      myFieldMappings,
      valueMappings,
      customFieldNames
    };

    if (projectId && projectId !== 'new') mappingData.projectId = projectId;
    if (folderId) mappingData.folderId = folderId;
    dispatch(submitMappingData(mappingData));
  };

  return {
    ampEventMapPageLoaded,
    mapFieldsError,
    allowedValueMapper,
    displayOptions,
    mapNameToDisplay,
    mapDisplayToName,
    typeMapper,
    myFieldMappings,
    rowRef,
    showMappings,
    valueMappings,
    errorLabelInMapFields,
    mapFieldProceedLoading,
    allImportFields: mapFieldsConfig?.importFields,
    showSelectMenuErrorInMapFields,
    VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN,
    editMappingHandler,
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

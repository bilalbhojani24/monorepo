import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ChevronDownIcon, ChevronUpIcon } from '@browserstack/bifrost';

import { setGlobalAlert } from '../../slices/globalAlertSlice';

import FormFieldMap from './FormFieldMap';
import { splitFields } from './helpers';
import { FormBuilderType } from './types';

const FormBuilder = ({
  fields,
  fieldErrors,
  attachments,
  handleSubmit,
  setAttachments,
  descriptionMeta,
  isWorkInProgress,
  scrollWidgetToTop,
  setIsWorkInProgress,
  isFormBeingSubmitted,
  hideDescription = false
}) => {
  const dispatch = useDispatch();
  const [fieldsData, setFieldsData] = useState({});
  const [formFieldErrors, setFormFieldErrors] = useState({});
  const [shouldShowOptionalFields, setShouldShowOptionalFields] =
    useState(false);
  const showAllFieldsButtonText = shouldShowOptionalFields
    ? 'Collapse all fields'
    : 'Show all fields';
  const toggleOptionalFieldsVisibility = () => {
    setShouldShowOptionalFields(!shouldShowOptionalFields);
  };
  const [areSomeRequiredFieldsEmpty, setAreSomeRequiredFieldsEmpty] =
    useState(false);

  const [fieldsToShowAtTop, requiredFields, optionalFields] = useMemo(
    () => splitFields(fields),
    [fields]
  );

  const resetFieldsData = () => {
    setFieldsData({});
  };

  useEffect(() => {
    const isWIP = Object.values(fieldsData).some((field) => {
      if (Array.isArray(field) && field.length) return true;
      return Boolean(field);
    });
    if (isWIP) {
      setIsWorkInProgress(true);
    }
  }, [fieldsData, setIsWorkInProgress]);

  useEffect(() => {
    if (fieldErrors) {
      setFormFieldErrors(fieldErrors);
    }
  }, [fieldErrors]);

  const renderFields = (fieldsToRender) =>
    fieldsToRender?.map(
      ({
        key,
        label,
        schema,
        options,
        required,
        search_path: searchPath,
        options_path: optionsPath,
        placeholder,
        validations,
        default_value: defaultValue,
        description,
        current_value: currentValue
      }) => {
        const Field = FormFieldMap[schema?.field];
        if (Field) {
          return (
            <Field
              value={currentValue}
              label={label}
              fieldKey={key}
              schema={schema}
              options={options}
              required={required}
              searchPath={searchPath}
              fieldsData={fieldsData}
              attachments={attachments}
              optionsPath={optionsPath}
              placeholder={placeholder}
              validations={validations}
              description={description}
              defaultValue={defaultValue}
              fieldErrors={formFieldErrors}
              setFieldsData={setFieldsData}
              setAttachments={setAttachments}
              descriptionMeta={descriptionMeta}
              hideDescription={hideDescription}
              areSomeRequiredFieldsEmpty={areSomeRequiredFieldsEmpty}
            />
          );
        }
        return null;
      }
    );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!isWorkInProgress || isFormBeingSubmitted) return null;
    if (typeof handleSubmit === 'function') {
      const hasSomeEmptyRequiredFields = requiredFields?.some((field) => {
        const stateValue = fieldsData[field.key];
        if (Array.isArray(stateValue) && stateValue.length === 0) return true;
        return !stateValue;
      });
      if (hasSomeEmptyRequiredFields) {
        setAreSomeRequiredFieldsEmpty(hasSomeEmptyRequiredFields);
        dispatch(
          setGlobalAlert({
            kind: 'error',
            message: `Please fill all mandatory fields to continue.`,
            autoDismiss: true
          })
        );
        scrollWidgetToTop();
      } else {
        handleSubmit(fieldsData).then((response) => {
          if (response?.success) {
            resetFieldsData();
            setIsWorkInProgress(false);
            setAreSomeRequiredFieldsEmpty(false);
          }
        });
      }
    }
    return null;
  };

  return (
    <form id="form-builder" onSubmit={handleFormSubmit}>
      {renderFields(fieldsToShowAtTop)}
      {renderFields(requiredFields)}
      {optionalFields && (
        <>
          <Button
            variant="minimal"
            wrapperClassName="border-0 shadow-none focus:ring-0 px-0 text-sm focus:ring-offset-0 mb-2"
            icon={
              shouldShowOptionalFields ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
            iconPlacement="end"
            onClick={toggleOptionalFieldsVisibility}
          >
            {showAllFieldsButtonText}
          </Button>
          {shouldShowOptionalFields && renderFields(optionalFields)}
        </>
      )}
    </form>
  );
};
FormBuilder.propTypes = FormBuilderType;
export default FormBuilder;

import React, { useEffect, useMemo, useState } from 'react';
import { Button, ChevronDownIcon, ChevronUpIcon } from '@browserstack/bifrost';

import FormFieldMap from './FormFieldMap';
import { splitFields } from './helpers';
import { FormBuilderType } from './types';

const FormBuilder = ({
  fields,
  metaData,
  attachments,
  handleSubmit,
  setAttachments,
  setIsWorkInProgress,
  hideDescription = false,
  showDescriptionMetaIn = ''
}) => {
  const [fieldsData, setFieldsData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
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
  const resetFieldErrors = () => {
    setFieldErrors({});
  };

  useEffect(() => {
    const isWIP = Object.values(fieldsData).some((field) => {
      if (Array.isArray(field) && field.length) return true;
      return Boolean(field);
    });
    setIsWorkInProgress(isWIP);
  }, [fieldsData, setIsWorkInProgress]);

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
              metaData={metaData}
              required={required}
              attachments={attachments}
              fieldErrors={fieldErrors}
              searchPath={searchPath}
              fieldsData={fieldsData}
              optionsPath={optionsPath}
              placeholder={placeholder}
              validations={validations}
              description={description}
              defaultValue={defaultValue}
              setFieldsData={setFieldsData}
              setAttachments={setAttachments}
              hideDescription={hideDescription}
              showDescriptionMetaIn={showDescriptionMetaIn}
              areSomeRequiredFieldsEmpty={areSomeRequiredFieldsEmpty}
            />
          );
        }
        return null;
      }
    );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (typeof handleSubmit === 'function') {
      const hasSomeEmptyRequiredFields = requiredFields.some((field) => {
        const stateValue = fieldsData[field.key];
        if (Array.isArray(stateValue) && stateValue.length === 0) return true;
        return !stateValue;
      });
      if (hasSomeEmptyRequiredFields) {
        setAreSomeRequiredFieldsEmpty(hasSomeEmptyRequiredFields);
      } else {
        resetFieldErrors();
        handleSubmit(fieldsData)
          .then((response) => {
            if (response?.success) {
              resetFieldsData();
            }
          })
          .catch((errorResponse) => {
            if (errorResponse.field_errors) {
              setFieldErrors(errorResponse.field_errors);
            }
          });
      }
    }
  };

  return (
    <form id="form-builder" onSubmit={handleFormSubmit}>
      {renderFields(fieldsToShowAtTop)}
      {renderFields(requiredFields)}
      {optionalFields && (
        <>
          {shouldShowOptionalFields && renderFields(optionalFields)}
          <Button
            variant="minimal"
            wrapperClassName="border-0 shadow-none focus:ring-0 px-0 text-sm"
            icon={
              shouldShowOptionalFields ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
            iconPlacement="end"
            onClick={toggleOptionalFieldsVisibility}
          >
            {showAllFieldsButtonText}
          </Button>
        </>
      )}
    </form>
  );
};
FormBuilder.propTypes = FormBuilderType;
export default FormBuilder;

import React, { useMemo, useState } from 'react';
import { Button, ChevronDownIcon, ChevronUpIcon } from '@browserstack/bifrost';

import FormFieldMap from './FormFieldMapper';
import { FormBuilderType } from './types';

const FormBuilder = ({ fields, handleSubmit, metaData }) => {
  const [fieldsData, setFieldsData] = useState({});
  const [shouldShowOptionalFields, setShouldShowOptionalFields] =
    useState(false);
  const showAllFieldsButtonText = shouldShowOptionalFields
    ? 'Collapse all fields'
    : 'Show all fields';
  const toggleOptionalFieldsVisibility = () => {
    setShouldShowOptionalFields(!shouldShowOptionalFields);
  };
  const [fieldsToShowAtTop, requiredFields, optionalFields] = useMemo(
    () =>
      fields?.reduce((accumulator, field) => {
        const buckets = accumulator;
        const SHOW_AT_TOP_BUCKET = 0;
        const REQUIRED_BUCKET = 1;
        const OPTIONAL_BUCKET = 2;
        const FIELDS_KEYS_TO_SHOW_AT_TOP = [
          'assignee',
          'summary',
          'description'
        ];
        const {
          schema: { system_type: key }
        } = field;
        const keyIdx = FIELDS_KEYS_TO_SHOW_AT_TOP.indexOf(key);
        if (keyIdx !== -1) {
          if (!buckets[SHOW_AT_TOP_BUCKET]) {
            buckets[SHOW_AT_TOP_BUCKET] = new Array(
              FIELDS_KEYS_TO_SHOW_AT_TOP.length
            );
          }
          buckets[SHOW_AT_TOP_BUCKET][keyIdx] = field;
          return buckets;
        }

        const { required } = field;

        const bucketIdx = required ? REQUIRED_BUCKET : OPTIONAL_BUCKET;

        if (!buckets[bucketIdx]) {
          buckets[bucketIdx] = [];
        }
        buckets[bucketIdx].push(field);

        return buckets;
      }, []),
    [fields]
  );

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
        defaultValue,
        description
      }) => {
        const Field = FormFieldMap[schema?.field];
        if (Field) {
          return (
            <div className="py-3">
              <Field
                label={label}
                fieldKey={key}
                schema={schema}
                options={options}
                metaData={metaData}
                required={required}
                searchPath={searchPath}
                fieldsData={fieldsData}
                optionsPath={optionsPath}
                placeholder={placeholder}
                validations={validations}
                description={description}
                defaultValue={defaultValue}
                setFieldsData={setFieldsData}
              />
            </div>
          );
        }
        return null;
      }
    );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (typeof handleSubmit === 'function') {
      handleSubmit(fieldsData);
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

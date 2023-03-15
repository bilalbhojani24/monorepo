import React, { useState } from 'react';

import FormFieldMap from './FormFieldMapper';
import { FormBuilderType } from './types';

const FormBuilder = ({ fields, handleSubmit, metaData }) => {
  // const initialState = fi
  const [fieldsData, setFieldsData] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (typeof handleSubmit === 'function') {
      handleSubmit(fieldsData);
    }
  };

  return (
    <form id="form-builder" onSubmit={handleFormSubmit}>
      {fields.map(
        ({
          key,
          label,
          schema,
          options,
          required,
          searchUrl,
          optionsPath,
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
                  searchUrl={searchUrl}
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
      )}
    </form>
  );
};
FormBuilder.propTypes = FormBuilderType;
export default FormBuilder;

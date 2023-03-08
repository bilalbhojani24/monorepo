import React, { useState } from 'react';

import Label from '../Label';

import FormFieldMap from './FormFieldMapper';
import { FormBuilderType } from './types';

const FormBuilder = ({ fields, handleSubmit }) => {
  // const initialState = fi
  const [fieldsData, setFieldsData] = useState({});

  const handleFormSubmit = () => {
    if (typeof handleSubmit === 'function') {
      handleSubmit(fieldsData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {fields.map(
        ({
          key,
          label,
          schema,
          options,
          required,
          searchUrl,
          optionsUrl,
          placeholder,
          validations,
          defaultValue
        }) => {
          const Field = FormFieldMap[schema?.field];
          if (Field) {
            return (
              <div className="my-3">
                <Label required={required} label={label} />
                <Field
                  fieldKey={key}
                  label={label}
                  schema={schema}
                  options={options}
                  required={required}
                  searchUrl={searchUrl}
                  optionsUrl={optionsUrl}
                  placeholder={placeholder}
                  validations={validations}
                  defaultValue={defaultValue}
                  fieldsData={fieldsData}
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

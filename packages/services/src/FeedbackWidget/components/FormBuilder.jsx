import React, { useContext } from 'react';
import { InputField, TextArea } from '@browserstack/bifrost';

import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

const FormBuilder = () => {
  const { formFields, formError, setFormData } = useContext(
    FeedbackWidgetContextData
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="space-y-4">
      {formFields.map((field) => {
        if (field.fieldType === 'textarea')
          return (
            <TextArea
              key={field.id}
              id={field.id}
              onChange={handleChange}
              placeholder={field.placeholder}
              isResizable={field.isResizable}
              errorText={formError[field.id]}
              isMandatory={field.isMandatory}
              label={field.label}
              {...field}
            />
          );
        if (field.fieldType === 'input')
          return (
            <InputField
              key={field.id}
              id={field.id}
              onChange={handleChange}
              errorText={formError[field.id]}
              placeholder={field.placeholder}
              isMandatory={field.isMandatory}
              label={field.label}
              {...field}
            />
          );
        return null;
      })}
    </div>
  );
};

export default FormBuilder;

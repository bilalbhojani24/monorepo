import React, { useContext } from 'react';
import { InputField, TextArea } from '@browserstack/bifrost';

import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

const FormBuilder = () => {
  const { formFields, formData, setFormData, formError } = useContext(
    FeedbackWidgetContextData
  );
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="space-y-2">
      {formFields.map((field) => {
        if (field.fileType === 'textarea')
          return <TextArea {...field} onChange={handleChange} />;
        if (field.fileType === 'input')
          return (
            <InputField
              {...field}
              onChange={handleChange}
              errorText={formError[field.id]}
            />
          );
        return null;
      })}
    </div>
  );
};

export default FormBuilder;

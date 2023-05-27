import { useState } from 'react';

export const useFeedbackWidget = ({
  handleFeedbackClick,
  formFields,
  flow
}) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [feedbacktype, setFeedbacktype] = useState(flow[0]);

  const handleClick = () => {
    setTimeout(() => {
      const steps = flow.length;
      const cs = flow.findIndex((f) => f.type === feedbacktype.type);

      if (cs >= 0 && cs < steps) {
        setFeedbacktype(flow[cs + 1]);
      }
    }, 500);
  };

  const handleFormSubmit = () => {
    setFormError({});
    let error = 0;

    formFields.forEach((field) => {
      const currentFieldValue = formData[field.id];

      if (field.isMandatory && !currentFieldValue) {
        setFormError((prev) => ({
          ...prev,
          [field.id]: `${field?.label ? 'Required field' : 'is required'}`
        }));
        error += 1;
      }

      if (
        currentFieldValue?.length &&
        field.regex &&
        !field.regex.test(formData[field?.id])
      ) {
        setFormError((prev) => ({ ...prev, [field.id]: field.errorMessage }));
        error += 1;
      }
    });

    if (error <= 0) {
      handleFeedbackClick?.(formData);
      handleClick();
    }
  };

  return {
    formData,
    setFormData,
    formError,
    setFormError,
    feedbacktype,
    setFeedbacktype,
    handleClick,
    handleFormSubmit
  };
};

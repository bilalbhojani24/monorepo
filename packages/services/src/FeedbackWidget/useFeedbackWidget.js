import { useState } from 'react';

import {
  emojisConstants,
  FEEDBACK_TYPE,
  npsConstants,
  thumbsConstants
} from './const/feedbackWidgetConst';

export const useFeedbackWidget = ({
  handleFeedbackClick,
  formFields,
  flow
}) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [feedbacktype, setFeedbacktype] = useState(flow[0]);

  const finalFeedbackTypeArray = () => {
    if (feedbacktype.type === FEEDBACK_TYPE[0]) return emojisConstants;
    if (feedbacktype.type === FEEDBACK_TYPE[2]) return thumbsConstants;
    if (feedbacktype.type === FEEDBACK_TYPE[3]) return npsConstants;
    return [];
  };

  const handleClick = () => {
    const steps = flow.length;
    const currentStep = flow.findIndex((f) => f.type === feedbacktype.type);

    if (currentStep >= 0 && currentStep < steps) {
      setFeedbacktype(flow[currentStep + 1]);
    }
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
    handleFormSubmit,
    finalFeedbackTypeArray
  };
};

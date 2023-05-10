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

    formFields.forEach((field) => {
      let error = 0;
      const currentFieldValue = formData[field.id];
      if (field.isMandatory && !currentFieldValue) {
        setFormError((prev) => ({
          ...prev,
          [field.id]: 'Required field'
        }));
        error += 1;
      }

      if (field.regex && !field.regex.test(formData[field?.id])) {
        setFormError({
          ...formError,
          [field.id]: field.errorMessage
        });
        error += 1;
      }

      if (!error) {
        handleFeedbackClick?.(formData);
        handleClick();
      }
    });
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

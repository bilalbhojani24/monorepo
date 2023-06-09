import React, { useCallback, useEffect, useState } from 'react';
import { notify } from '@browserstack/bifrost';

import RenderToast from './components/RenderToast';
import { VARIATIONS } from './const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from './context/feedbackWidgetContext';

export const useFeedbackWidget = ({
  handleFeedbackClick,
  formFields,
  flow,
  open,
  variation
}) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [feedbacktype, setFeedbacktype] = useState(flow[0]);
  const [selectedNPS, setSelectedNPS] = useState();

  const handleClick = useCallback(
    (data) => {
      setTimeout(() => {
        const currentFeedbackType = feedbacktype;
        const steps = flow.length;
        const cs = flow.findIndex((f) => f.type === feedbacktype.type);

        if (cs >= 0 && cs < steps) {
          setFeedbacktype(flow[cs + 1]);
          handleFeedbackClick?.({
            type: currentFeedbackType?.type,
            data
          });
        }
      }, 300);
    },
    [feedbacktype, flow, handleFeedbackClick]
  );

  const handleFormSubmit = useCallback(() => {
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
      handleClick(formData);
    }
  }, [formData, formFields, handleClick]);

  const showNotification = useCallback(() => {
    notify(
      <FeedbackWidgetContextData.Provider
        value={{
          feedbacktype,
          formData,
          setFormData,
          formError,
          setFormError,
          formFields,
          setFeedbacktype,
          flow,
          handleClick,
          handleFormSubmit,
          isOpen: open,
          selectedNPS,
          setSelectedNPS,
          variation
        }}
      >
        <RenderToast />
      </FeedbackWidgetContextData.Provider>,
      {
        position: 'bottom-right',
        id: 'feedback-widget',
        size: 'md',
        autoClose: true,
        duration: Infinity
      }
    );
  }, [
    feedbacktype,
    flow,
    formData,
    formError,
    formFields,
    handleClick,
    handleFormSubmit,
    open,
    selectedNPS,
    variation
  ]);

  useEffect(() => {
    if (open && variation === VARIATIONS[1]) showNotification();
  }, [open, showNotification, variation]);

  const hideNotification = () => {
    notify.remove('feedback-widget');
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
    showNotification,
    hideNotification,
    selectedNPS,
    setSelectedNPS
  };
};

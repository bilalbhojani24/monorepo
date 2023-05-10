import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RenderModal from './components/RenderModal';
import RenderToast from './components/RenderToast';
import {
  emojisConstants,
  feedbackType,
  npsConstants,
  thumbsConstants
} from './const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from './context/feedbackWidgetContext';

const FeedbackWidget = ({
  description,
  handleFeedbackClick,
  formFields,
  title,
  type,
  variation,
  variationsProps
}) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  const arrayType = () => {
    if (type === 'emoji') return emojisConstants;
    if (type === 'thumbs') return thumbsConstants;
    if (type === 'nps') return npsConstants;
    return [];
  };

  const renderVariation = () => {
    if (variation === 'modal') return <RenderModal />;
    if (variation === 'toast') return <RenderToast />;
    return null;
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
      }
    });
  };

  return (
    <FeedbackWidgetContextData.Provider
      value={{
        arrayType,
        handleFeedbackClick,
        type,
        title,
        description,
        variationsProps,
        formData,
        setFormData,
        formError,
        setFormError,
        fields: formFields,
        handleFormSubmit
      }}
    >
      {renderVariation()}
    </FeedbackWidgetContextData.Provider>
  );
};

FeedbackWidget.propTypes = {
  description: PropTypes.node,
  handleFeedbackClick: PropTypes.func,
  type: PropTypes.oneOf(feedbackType),
  title: PropTypes.node,
  variation: PropTypes.oneOf(['modal', 'toast']),
  formFields: PropTypes.arrayOf(PropTypes.shape({})),
  variationsProps: {
    modal: PropTypes.shape({}),
    modalHeader: PropTypes.shape({}),
    modalBody: PropTypes.shape({}),
    modalFooter: PropTypes.shape({})
  }
};
FeedbackWidget.defaultProps = {
  description: null,
  handleFeedbackClick: null,
  formFields: [],
  type: feedbackType[0],
  title: null,
  variation: 'modal',
  variationsProps: {
    modal: {},
    modalHeader: {},
    modalBody: {},
    modalFooter: {}
  }
};

export default FeedbackWidget;

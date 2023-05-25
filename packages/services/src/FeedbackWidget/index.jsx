import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RenderModal from './components/RenderModal';
import RenderToast from './components/RenderToast';
import { FEEDBACK_TYPE, VARIATIONS } from './const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from './context/feedbackWidgetContext';
import { useFeedbackWidget } from './useFeedbackWidget';

const FeedbackWidget = ({
  handleFeedbackClick,
  formFields,
  flow,
  isOpen,
  variation,
  variationsProps,
  currentStep
}) => {
  const [selectedNPS, setSelectedNPS] = useState();
  const {
    formData,
    setFormData,
    formError,
    setFormError,
    feedbacktype,
    setFeedbacktype,
    handleClick,
    handleFormSubmit,
    finalFeedbackTypeArray
  } = useFeedbackWidget({
    handleFeedbackClick,
    formFields,
    flow,
    currentStep
  });

  const renderVariation = () => {
    if (variation === VARIATIONS[0]) return <RenderModal />;
    if (variation === VARIATIONS[1]) return <RenderToast />;
    return null;
  };

  return (
    <FeedbackWidgetContextData.Provider
      value={{
        handleFeedbackClick,
        feedbacktype,
        variationsProps,
        formData,
        setFormData,
        formError,
        setFormError,
        formFields,
        setFeedbacktype,
        flow,
        handleClick,
        handleFormSubmit,
        finalFeedbackTypeArray,
        isOpen,
        selectedNPS,
        setSelectedNPS,
        variation
      }}
    >
      {renderVariation()}
    </FeedbackWidgetContextData.Provider>
  );
};

FeedbackWidget.propTypes = {
  currentStep: PropTypes.number,
  handleFeedbackClick: PropTypes.func,
  formFields: PropTypes.arrayOf(PropTypes.shape({})),
  flow: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(FEEDBACK_TYPE),
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.node
    })
  ).isRequired,
  isOpen: PropTypes.bool,
  variation: PropTypes.oneOf(VARIATIONS),
  variationsProps: {
    modal: PropTypes.shape({}),
    modalHeader: PropTypes.shape({}),
    modalBody: PropTypes.shape({}),
    modalFooter: PropTypes.shape({})
  }
};
FeedbackWidget.defaultProps = {
  currentStep: 0,
  handleFeedbackClick: null,
  formFields: [],
  isOpen: false,
  variation: VARIATIONS[2],
  variationsProps: {
    modal: {},
    modalHeader: {},
    modalBody: {},
    modalFooter: {}
  }
};

export default FeedbackWidget;

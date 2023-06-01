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
  variationsProps
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
    handleFormSubmit
  } = useFeedbackWidget({
    handleFeedbackClick,
    formFields,
    flow
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
  /**
   * Whenever next button is clicked on feedback
   */
  handleFeedbackClick: PropTypes.func,
  /**
   * This is an array of object of formfields when in feedback you have form
   */
  formFields: PropTypes.arrayOf(PropTypes.shape({})),
  // The sequence of flow
  flow: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(FEEDBACK_TYPE),
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.node
    })
  ).isRequired,
  // The status of feedback Toast/modal
  isOpen: PropTypes.bool,
  // Types of variations
  variation: PropTypes.oneOf(VARIATIONS),
  // The variations props of components
  variationsProps: {
    modal: PropTypes.shape({}),
    modalHeader: PropTypes.shape({}),
    modalBody: PropTypes.shape({}),
    modalFooter: PropTypes.shape({})
  }
};
FeedbackWidget.defaultProps = {
  handleFeedbackClick: null,
  formFields: [],
  isOpen: false,
  variation: null,
  variationsProps: {
    modal: {},
    modalHeader: {},
    modalBody: {},
    modalFooter: {}
  }
};

export default FeedbackWidget;

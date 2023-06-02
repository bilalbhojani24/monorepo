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
  /** An array of objects representing the sequence in which the feedback form will be incremented.
   */
  flow: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(FEEDBACK_TYPE),
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.node
    })
  ).isRequired,
  /**
   * An array of objects that describes the types of form fields to be used in a form builder.
   */
  formFields: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * A callback function invoked when the user clicks on the button to proceed to the next step of feedback.
   */
  handleFeedbackClick: PropTypes.func,
  // A flag indicating whether the modal or toast for feedback is currently open or closed.
  isOpen: PropTypes.bool,
  // A prop that determines the display option for the component, allowing it to be shown as either a modal or a toast.
  variation: PropTypes.oneOf(VARIATIONS),
  // A prop used to pass component-specific properties to the internally used Modal and Notifications components from the Bifrost component library, based on the chosen variation.
  variationsProps: {
    modal: PropTypes.shape({}),
    modalHeader: PropTypes.shape({}),
    modalBody: PropTypes.shape({}),
    modalFooter: PropTypes.shape({}),
    notifications: PropTypes.shape({})
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

import React from 'react';
import PropTypes from 'prop-types';

import RenderModal from './components/RenderModal';
import RenderToast from './components/RenderToast';
import { VARIATIONS } from './const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from './context/feedbackWidgetContext';
import { useFeedbackWidget } from './useFeedbackWidget';

const FeedbackWidget = ({
  handleFeedbackClick,
  formFields,
  flow,
  variation,
  variationsProps
}) => {
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
        finalFeedbackTypeArray
      }}
    >
      {renderVariation()}
    </FeedbackWidgetContextData.Provider>
  );
};

FeedbackWidget.propTypes = {
  handleFeedbackClick: PropTypes.func,
  formFields: PropTypes.arrayOf(PropTypes.shape({})),
  flow: PropTypes.arrayOf(PropTypes.string).isRequired,
  variation: PropTypes.oneOf(VARIATIONS),
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
  variation: VARIATIONS[2],
  variationsProps: {
    modal: {},
    modalHeader: {},
    modalBody: {},
    modalFooter: {}
  }
};

export default FeedbackWidget;

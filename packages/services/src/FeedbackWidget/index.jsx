import React, { useEffect, useState } from 'react';
import { pubSub as PubSub } from '@browserstack/utils';
import PropTypes from 'prop-types';

import RenderModal from './components/RenderModal';
import { FEEDBACK_TYPE, VARIATIONS } from './const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from './context/feedbackWidgetContext';
import { useFeedbackWidget } from './useFeedbackWidget';

const feedbackWidgetPubSub = new PubSub();

export const showFeedbackWidget = (onOpenCb) => {
  feedbackWidgetPubSub.publish('feedbackWidgetOpen', onOpenCb);
};

export const closeFeedbackWidget = (onCloseCb) => {
  feedbackWidgetPubSub.publish('feedbackWidgetClose', onCloseCb);
};

const FeedbackWidget = ({
  handleFeedbackClick,
  formFields,
  flow,
  variation
}) => {
  const [open, setOpen] = useState(false);
  const {
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
  } = useFeedbackWidget({
    handleFeedbackClick,
    formFields,
    flow,
    variation,
    open
  });

  useEffect(() => {
    const opnSubs = feedbackWidgetPubSub.subscribe(
      'feedbackWidgetOpen',
      (cb) => {
        setOpen(true);
        cb?.();
      }
    );

    const closeSubs = feedbackWidgetPubSub.subscribe(
      'feedbackWidgetClose',
      (cb) => {
        setOpen(false);
        cb?.();
        if (variation === VARIATIONS[1]) {
          hideNotification();
        }
      }
    );

    return () => {
      opnSubs();
      closeSubs();
    };
  }, [hideNotification, showNotification, variation]);

  const renderVariation = () => {
    if (variation === VARIATIONS[0]) return <RenderModal />;
    return null;
  };

  return (
    <FeedbackWidgetContextData.Provider
      value={{
        handleFeedbackClick,
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
  // isOpen: PropTypes.bool,
  // A prop that determines the display option for the component, allowing it to be shown as either a modal or a toast.
  variation: PropTypes.oneOf(VARIATIONS)
};
FeedbackWidget.defaultProps = {
  handleFeedbackClick: null,
  formFields: [],
  variation: null
};

export default FeedbackWidget;

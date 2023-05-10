import React from 'react';
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
  title,
  type,
  variation,
  variationsProps
}) => {
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

  return (
    <FeedbackWidgetContextData.Provider
      value={{
        arrayType,
        handleFeedbackClick,
        type,
        title,
        description,
        variationsProps
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

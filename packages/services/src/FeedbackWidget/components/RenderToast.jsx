import React, { useContext } from 'react';
import { Button, Notifications } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import { FEEDBACK_TYPE } from '../const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';
import { closeFeedbackWidget } from '../index';

import FormBuilder from './FormBuilder';
import RenderNpsBody from './RenderNpsBody';
import RenderThumb from './RenderThumb';

const RenderToast = () => {
  const { handleFormSubmit, feedbacktype } = useContext(
    FeedbackWidgetContextData
  );

  return (
    <Notifications
      size="md"
      title={feedbacktype.title}
      description={feedbacktype.description}
      headerIcon={feedbacktype.icon}
      {...(feedbacktype.type !== FEEDBACK_TYPE[4] && {
        body: (
          <div className="w-full">
            {/* render thumb or emoji view */}
            {[FEEDBACK_TYPE[0], FEEDBACK_TYPE[2]].includes(
              feedbacktype.type
            ) && <RenderThumb />}

            {/* render nps(number) view */}
            {feedbacktype.type === FEEDBACK_TYPE[3] && <RenderNpsBody />}

            {/* render form view */}
            {feedbacktype.type === FEEDBACK_TYPE[1] && <FormBuilder />}
          </div>
        ),
        bodyClassName: twClassNames('pt-1 pb-7', {
          'pb-4': feedbacktype.type === FEEDBACK_TYPE[1]
        })
      })}
      {...(feedbacktype.type === FEEDBACK_TYPE[1] && {
        footer: (
          <div>
            <Button type="submit" onClick={handleFormSubmit}>
              Submit Feedback
            </Button>
          </div>
        ),
        footerClassName: 'py-3 px-4'
      })}
      handleClose={() => closeFeedbackWidget()}
    />
  );
};

export default RenderToast;

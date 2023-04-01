import React from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineFeedback } from '@browserstack/bifrost';

import { setShowFeedbackModal } from '../slices/dashboardSlice';

const useFooter = () => {
  const dispatch = useDispatch();

  const feedbackButtonClicked = () => {
    dispatch(setShowFeedbackModal(true));
  };

  return {
    feedbackButtonClicked
  };
};

const Footer = () => {
  const { feedbackButtonClicked } = useFooter();

  return (
    <div
      id="mcpFooter"
      className="border-base-300 flex h-8 items-center justify-end border-t px-3"
    >
      <div className="flex items-center">
        <div
          role="presentation"
          className="text-base-600 flex cursor-pointer items-center "
          onClick={feedbackButtonClicked}
        >
          <div className="text-xl">
            <MdOutlineFeedback />
          </div>

          <div className="ml-1 text-xs font-medium leading-4">Feedback</div>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;

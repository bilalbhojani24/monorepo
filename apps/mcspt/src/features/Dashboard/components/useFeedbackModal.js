import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '@browserstack/utils';

import {
  getGeneralAnalytics,
  getIsUserLoggedIn,
  getShowFeedbackModal,
  setShowFeedbackModal
} from '../slices/dashboardSlice';
import { submitUserFeedback } from '../slices/dashboardThunks';

const useFeedbackModal = () => {
  const showFeedbackModal = useSelector(getShowFeedbackModal);
  const isUserLoggedIn = useSelector(getIsUserLoggedIn);
  const generalAnalytics = useSelector(getGeneralAnalytics);

  const [hasUserLiked, setUserLiked] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const dispatch = useDispatch();

  const emailValueChanged = (event) => {
    setEmailValue(event.target.value);

    const isEmailValid = validateEmail(event.target.value);

    if (isEmailValid) {
      setEmailErrorText('');
    } else {
      setEmailErrorText('Please enter valid email.');
    }
  };

  const textareaValueChanged = (event) => {
    setTextareaValue(event.target.value);
  };

  const closeFeedbackModal = () => {
    if (hasUserLiked || textareaValue || (emailValue && !emailErrorText)) {
      const rqData = {
        feedback: hasUserLiked || undefined,
        comment: textareaValue || undefined,
        email: emailErrorText ? undefined : emailValue || undefined,

        platform: generalAnalytics?.host_platform,
        os_version: generalAnalytics?.host_os_version,
        uuid: generalAnalytics?.host_uuid
      };

      dispatch(submitUserFeedback(rqData));
    }

    dispatch(setShowFeedbackModal(false));

    setUserLiked('');
    setEmailValue('');
    setEmailErrorText('');
    setTextareaValue('');
  };

  return {
    showFeedbackModal,
    closeFeedbackModal,
    hasUserLiked,
    setUserLiked,
    emailValue,
    emailValueChanged,
    emailErrorText,
    isUserLoggedIn,
    textareaValue,
    textareaValueChanged
  };
};

export default useFeedbackModal;

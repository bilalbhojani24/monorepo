import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { notify } from '@browserstack/bifrost';

import { dismissTCAssignNotificationAPI } from '../../../api/onboarding.api';
import { setTCAssignedNotificationConfig } from '../slices/onboardingSlice';
import { notificationDecider } from '../slices/onboardingThunk';

const useTCAssignedNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const tcAssignedNotificationConfig = useSelector(
    (state) => state.onboarding.tcAssignedNotificationConfig
  );
  const isOnboardingCompleted = useSelector(
    (state) => state.onboarding.isOnboardingCompleted
  );
  const timerFinished = useSelector((state) => state.onboarding.timerFinished);
  const removeNotification = (toastDataId) => {
    notify.remove(toastDataId);
    dismissTCAssignNotificationAPI();
    dispatch(setTCAssignedNotificationConfig({ show: false }));
  };

  const handleFirstButtonClick = (toastDataId) => {
    removeNotification(toastDataId);
    // redirect to test case page
  };

  const handleSecondButtonClick = (toastDataId) => {
    removeNotification(toastDataId);
  };

  useEffect(() => {
    if (isOnboardingCompleted) dispatch(notificationDecider());
  }, [isOnboardingCompleted, dispatch]);

  //   useEffect(() => {
  //     if (tcAssignedNotificationConfig?.show === false) {
  //         removeNotification(tcAssignedNotificationConfig?.id);
  //     }

  //     if (notificationConfig?.show) {
  //       if (importStatus === IMPORT_STATUS.SUCCESS)
  //         dispatch(logEventHelper('TM_QiSuccessNotification', {}));
  //       if (importStatus === IMPORT_STATUS.FAILURE)
  //         dispatch(logEventHelper('TM_QiErrorNotification', {}));
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [tcAssignedNotificationConfig?.show, tcAssignedNotificationConfig?.id]);

  return {
    notify,
    dispatch,
    tcAssignedNotificationConfig,
    timerFinished,
    removeNotification,
    handleFirstButtonClick,
    handleSecondButtonClick
  };
};

export default useTCAssignedNotification;

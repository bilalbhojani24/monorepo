import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notify } from '@browserstack/bifrost';
import AppRoute from 'const/routes';
import { setFilterSearchMeta } from 'features/Repository/slices/repositorySlice';
import { routeFormatter } from 'utils/helperFunctions';

import { dismissTCAssignNotificationAPI } from '../../../api/onboarding.api';
import { setTCAssignedNotificationConfig } from '../slices/onboardingSlice';
import { notificationDecider } from '../slices/onboardingThunk';

const useTCAssignedNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // global slice
  const user = useSelector((state) => state.global.user);
  // repository slice
  const filterSearchMeta = useSelector(
    (state) => state.repository.filterSearchMeta
  );
  const tcAssignedNotificationConfig = useSelector(
    (state) => state.onboarding.tcAssignedNotificationConfig
  );
  const isOnboardingCompleted = useSelector(
    (state) => state.onboarding.isOnboardingCompleted
  );
  const autoAssignedProjectId = useSelector(
    (state) => state.onboarding.autoAssignedProjectId
  );
  const timerFinished = useSelector((state) => state.onboarding.timerFinished);

  const removeNotification = (toastDataId) => {
    notify.remove(toastDataId);
    dismissTCAssignNotificationAPI();
    dispatch(setTCAssignedNotificationConfig({ show: false }));
  };

  const handleFirstButtonClick = (toastDataId) => {
    removeNotification(toastDataId);
    dispatch(setFilterSearchMeta({ ...filterSearchMeta, owner: [user?.id] }));
    navigate(
      `${routeFormatter(AppRoute.TEST_CASES_SEARCH, {
        projectId: autoAssignedProjectId
      })}?owner=${user?.id}`
    );
  };

  const handleSecondButtonClick = (toastDataId) => {
    removeNotification(toastDataId);
  };

  useEffect(() => {
    if (isOnboardingCompleted) dispatch(notificationDecider());
  }, [isOnboardingCompleted, dispatch]);

  return {
    notify,
    dispatch,
    user,
    tcAssignedNotificationConfig,
    timerFinished,
    removeNotification,
    handleFirstButtonClick,
    handleSecondButtonClick
  };
};

export default useTCAssignedNotification;

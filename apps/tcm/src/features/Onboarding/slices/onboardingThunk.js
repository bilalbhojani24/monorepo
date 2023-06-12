import { delay } from '@browserstack/utils';
import { getAutoAssignmentStatusAPI } from 'api/onboarding.api';
import AppRoute from 'const/routes';

import {
  autoAssignmentStatusFulfilled,
  setTimerFinished
} from './onboardingSlice';

const NOTIFICATION_DELAY = 2000;

const getCheckForNotification = (state) =>
  state.onboarding.checkForNotification;

export const notificationDecider = () => async (dispatch, getState) => {
  const state = getState();
  const checkForNotification = getCheckForNotification(state);
  if (checkForNotification) await delay(NOTIFICATION_DELAY);
  if (window.location.pathname !== AppRoute.ONBOARDING) {
    // using window location and not react-router-dom location api as it was giving the previous route on refresh
    dispatch(setTimerFinished(true));
    try {
      const response = await getAutoAssignmentStatusAPI();
      dispatch(autoAssignmentStatusFulfilled(response));
    } catch (err) {
      // some error
    }
  }
};

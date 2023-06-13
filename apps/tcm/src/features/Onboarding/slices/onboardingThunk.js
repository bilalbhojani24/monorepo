import { delay } from '@browserstack/utils';
import { getAutoAssignmentStatusAPI } from 'api/onboarding.api';

import { NO_AUTO_ASSIGN_PAGES } from '../const/immutableConst';

import {
  autoAssignmentStatusFulfilled,
  setTimerFinished
} from './onboardingSlice';

const NOTIFICATION_DELAY = 2000;

export const notificationDecider = () => async (dispatch) => {
  await delay(NOTIFICATION_DELAY);
  if (!NO_AUTO_ASSIGN_PAGES.includes(window.location.pathname)) {
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

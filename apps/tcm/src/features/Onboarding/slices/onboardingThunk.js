import { getAutoAssignmentStatusAPI } from 'api/onboarding.api';

import {
  autoAssignmentStatusFulfilled,
  setTimerFinished
} from './onboardingSlice';

const NOTIFICATION_DELAY = 2000;

export const notificationDecider = () => async (dispatch) => {
  try {
    const response = await getAutoAssignmentStatusAPI();
    dispatch(autoAssignmentStatusFulfilled(response));
  } catch (err) {
    // some error
  }
  setTimeout(() => {
    dispatch(setTimerFinished(true));
  }, NOTIFICATION_DELAY);
};

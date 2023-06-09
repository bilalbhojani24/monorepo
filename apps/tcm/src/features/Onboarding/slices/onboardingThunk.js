import { getAutoAssignmentStatusAPI } from '../../../api/onboarding.api';

import {
  autoAssignmentStatusFulfilled,
  setTimerFinished
} from './onboardingSlice';

export const notificationDecider = () => async (dispatch) => {
  setTimeout(() => {
    dispatch(setTimerFinished(true));
  }, 2000);

  try {
    const response = await getAutoAssignmentStatusAPI();
    dispatch(autoAssignmentStatusFulfilled(response));
  } catch (err) {
    // some error
  }
};

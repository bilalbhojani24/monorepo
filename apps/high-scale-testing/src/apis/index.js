import axios from 'axios';

import {
  ONBOARDING_DATA,
  ONBOARDING_EVENT_LOGS_DATA
} from './constants/apiURLs';

const getOnboardingData = (userId) =>
  axios.get(ONBOARDING_DATA, {
    params: {
      userId
    }
  });

const getOnboardingEventsLogsData = (userId, onboardingType) =>
  axios.get(ONBOARDING_EVENT_LOGS_DATA, {
    params: {
      userId,
      onboardingType
    }
  });

export { getOnboardingData, getOnboardingEventsLogsData };

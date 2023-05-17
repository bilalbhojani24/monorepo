import axios from 'axios';

import {
  ONBOARDING_DATA_URL,
  ONBOARDING_EVENT_LOGS_DATA_URL,
  ONBOARDING_REGION_CHANGE_URL,
  ONBOARDING_STATUS_URL
} from './constants/apiURLs';

const getOnboardingData = (userId) =>
  axios.get(ONBOARDING_DATA_URL, {
    params: {
      userId
    }
  });

const getOnboardingEventsLogsData = (userId, onboardingType) =>
  axios.get(ONBOARDING_EVENT_LOGS_DATA_URL, {
    params: {
      userId,
      onboardingType
    }
  });

const markOnboardingStatus = (userId, status) =>
  axios.put(ONBOARDING_STATUS_URL, {
    params: {
      userId,
      status
    }
  });

const markOnboardingRegionChange = (userId, newRegionObject) =>
  axios.put(ONBOARDING_REGION_CHANGE_URL, {
    params: { userId, region: newRegionObject }
  });

export {
  getOnboardingData,
  getOnboardingEventsLogsData,
  markOnboardingRegionChange,
  markOnboardingStatus
};

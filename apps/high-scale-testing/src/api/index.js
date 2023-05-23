import axios from 'axios';

import {
  FETCH_GRIDS_URL,
  ONBOARDING_DATA_URL,
  ONBOARDING_EVENT_LOGS_DATA_URL,
  ONBOARDING_REGION_CHANGE_URL,
  ONBOARDING_STATUS_URL
} from './constants/apiURLs';

const fetchAllGridsData = (userId) =>
  axios.get(FETCH_GRIDS_URL, {
    params: { userId }
  });

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

const markOnboardingRegionChange = (userId, cloudProvider, newRegionObject) =>
  axios.put(ONBOARDING_REGION_CHANGE_URL, {
    params: { userId, cloudProvider, region: newRegionObject }
  });

export {
  fetchAllGridsData,
  getOnboardingData,
  getOnboardingEventsLogsData,
  markOnboardingRegionChange,
  markOnboardingStatus
};

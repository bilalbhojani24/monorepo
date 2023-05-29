import axios from 'axios';

import {
  FETCH_CLUSTERS_URL,
  FETCH_GRID_URL,
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

const fetchGridDataById = (gridId) => axios.get(`${FETCH_GRID_URL}/${gridId}`);
const fetchAllClustersData = (userId) =>
  axios.get(FETCH_CLUSTERS_URL, {
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
  fetchAllClustersData,
  fetchAllGridsData,
  fetchGridDataById,
  getOnboardingData,
  getOnboardingEventsLogsData,
  markOnboardingRegionChange,
  markOnboardingStatus
};

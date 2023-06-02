import axios from 'axios';

import {
  CREATE_GRID,
  CREATE_GRID_EVENT_LOGS_DATA_URL,
  FETCH_CLUSTER_URL,
  FETCH_CLUSTERS_URL,
  FETCH_GRID_PROFILES_DATA_URL,
  FETCH_GRID_URL,
  FETCH_GRIDS_URL,
  ONBOARDING_DATA_URL,
  ONBOARDING_EVENT_LOGS_DATA_URL,
  ONBOARDING_REGION_CHANGE_URL,
  ONBOARDING_STATUS_URL,
  UPDATE_GRID_SETTINGS_URL
} from './constants/apiURLs';

const createNewGridProfile = (userId, profileData) =>
  axios.post(CREATE_GRID, { ...profileData, userId });

const fetchAllGridsData = (userId) =>
  axios.get(FETCH_GRIDS_URL, {
    params: { userId }
  });

const fetchAllClustersData = (userId) =>
  axios.get(FETCH_CLUSTERS_URL, {
    params: { userId }
  });

const fetchClusterDataById = (clusterId, userId) =>
  axios.get(`${FETCH_CLUSTER_URL}/${clusterId}`, {
    params: { userId }
  });

const fetchGridDataById = (gridId, userId) =>
  axios.get(`${FETCH_GRID_URL}/${gridId}`, {
    params: { userId }
  });

const fetchDataForCreateGrid = (userId) =>
  axios.get(FETCH_GRID_PROFILES_DATA_URL, {
    params: {
      userId
    }
  });

const getCreateGridEventsLogsData = (userId, onboardingType) =>
  axios.get(CREATE_GRID_EVENT_LOGS_DATA_URL, {
    params: {
      userId,
      onboardingType
    }
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

const updateSettings = (userId, gridId, settingsObj) =>
  axios.put(`${UPDATE_GRID_SETTINGS_URL}/${gridId}`, {
    userId,
    ...settingsObj
  });

export {
  createNewGridProfile,
  fetchAllClustersData,
  fetchAllGridsData,
  fetchClusterDataById,
  fetchDataForCreateGrid,
  fetchGridDataById,
  getCreateGridEventsLogsData,
  getOnboardingData,
  getOnboardingEventsLogsData,
  markOnboardingRegionChange,
  markOnboardingStatus,
  updateSettings
};

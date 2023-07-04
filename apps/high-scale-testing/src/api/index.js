import axios from 'axios';

import {
  CREATE_GRID,
  CREATE_GRID_EVENT_LOGS_DATA_URL,
  CREATE_TRIAL_GRID_URL,
  FETCH_CLUSTER_URL,
  FETCH_CLUSTERS_URL,
  FETCH_GRID_PROFILES_DATA_URL,
  FETCH_GRID_URL,
  FETCH_GRIDS_URL,
  SETUP_DATA_URL,
  SETUP_EVENT_LOGS_DATA_URL,
  SETUP_REGION_CHANGE_URL,
  SETUP_STATUS_URL,
  UPDATE_GRID_SETTINGS_URL,
  UPDATE_METADATA_URL
} from './constants/apiURLs';

const createTrialGridForUser = ({ userId, setupType }) =>
  axios.post(CREATE_TRIAL_GRID_URL, { userId, setupType });

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

const getSetupData = (userId) =>
  axios.get(SETUP_DATA_URL, {
    params: {
      userId
    }
  });

const getSetupEventsLogsData = (userId, onboardingType) =>
  axios.get(SETUP_EVENT_LOGS_DATA_URL, {
    params: {
      userId,
      onboardingType
    }
  });

const markSetupStatus = (userId, status) =>
  axios.put(SETUP_STATUS_URL, {
    params: {
      userId,
      status
    }
  });

const markSetupRegionChange = (userId, cloudProvider, newRegionObject) =>
  axios.put(SETUP_REGION_CHANGE_URL, {
    params: { userId, cloudProvider, region: newRegionObject }
  });

const updateMetadata = (userId, trialGridProductOnboardingCompleted) =>
  axios.put(UPDATE_METADATA_URL, {
    userId,
    trialGridProductOnboardingCompleted
  });

const updateSettings = (userId, gridId, settingsObj) =>
  axios.put(`${UPDATE_GRID_SETTINGS_URL}/${gridId}`, {
    userId,
    ...settingsObj
  });

export {
  createNewGridProfile,
  createTrialGridForUser,
  fetchAllClustersData,
  fetchAllGridsData,
  fetchClusterDataById,
  fetchDataForCreateGrid,
  fetchGridDataById,
  getCreateGridEventsLogsData,
  getSetupData,
  getSetupEventsLogsData,
  markSetupRegionChange,
  markSetupStatus,
  updateMetadata,
  updateSettings
};

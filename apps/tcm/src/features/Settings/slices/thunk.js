import {
  getJiraConfigurations,
  getSettingsApiKeys
} from '../../../api/settings.api';

import {
  getJiraConfigFailed,
  getJiraConfigFulfilled,
  getSettingsApiKeysFailed,
  getSettingsApiKeysFulfilled
} from './settingsSlice';

export const setJiraConfigurations = () => async (dispatch) => {
  try {
    const response = await getJiraConfigurations();
    dispatch(getJiraConfigFulfilled(response));
  } catch (err) {
    dispatch(getJiraConfigFailed(err));
  }
};

export const setSettingsApiKeys = () => async (dispatch) => {
  try {
    const response = await getSettingsApiKeys();
    dispatch(getSettingsApiKeysFulfilled(response));
  } catch (err) {
    dispatch(getSettingsApiKeysFailed(err));
  }
};

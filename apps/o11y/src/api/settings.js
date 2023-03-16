import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getSettingsByKey = async (key, { projectNormalisedName }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/${key}`
  );

export const updateSettingsByKey = async (
  key,
  { projectNormalisedName, payload = {} }
) =>
  axios.put(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/${key}`,
    payload
  );

export const getBuildNames = async ({ projectNormalisedName }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/buildNames`
  );

export const createNewAlert = async ({ projectNormalisedName, payload }) =>
  axios.post(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/alerts`,
    payload
  );

export const deleteAlert = async ({ projectNormalisedName, alertId }) =>
  axios.delete(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/alerts/${alertId}`
  );

export const getAvailableSubCategories = async ({ projectNormalisedName }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/failure-categories/sub-categories`
  );

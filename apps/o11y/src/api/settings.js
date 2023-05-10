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

export const createNewSubCat = async ({ projectNormalisedName, payload }) =>
  axios.post(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/failure-categories/sub-categories`,
    payload
  );
export const deleteSubCat = async ({ projectNormalisedName, subCatId }) =>
  axios.delete(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/failure-categories/sub-categories/${subCatId}`
  );
export const getValidEmails = async ({ projectNormalisedName, payload }) =>
  axios.post(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/notifications/getValidEmails`,
    payload
  );
export const updateUsersToNotify = async ({ projectNormalisedName, payload }) =>
  axios.post(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/notifications/updateUsers`,
    payload
  );

export const getNotificationDetails = async ({ projectNormalisedName }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/notifications/getEmailPreference`
  );

export const toggleProjectNotification = async ({
  projectNormalisedName,
  payload
}) =>
  axios.put(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/notifications/toggleStatus`,
    payload
  );

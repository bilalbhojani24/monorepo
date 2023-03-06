import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getProjectSettings = async (projectId) =>
  axios.get(`${versionedBaseRoute()}/projects/${projectId}/`);

export const getProjectFailureCategories = async (projectId) =>
  axios.get(`${versionedBaseRoute()}/projects/${projectId}/settings/`);

export const updateProjectSettingsCall = async ({
  projectId,
  attribute,
  value,
  currAttributes
}) => {
  const tmp = {};
  tmp[attribute] = value;
  return axios.put(`${versionedBaseRoute()}/projects/${projectId}/`, {
    configuration: {
      attributes: {
        ...currAttributes,
        ...tmp
      }
    }
  });
};

export const createAlertCall = async ({
  projectId,
  id,
  name,
  alertTypeId,
  alertRules,
  buildName,
  enabled
}) =>
  axios.post(`${versionedBaseRoute()}/projects/${projectId}/settings/alert`, {
    id,
    name,
    alertTypeId,
    alertRules,
    buildName,
    enabled
  });

export const editAlertCall = async ({
  projectId,
  id,
  name,
  alertTypeId,
  alertRules,
  buildName,
  enabled
}) =>
  axios.put(`${versionedBaseRoute()}/projects/${projectId}/settings/alert`, {
    id,
    name,
    alertTypeId,
    alertRules,
    buildName,
    enabled
  });

export const getAlertTypesCall = async () =>
  axios.get(`${versionedBaseRoute()}/alert-type`);

export const createFailureSubCategoryCall = async ({
  projectId,
  typeRef,
  longName,
  shortName,
  color
}) =>
  axios.post(
    `${versionedBaseRoute()}/projects/${projectId}/settings/sub-issue-type`,
    { typeRef, longName, shortName, color },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

export const editFailureSubCategoryCall = async ({
  projectId,
  locator,
  typeRef,
  longName,
  shortName,
  color
}) =>
  axios.put(
    `${versionedBaseRoute()}/projects/${projectId}/settings/sub-issue-type`,
    { ids: [{ locator, typeRef, longName, shortName, color }] },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

export const deleteFailureSubCategoryCall = async ({ projectId, id }) =>
  axios.delete(
    `${versionedBaseRoute()}/projects/${projectId}/settings/sub-issue-type/${id}`
  );

export const deleteAlertCall = async ({ projectId, id }) =>
  axios.delete(
    `${versionedBaseRoute()}/projects/${projectId}/settings/alert/${id}`
  );

export const getBuildNames = async ({ projectNormalisedName }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${projectNormalisedName}/buildNames`
  );

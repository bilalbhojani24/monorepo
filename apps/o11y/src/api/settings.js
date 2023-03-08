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

// export const getGeneralSettings = async ({ projectNormalisedName }) =>
//   axios.get(
//     `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/general`
//   );

// export const updateGeneralSettings = async ({
//   projectNormalisedName,
//   payload = {}
// }) =>
//   axios.put(
//     `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/general`,
//     payload
//   );

// export const getAutoAnalyserSettings = async ({ projectNormalisedName }) =>
//   axios.get(
//     `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/auto-analyser`
//   );

// export const updateAutoAnalyserSettings = async ({
//   projectNormalisedName,
//   payload = {}
// }) =>
//   axios.put(
//     `${versionedBaseRoute()}/projects/${projectNormalisedName}/settings/auto-analyser`,
//     payload
//   );

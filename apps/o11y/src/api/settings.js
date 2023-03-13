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

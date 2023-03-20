import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

import { getParamsFromFiltersObject } from '../features/AllBuilds/utils/common';

export const getBuilds = async ({
  projectNormalisedName,
  currentPagingParams,
  filters
}) => {
  const endpoint = `${versionedBaseRoute()}/projects/${projectNormalisedName}/builds/?`;
  const paramsObject = {};
  if (currentPagingParams?.searchAfter?.length) {
    paramsObject.searchAfter = currentPagingParams.searchAfter;
  }
  const filtersObject = getParamsFromFiltersObject(filters);
  return axios.get(endpoint, { params: { ...filtersObject, ...paramsObject } });
};

export const getBuildMetaDataAPI = async ({ buildUUID }) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildUUID}`);

export const getBuildIdFromBuildInfoApi = async ({
  projectNormalisedName,
  buildNormalisedName,
  buildSerialId
}) => {
  const searchParams = new URLSearchParams();
  searchParams.append('projectNormalisedName', projectNormalisedName);
  searchParams.append('buildNormalisedName', buildNormalisedName);
  searchParams.append('buildSerialId', buildSerialId);
  const searchParamsStr = searchParams.toString();
  return axios.get(
    `${versionedBaseRoute()}/builds/getBuildIdFromBuildInfo?${searchParamsStr}`
  );
};

export const getBuildInfoFromUuidApi = async (uuid) =>
  axios.get(`${versionedBaseRoute()}/builds/getBuildInfoFromUuid/${uuid}`);

export const getBuildTags = async ({ projectNormalisedName, query }) => {
  let endpoint = `${versionedBaseRoute()}/projects/${projectNormalisedName}/builds/tags`;
  if (query) {
    endpoint += `?q=${query}`;
  }
  return axios.get(endpoint);
};

export const getUserNames = async ({ projectNormalisedName, query }) => {
  let endpoint = `${versionedBaseRoute()}/projects/${projectNormalisedName}/builds/users`;
  if (query) {
    endpoint += `?q=${query}`;
  }
  return axios.get(endpoint);
};

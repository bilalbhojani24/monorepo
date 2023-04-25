import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getBuilds = async ({
  projectNormalisedName,
  currentPagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${projectNormalisedName}/builds/`;
  const searchParams = window.location.search || '?';
  endpoint += searchParams;
  if (currentPagingParams?.searchAfter?.length) {
    if (searchParams) endpoint += '&';
    endpoint += `searchAfter=${currentPagingParams.searchAfter}`;
  }
  return axios.get(endpoint);
};

export const getBuildsAPI = async ({
  projectNormalisedName,
  searchString,
  currentPagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${projectNormalisedName}/builds/?`;
  if (currentPagingParams?.searchAfter?.length) {
    endpoint += `searchAfter=${currentPagingParams.searchAfter}`;
  }
  if (searchString) {
    endpoint += searchString.startsWith('?')
      ? `&${searchString.substring(1, searchString.length)}`
      : `&${searchString}`;
  }
  return axios.get(endpoint);
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

export const getBuildFilterDetails = async ({ projectNormalisedName }) => {
  let endpoint = `${versionedBaseRoute()}/projects/${projectNormalisedName}/builds/filters`;
  endpoint += window.location.search;
  return axios.get(endpoint);
};

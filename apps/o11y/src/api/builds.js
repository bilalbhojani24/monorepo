import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getBuilds = async ({
  projectNormalisedName,
  currentPagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${projectNormalisedName}/builds/?`;
  if (currentPagingParams?.searchAfter?.length) {
    endpoint += `searchAfter=${currentPagingParams.searchAfter}`;
  }
  return axios.get(endpoint);
};

export const getBuildMetaDataAPI = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}`);

export const getBuildIdFromBuildInfoApi = async (
  projectNormalisedName,
  buildNormalisedName,
  buildSerialId
) => {
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

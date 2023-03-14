import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

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
  Object.keys(filters).forEach((singleItem) => {
    const targetValue = filters[singleItem];
    if (
      singleItem === 'dateRange' &&
      targetValue.lowerBound &&
      targetValue.upperBound
    ) {
      paramsObject[
        singleItem
      ] = `${targetValue.lowerBound},${targetValue.upperBound}`;
    } else if (singleItem === 'searchText' && targetValue.length) {
      paramsObject.search = targetValue;
    } else if (
      ['tags', 'users', 'status'].includes(singleItem) &&
      targetValue.length
    ) {
      paramsObject[singleItem] = targetValue.join(','); // PRATIK_TODO : replace , to %2C
    }
  });
  return axios.get(endpoint, { params: paramsObject });
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

import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

const getCommonFilterQuery = (filters) => {
  let queryString = '';
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    queryString = `${queryString}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  if (filters?.buildName?.value !== 'all') {
    queryString = `${queryString}&buildName=${filters.buildName.value}`;
  }
  return queryString;
};
export const getBuildNames = async ({ normalisedName }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/buildNames`;
  return axios.get(endpoint);
};

export const getTrendStability = async ({
  normalisedName,
  filters,
  currentPagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/stability?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  if (currentPagingParams?.pageNumber) {
    endpoint += `&pageNumber=${currentPagingParams.pageNumber}`;
  }
  return axios.get(endpoint);
};
export const getTrendStabilityChart = async ({
  normalisedName,
  buildId,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/stability/${buildId}/chart?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};
export const getTrendPerformance = async ({
  normalisedName,
  filters,
  currentPagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/performance?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  if (currentPagingParams?.pageNumber) {
    endpoint += `&pageNumber=${currentPagingParams.pageNumber}`;
  }
  return axios.get(endpoint);
};
export const getTrendPerformanceChart = async ({
  normalisedName,
  buildId,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/performance/${buildId}/chart?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};
export const getTrendUniqueBuilds = async ({
  normalisedName,
  pagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/uniqueRuns?`;
  if (pagingParams?.pageNumber !== undefined) {
    endpoint += `pageNumber=${pagingParams.pageNumber}`;
  }
  return axios.get(endpoint);
};
export const getTrendFailureCategories = async ({
  normalisedName,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/failureCategories?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};
export const getTrendBuildFrequency = async ({ normalisedName, filters }) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/buildFrequency?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};
export const getTrendsDataAPI = async ({ normalisedName, filters, key }) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/testingTrends/${key}?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};

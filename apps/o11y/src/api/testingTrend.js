import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

const getCommonFilterQuery = (filters) => {
  let queryString = '';
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    queryString = `${queryString}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    queryString = `${queryString}&buildName=${filters.buildName.value}`;
  }
  return queryString;
};
export const getBuildNames = async ({ normalizedName }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/buildNames`;
  return axios.get(endpoint);
};

export const getTrendStability = async ({
  normalizedName,
  filters,
  currentPagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/stability?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  if (currentPagingParams?.pageNumber) {
    endpoint += `&pageNumber=${currentPagingParams.pageNumber}`;
  }
  return axios.get(endpoint);
};
export const getTrendStabilityChart = async ({
  normalizedName,
  buildId,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/stability/${buildId}/chart?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};
export const getTrendPerformance = async ({
  normalizedName,
  filters,
  currentPagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/performance?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  if (currentPagingParams?.pageNumber) {
    endpoint += `&pageNumber=${currentPagingParams.pageNumber}`;
  }
  return axios.get(endpoint);
};
export const getTrendPerformanceChart = async ({
  normalizedName,
  buildId,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/performance/${buildId}/chart?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};
export const getTrendUniqueBuilds = async ({
  normalizedName,
  pagingParams
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/uniqueRuns?`;
  if (pagingParams?.pageNumber !== undefined) {
    endpoint += `pageNumber=${pagingParams.pageNumber}`;
  }
  return axios.get(endpoint);
};
export const getTrendFailureCategories = async ({
  normalizedName,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/failureCategories?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};
export const getTrendBuildFrequency = async ({ normalizedName, filters }) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/buildFrequency?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};
export const getTrendsDataAPI = async ({ normalizedName, filters, key }) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalizedName}/testingTrends/${key}?`;
  endpoint += `${getCommonFilterQuery(filters)}`;
  return axios.get(endpoint);
};

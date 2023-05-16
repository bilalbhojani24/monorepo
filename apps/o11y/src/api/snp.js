import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';

export const getSnPTests = async ({
  normalisedName,
  pagingParams,
  sortOptions,
  searchString
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/?orderKey=${
    sortOptions.type
  }&orderValue=${sortOptions.status}&${searchString}`;
  if (pagingParams?.pageNumber) {
    endpoint = `${endpoint}&pageNumber=${pagingParams.pageNumber}`;
  }
  return axios.get(endpoint);
};

export const getSnPTestsBreakdown = async ({
  normalisedName,
  testId,
  searchString
}) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/${testId}/breakdown?${searchString}`;
  return axios.get(endpoint);
};

export const getSnPTestsDetailsInfo = async ({
  normalisedName,
  testId,
  searchString
}) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/${testId}/details/info?${searchString}`;
  return axios.get(endpoint);
};

export const getSnPDetailsStats = async ({
  normalisedName,
  testId,
  cbtInfo,
  searchString
}) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/${testId}/details/stats?browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&device=${cbtInfo.deviceKey}&${searchString}`;
  return axios.get(endpoint);
};
export const getSnPDetailsTrend = async ({
  normalisedName,
  testId,
  cbtInfo,
  searchString
}) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/${testId}/details/trend?browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&device=${cbtInfo.deviceKey}&${searchString}`;
  return axios.get(endpoint);
};
export const getSnPDetailsBuilds = async ({
  normalisedName,
  testId,
  cbtInfo,
  pagingParams,
  chartBounds,
  searchString
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/${testId}/details/builds?browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&device=${cbtInfo.deviceKey}`;
  if (pagingParams?.offset && pagingParams?.start) {
    endpoint = `${endpoint}&start=${pagingParams.start}&offset=${pagingParams.offset}`;
  }
  if (chartBounds.lower && chartBounds.upper) {
    const searchParams = new URLSearchParams(searchString);
    searchParams.delete(ADV_FILTER_TYPES.dateRange.key);
    searchParams.set(`lowerBound`, `${chartBounds.lower}`);
    searchParams.set('upperBound', `${chartBounds.upper}`);
    endpoint = `${endpoint}&${searchParams.toString()}`;
  } else {
    endpoint = `${endpoint}&${searchString}`;
  }
  return axios.get(endpoint);
};

export const getSnPErrors = async ({
  normalisedName,
  pagingParams,
  sortOptions,
  searchString
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/?orderKey=${
    sortOptions.type
  }&orderValue=${sortOptions.status}&${searchString}`;
  if (pagingParams?.pageNumber) {
    endpoint = `${endpoint}&pageNumber=${pagingParams.pageNumber}`;
  }
  return axios.get(endpoint);
};

export const getSnPUEBreakdown = async ({
  normalisedName,
  errorId,
  searchString,
  sortOptions
}) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/${errorId}/breakdown?orderKey=${
    sortOptions.type
  }&orderValue=${sortOptions.status}&${searchString}`;
  return axios.get(endpoint);
};
export const getSnPErrorDetailsInfo = async ({
  normalisedName,
  testId,
  errorId,
  searchString
}) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/${errorId}/details/info?testId=${testId}&${searchString}`;
  return axios.get(endpoint);
};
export const getSnPErrorDetailsErrorCount = async ({
  normalisedName,
  testId,
  errorId,
  cbtInfo,
  searchString
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/${errorId}/details/errorCount?testId=${testId}&${searchString}`;
  endpoint = `${endpoint}&browser=${cbtInfo.browserKey}&os=${cbtInfo.osKey}`;
  return axios.get(endpoint);
};
export const getSnPErrorDetailsTrend = async ({
  normalisedName,
  testId,
  errorId,
  cbtInfo,
  searchString,
  showAllBuilds
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/${errorId}/details/trend?testId=${testId}&${searchString}`;
  endpoint = `${endpoint}&browser=${cbtInfo.browserKey}&os=${cbtInfo.osKey}&allBuilds=${showAllBuilds}`;
  return axios.get(endpoint);
};
export const getSnPErrorDetailsBuilds = async ({
  normalisedName,
  testId,
  errorId,
  cbtInfo,
  pagingParams,
  chartBounds,
  searchString,
  showAllBuilds
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/${errorId}/details/builds?testId=${testId}&browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&allBuilds=${showAllBuilds}`;
  if (pagingParams?.searchAfter) {
    endpoint = `${endpoint}&searchAfter=${pagingParams.searchAfter}`;
  }
  if (chartBounds.lower && chartBounds.upper) {
    const searchParams = new URLSearchParams(searchString);
    searchParams.delete(ADV_FILTER_TYPES.dateRange.key);
    searchParams.set(`lowerBound`, `${chartBounds.lower}`);
    searchParams.set('upperBound', `${chartBounds.upper}`);
    endpoint = `${endpoint}&${searchParams.toString()}`;
  } else {
    endpoint = `${endpoint}&${searchString}`;
  }
  return axios.get(endpoint);
};

export const getSnPErrorDetailsPlatforms = async ({
  normalisedName,
  testId,
  errorId,
  searchString
}) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/${errorId}/details/platforms?testId=${testId}&${searchString}`;
  return axios.get(endpoint);
};

export const getSnPTestsFilters = async ({ normalisedName, searchString }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters?${searchString}`;
  return axios.get(endpoint);
};

export const getSnPUEFilters = async ({ normalisedName, searchString }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/filters?${searchString}`;
  return axios.get(endpoint);
};

export const getTestBuildNames = async ({ normalisedName, query }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters/buildNames?q=${query}`
  );

export const getTestBuildTags = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters/buildTags?q=${query}`;
  return axios.get(endpoint);
};

export const getTestTestTags = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters/testTags?q=${query}`;
  return axios.get(endpoint);
};

export const getTestHostNames = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters/hostNames?q=${query}`;
  return axios.get(endpoint);
};

export const getUEBuildNames = async ({ normalisedName, query }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/filters/buildNames?q=${query}`
  );

export const getUEBuildTags = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/filters/buildTags?q=${query}`;
  return axios.get(endpoint);
};

export const getUETestTags = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/filters/testTags?q=${query}`;
  return axios.get(endpoint);
};

export const getUEHostNames = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/errors/filters/hostNames?q=${query}`;
  return axios.get(endpoint);
};

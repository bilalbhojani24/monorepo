import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { getTimeBounds } from 'utils/dateTime';

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
    searchParams.set(
      ADV_FILTER_TYPES.dateRange.key,
      `lowerBound=${chartBounds.lower},upperBound=${chartBounds.upper}`
    );
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
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/errors/?orderKey=${
    sortOptions.type
  }&orderValue=${sortOptions.status}&isMuted=${filters.isMuted}&isFlaky=${
    filters.isFlaky
  }`;
  if (pagingParams?.pageNumber) {
    endpoint = `${endpoint}&pageNumber=${pagingParams.pageNumber}`;
  }
  if (filters.buildName.length > 0) {
    endpoint = `${endpoint}&buildName=${filters.buildName}`;
  }
  if (filters.dateRange.key) {
    const { lowerBound, upperBound } = getTimeBounds(filters.dateRange.key);
    endpoint = `${endpoint}&lowerBound=${lowerBound}&upperBound=${upperBound}`;
  }
  return axios.get(endpoint);
};

export const getSnPUEBreakdown = async ({
  normalisedName,
  errorId,
  filters,
  sortOptions
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/errors/${errorId}/breakdown?orderKey=${
    sortOptions.type
  }&orderValue=${sortOptions.status}`;
  if (filters.buildName.length > 0) {
    endpoint = `${endpoint}&buildName=${filters.buildName}`;
  }
  if (filters.dateRange.key) {
    const { lowerBound, upperBound } = getTimeBounds(filters.dateRange.key);
    endpoint = `${endpoint}&lowerBound=${lowerBound}&upperBound=${upperBound}`;
  }
  return axios.get(endpoint);
};
export const getSnPErrorDetailsInfo = async ({
  normalisedName,
  testId,
  errorId,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/errors/${errorId}/details/info?testId=${testId}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}
  `;
  if (filters.buildName.length > 0) {
    endpoint = `${endpoint}&buildName=${filters.buildName}`;
  }
  if (filters.dateRange.key) {
    const { lowerBound, upperBound } = getTimeBounds(filters.dateRange.key);
    endpoint = `${endpoint}&lowerBound=${lowerBound}&upperBound=${upperBound}`;
  }
  return axios.get(endpoint);
};
export const getSnPErrorDetailsErrorCount = async ({
  normalisedName,
  testId,
  errorId,
  cbtInfo,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/errors/${errorId}/details/errorCount?testId=${testId}&browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&isMuted=${filters.isMuted}&isFlaky=${filters.isFlaky}`;
  if (filters.buildName.length > 0) {
    endpoint = `${endpoint}&buildName=${filters.buildName}`;
  }
  if (filters.dateRange.key) {
    const { lowerBound, upperBound } = getTimeBounds(filters.dateRange.key);
    endpoint = `${endpoint}&lowerBound=${lowerBound}&upperBound=${upperBound}`;
  }
  return axios.get(endpoint);
};
export const getSnPErrorDetailsTrend = async ({
  normalisedName,
  testId,
  errorId,
  cbtInfo,
  filters,
  showAllBuilds
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/errors/${errorId}/details/trend?testId=${testId}&browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&allBuilds=${showAllBuilds}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;
  if (filters.buildName.length > 0) {
    endpoint = `${endpoint}&buildName=${filters.buildName}`;
  }
  if (filters.dateRange.key) {
    const { lowerBound, upperBound } = getTimeBounds(filters.dateRange.key);
    endpoint = `${endpoint}&lowerBound=${lowerBound}&upperBound=${upperBound}`;
  }
  return axios.get(endpoint);
};
export const getSnPErrorDetailsBuilds = async ({
  normalisedName,
  testId,
  errorId,
  cbtInfo,
  pagingParams,
  chartBounds,
  filters,
  showAllBuilds
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/errors/${errorId}/details/builds?testId=${testId}&browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&allBuilds=${showAllBuilds}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;
  if (pagingParams?.searchAfter) {
    endpoint = `${endpoint}&searchAfter=${pagingParams.searchAfter}`;
  }
  if (filters.buildName.length > 0) {
    endpoint = `${endpoint}&buildName=${filters.buildName}`;
  }
  if (!chartBounds.lower && !chartBounds.upper && filters.dateRange.key) {
    const { lowerBound, upperBound } = getTimeBounds(filters.dateRange.key);
    endpoint = `${endpoint}&lowerBound=${lowerBound}&upperBound=${upperBound}`;
  }
  if (chartBounds.lower && chartBounds.upper) {
    endpoint = `${endpoint}&lowerBound=${chartBounds.lower}&upperBound=${chartBounds.upper}`;
  }
  return axios.get(endpoint);
};

export const getSnPErrorDetailsPlatforms = async ({
  normalisedName,
  testId,
  errorId,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/errors/${errorId}/details/platforms?testId=${testId}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;

  if (filters.buildName.length > 0) {
    endpoint = `${endpoint}&buildName=${filters.buildName}`;
  }
  if (filters.dateRange.key) {
    const { lowerBound, upperBound } = getTimeBounds(filters.dateRange.key);
    endpoint = `${endpoint}&lowerBound=${lowerBound}&upperBound=${upperBound}`;
  }
  return axios.get(endpoint);
};

export const getSnPTestsFilters = async ({ normalisedName, searchString }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters?${searchString}`;
  return axios.get(endpoint);
};

export const getBuildNames = async ({ normalisedName, query }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters/buildNames?q=${query}`
  );

export const getBuildTags = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters/buildTags?q=${query}`;
  return axios.get(endpoint);
};

export const getTestTags = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters/testTags?q=${query}`;
  return axios.get(endpoint);
};

export const getHostNames = async ({ normalisedName, query }) => {
  const endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/filters/hostNames?q=${query}`;
  return axios.get(endpoint);
};

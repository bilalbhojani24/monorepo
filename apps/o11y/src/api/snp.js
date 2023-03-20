import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getBuildNames = async ({ normalisedName }) =>
  axios.get(
    `${versionedBaseRoute()}/projects/${normalisedName}/snp/buildNames`
  );

export const getSnPTests = async ({
  normalisedName,
  pagingParams,
  sortOptions,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/tests/?orderKey=${
    sortOptions.type
  }&orderValue=${sortOptions.status}&isMuted=${filters.isMuted}&isFlaky=${
    filters.isFlaky
  }`;
  if (pagingParams?.pageNumber) {
    endpoint = `${endpoint}&pageNumber=${pagingParams.pageNumber}`;
  }
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  return axios.get(endpoint);
};

export const getSnPTestsBreakdown = async ({
  normalisedName,
  testId,
  buildName,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/tests/${testId}/breakdown?`;

  if (buildName && buildName !== 'all') {
    endpoint = `${endpoint}&buildName=${buildName}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }

  return axios.get(endpoint);
};

export const getSnPTestsDetailsInfo = async ({
  normalisedName,
  testId,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/tests/${testId}/details/info?isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  return axios.get(endpoint);
};

export const getSnPDetailsStats = async ({
  normalisedName,
  testId,
  cbtInfo,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/tests/${testId}/details/stats?browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&device=${cbtInfo.deviceKey}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  return axios.get(endpoint);
};
export const getSnPDetailsTrend = async ({
  normalisedName,
  testId,
  cbtInfo,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v2/tests/${testId}/details/trend?browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&device=${cbtInfo.deviceKey}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  return axios.get(endpoint);
};
export const getSnPDetailsBuilds = async ({
  normalisedName,
  testId,
  cbtInfo,
  pagingParams,
  chartBounds,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/tests/${testId}/details/builds?browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&device=${cbtInfo.deviceKey}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;
  if (pagingParams?.offset && pagingParams?.start) {
    endpoint = `${endpoint}&start=${pagingParams.start}&offset=${pagingParams.offset}`;
  }
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (
    !chartBounds.lower &&
    !chartBounds.upper &&
    filters.dateRange.lowerBound &&
    filters.dateRange.upperBound
  ) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  if (chartBounds.lower && chartBounds.upper) {
    endpoint = `${endpoint}&lowerBound=${chartBounds.lower}&upperBound=${chartBounds.upper}`;
  }
  return axios.get(endpoint);
};

export const getSnPErrors = async ({
  normalisedName,
  pagingParams,
  sortOptions,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/errors/?orderKey=${
    sortOptions.type
  }&orderValue=${sortOptions.status}&isMuted=${filters.isMuted}&isFlaky=${
    filters.isFlaky
  }`;
  if (pagingParams?.pageNumber) {
    endpoint = `${endpoint}&pageNumber=${pagingParams.pageNumber}`;
  }
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  return axios.get(endpoint);
};

export const getSnPUEBreakdown = async ({
  normalisedName,
  errorId,
  activeBuild,
  filters,
  sortOptions
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/errors/${errorId}/breakdown?orderKey=${
    sortOptions.type
  }&orderValue=${sortOptions.status}`;
  if (activeBuild && activeBuild !== 'all') {
    endpoint = `${endpoint}&buildName=${activeBuild}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  return axios.get(endpoint);
};
export const getSnPErrorDetailsInfo = async ({
  normalisedName,
  testId,
  errorId,
  filters
}) => {
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/errors/${errorId}/details/info?testId=${testId}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}
  `;
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
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
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/errors/${errorId}/details/errorCount?testId=${testId}&browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&isMuted=${filters.isMuted}&isFlaky=${filters.isFlaky}`;
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
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
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/errors/${errorId}/details/trend?testId=${testId}&browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&allBuilds=${showAllBuilds}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
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
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/errors/${errorId}/details/builds?testId=${testId}&browser=${
    cbtInfo.browserKey
  }&os=${cbtInfo.osKey}&allBuilds=${showAllBuilds}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;
  if (pagingParams?.searchAfter) {
    endpoint = `${endpoint}&searchAfter=${pagingParams.searchAfter}`;
  }
  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (
    !chartBounds.lower &&
    !chartBounds.upper &&
    filters.dateRange.lowerBound &&
    filters.dateRange.upperBound
  ) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
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
  let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/errors/${errorId}/details/platforms?testId=${testId}&isMuted=${
    filters.isMuted
  }&isFlaky=${filters.isFlaky}`;

  if (filters.buildName && filters?.buildName?.value !== 'all') {
    endpoint = `${endpoint}&buildName=${filters.buildName.value}`;
  }
  if (filters.dateRange.lowerBound && filters.dateRange.upperBound) {
    endpoint = `${endpoint}&lowerBound=${filters.dateRange.lowerBound}&upperBound=${filters.dateRange.upperBound}`;
  }
  return axios.get(endpoint);
};

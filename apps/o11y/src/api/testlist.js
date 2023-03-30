import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getTestList = async ({ buildId, pagingParams }) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (pagingParams?.searchAfter) {
    searchParams.append('nextRoot', JSON.stringify(pagingParams?.nextRoot));
    searchParams.append(
      'searchAfter',
      JSON.stringify(pagingParams?.searchAfter)
    );
  }
  const searchParamsStr = searchParams.toString();
  return axios.get(
    `${versionedBaseRoute()}/builds/${buildId}/testRuns${
      searchParamsStr ? `?${searchParamsStr}` : ''
    }`
  );
};
export const getTestRetryLogs = async (buildId, retryId) =>
  axios.get(
    `${versionedBaseRoute()}/builds/${buildId}/testRuns/${retryId}/retryLogs`
  );
export const getTestHistoryData = async (testRunIds) =>
  axios.post(`${versionedBaseRoute()}/builds/testRuns/historyDetails`, {
    testRunIds
  });
export const getTestlistFilters = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/getFilters`);

export const toggleMuteTest = async ({ buildId, testRunId, shouldMute }) =>
  axios.put(
    `${versionedBaseRoute()}/builds/${buildId}/testRuns/${testRunId}/muteTest/?mute=${shouldMute}`
  );

export const triggerReRunBE = async ({ buildId, type, testId }) => {
  let queryString = `?type=${type}`;
  if (type === 'test') {
    queryString += `&testId=${testId}`;
  }
  return axios.get(
    `${versionedBaseRoute()}/builds/${buildId}/triggerReRun${queryString}`
  );
};

// TODO: need a better solution then to hit Jenkins directly [BE required]

export const getJenkinsBuildParams = async ({
  paramUrl,
  username,
  authToken
}) =>
  axios.get(paramUrl, {
    auth: {
      username,
      password: authToken
    }
  });

// TODO: need a better solution then to hit Jenkins directly [BE required]
export const triggerJenkinsBuildAPI = async ({
  buildUrl,
  username,
  authToken,
  parameters,
  testOpsParams
}) => {
  const data = new FormData();
  data.append(
    'json',
    JSON.stringify({
      parameter: JSON.stringify(parameters),
      testopsParams: testOpsParams
    })
  );

  return axios.post(buildUrl, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    auth: {
      username,
      password: authToken
    }
  });
};

export const changeIssueType = async (projectId, data) =>
  axios.put(`${versionedBaseRoute()}/builds/${projectId}/update`, data);

export const getBugDetails = async (buildId, testRunId) =>
  axios.get(
    `${versionedBaseRoute()}/builds/${buildId}/testRuns/${testRunId}/bugDetails`
  );

export const sendIssueCreatedCallback = async (buildId, testRunId, data) =>
  axios.post(
    `${versionedBaseRoute()}/builds/${buildId}/testRuns/${testRunId}/bugDetailsCallback`,
    data
  );

export const updateJenkinsIntegrationCall = async ({
  name,
  username,
  authToken,
  type
}) => {
  let response = null;
  if (type === 'CREATE') {
    response = axios.post(`${versionedBaseRoute()}/integrations/${name}`, {
      username,
      authToken
    });
  } else if (type === 'UPDATE') {
    response = axios.put(`${versionedBaseRoute()}/integrations/${name}`, {
      username,
      authToken
    });
  } else if (type === 'GET') {
    response = axios.get(`${versionedBaseRoute()}/integrations/${name}`);
  } else if (type === 'DELETE') {
    response = axios.delete(`${versionedBaseRoute()}/integrations/${name}`);
  }
  return response;
};

export const getAnalyzerSimilarTests = async ({
  buildId,
  testId,
  selectedMode,
  clusterIds
}) => {
  let endpoint = `${versionedBaseRoute()}/builds/${buildId}/analyzer-similar?`;
  if (selectedMode) {
    endpoint += `&mode=${selectedMode}`;
  }
  if (testId) {
    endpoint += `&testRunId=${testId}`;
  }
  if (clusterIds) {
    endpoint += `&clusterIds=${clusterIds}`;
  }
  return axios.get(endpoint);
};

export const submitBulkDefectType = async ({ buildId, testId, payload }) =>
  axios.post(
    `${versionedBaseRoute()}/builds/${buildId}/testRuns/${testId}/analyzer-apply`,
    payload
  );

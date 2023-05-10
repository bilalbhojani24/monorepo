import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getTestMeta = async (testRunId) =>
  axios.get(`${versionedBaseRoute()}/testRuns/${testRunId}/testMeta`);

export const getTestDetails = async (testRunId) =>
  axios.get(`${versionedBaseRoute()}/testRuns/${testRunId}/testDetails`);

export const getNetworkLogs = async (testRunId) =>
  axios.get(`${versionedBaseRoute()}/testRuns/${testRunId}/networkLogs`);

export const getConsolidatedLogs = async (testRunId) =>
  axios.get(
    `${versionedBaseRoute()}/testRuns/${testRunId}/consolidatedLogs?trim=true`
  );

export const getCapabilities = async (testRunId) =>
  axios.get(`${versionedBaseRoute()}/testRuns/${testRunId}/capabilities`);

export const getBehaviour = async (testRunId) =>
  axios.get(`${versionedBaseRoute()}/testRuns/${testRunId}/behaviour`);
export const getTestCode = async (testRunId) =>
  axios.get(`${versionedBaseRoute()}/testRuns/${testRunId}/testCode`);
export const getTestOverview = async (testRunId) =>
  axios.get(`${versionedBaseRoute()}/testRuns/${testRunId}/testOverview`);
export const getTestInfoTabs = async (testRunId) =>
  axios.get(`${versionedBaseRoute()}/testRuns/${testRunId}/tabs`);

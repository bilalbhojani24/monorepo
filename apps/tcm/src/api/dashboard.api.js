import { fetchGet } from './_utils/fetch';

export const getActiveTestRunsAPI = async (projectId) =>
  fetchGet(
    `/api/v1/projects/${projectId}/dashboard-analytics/active-test-runs-info`
  );

export const getClosedTestRunsMonthlyAPI = async (projectId) =>
  fetchGet(
    `/api/v1/projects/${projectId}/dashboard-analytics/closed-test-runs-info`
  );

export const getClosedTestRunsDailyAPI = async (projectId) =>
  fetchGet(
    `/api/v1/projects/${projectId}/dashboard-analytics/closed-test-runs-split`
  );

export const getTestCaseTypeSplitAPI = async (projectId) =>
  fetchGet(
    `/api/v1/projects/${projectId}/dashboard-analytics/test-case-type-split`
  );

export const getTestCaseCountTrendAPI = async (projectId) =>
  fetchGet(
    `/api/v1/projects/${projectId}/dashboard-analytics/test-case-count-trend`
  );

export const getIssuesCountAPI = async (projectId) =>
  fetchGet(
    `/api/v1/projects/${projectId}/dashboard-analytics/issues-count-info`
  );

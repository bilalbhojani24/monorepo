import { fetchGet } from './_utils/fetch';

export const getActiveTestRuns = async (projectId) =>
  fetchGet(
    `/api/v1/projects/${projectId}/dashboard-analytics/active-test-runs-info`
  );

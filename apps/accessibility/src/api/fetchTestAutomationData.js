import axios from 'axios';

export async function fetchBuildMetaData(project, name, number) {
  const response = await axios.get(
    `/projects/${project}/test_runs/${name}%23${number}/meta`
  );
  return response.data.metaData;
}

export async function fetchOverview(project, name, number) {
  const response = await axios.get(
    `/projects/${project}/test_runs/${name}%23${number}/overview`
  );
  return response.data.data;
}

export async function fetchBuildIssues(project, name, number) {
  const response = await axios.get(
    `/projects/${project}/test_runs/${name}%23${number}/issues`
  );
  return response.data;
}

export async function fetchTestCasesData(project, name, number) {
  const response = await axios.get(
    `/projects/${project}/test_runs/${name}%23${number}/test_cases`
  );
  return response.data;
}

export async function fetchAllProjectList() {
  const response = await axios.get('/projects');
  return response.data.projects;
}

export async function fetchProjectById(id) {
  const response = await axios.get(`/projects/${id}`);
  return response.data.testRuns;
}

export async function fetchAllTestRuns() {
  const response = await axios.get('/test_runs');
  return response.data.testRuns;
}

export async function fetchTestCaseData(testID = 1) {
  const response = await axios.get(`/tests/consolidate?tc_ids=${testID}`);
  return response.data.data;
}

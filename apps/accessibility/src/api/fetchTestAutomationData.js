// import axios from 'axios';
import axios from 'axios';

import { data as mockData, testCases } from './mockData';

const data = [
  {
    id: 5,
    name: 'tap_main_page_workflow #111',
    createdAt: '2023-04-27T17:03:16.616Z',
    createdBy: {
      id: 123,
      name: 'John Doe'
    },
    summary: {
      pageCount: 15,
      componentCount: 40,
      issueCount: 300,
      severityBreakdown: {
        critical: 75,
        serious: 75,
        moderate: 75,
        minor: 75
      },
      health: {
        passed: 20,
        failed: 5,
        skipped: 5,
        total: 30
      }
    }
  },
  {
    id: 6,
    name: 'tap_main_page_workflow #111',
    createdAt: '2023-04-27T17:03:16.616Z',
    createdBy: {
      id: 124,
      name: 'John Doe'
    },
    summary: {
      pageCount: 15,
      componentCount: 40,
      issueCount: 300,
      severityBreakdown: {
        critical: 2,
        serious: 15,
        moderate: 175,
        minor: 0
      },
      health: {
        passed: 30000,
        failed: 0,
        skipped: 0,
        total: 30
      }
    }
  }
];

const header = {
  Accept: 'application/json'
};

export async function fetchBuildListing() {
  // const response = await axios.get('/guidelines');
  // return response.data;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export async function fetchBuildData() {
  // const response = await axios.get('/guidelines');
  // return response.data;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
}

export async function fetchTestCases() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testCases);
    }, 1000);
  });
}

export async function fetchAllProjectList() {
  const response = await axios.get('/projects', {
    header
  });
  return response.data.projects;
}

export async function fetchProjectById(id) {
  const response = await axios.get(`/projects/${id}`, {
    header
  });
  return response.data.testRuns;
}

export async function fetchAllTestRuns() {
  const response = await axios.get('/test_runs', {
    header
  });
  return response.data.testRuns;
}

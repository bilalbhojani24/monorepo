// import axios from 'axios';
import { data as mockData } from './mockData';

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
  }
];

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

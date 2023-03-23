import axios from 'axios';

export async function fetchScanOverviewData(id = null) {
  const response = await axios.get(
    `/scan_configs/${id}/website_scanner_reports/overview`
  );
  if (response.data) {
    return {
      success: true,
      data: {
        scanConfigInfo: {
          name: 'Prod test scan',
          scanConfigId: 54,
          createdBy: { id: 3799019, name: 'Lakshay Testing User Sync' },
          wcagVersion: { label: 'WCAG 2.1 AA', value: 'wcag21aa' },
          schedulePattern: '0 20 * * *',
          pageCount: 4,
          nextScanDate: '2023-03-23T20:00:00.000Z'
        },
        overview: {
          urlList: [
            'https://www.browserstack.com',
            'https://bing.com',
            'https://adani.com',
            'https://adani.in'
          ],
          issueHistory: [
            { minor: 3, serious: 143, critical: 83, moderate: 0 },
            { minor: 32, serious: 142, critical: 82, moderate: 10 },
            { minor: 32, serious: 145, critical: 83, moderate: 10 },
            { minor: 32, serious: 140, critical: 83, moderate: 10 },
            { minor: 32, serious: 143, critical: 83, moderate: 10 },
            { minor: 32, serious: 142, critical: 82, moderate: 10 },
            { minor: 30, serious: 162, critical: 83, moderate: 10 },
            { minor: 30, serious: 144, critical: 82, moderate: 10 }
          ],
          scanStability: [
            { failure: 1, success: 1, redirect: 2 },
            { failure: 1, success: 1, redirect: 2 },
            { failure: 1, success: 1, redirect: 2 },
            { failure: 1, success: 1, redirect: 2 },
            { failure: 1, success: 1, redirect: 2 },
            { failure: 1, success: 1, redirect: 2 },
            { failure: 1, success: 1, redirect: 2 },
            { failure: 1, success: 1, redirect: 2 }
          ]
        }
      }
    };
  }
  return false;
}

export async function fetchScanRuns(id = null) {
  const response = await axios.get(
    `/scan_configs/${id}/website_scanner_reports`
  );
  if (response.data) {
    return response.data;
  }
  return false;
}

// /website_scanner_reports/overview

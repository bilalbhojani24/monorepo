import axios from 'axios';

export async function fetchScanOverviewData(id = null) {
  const response = await axios.get(
    `/scan_configs/${id}/website_scanner_reports/overview`
  );
  if (response.data) {
    return response.data;
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

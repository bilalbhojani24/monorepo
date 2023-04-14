import { milliSecondsToTime } from 'utils/dateTime';

export const getTableRow = (label, value) => `| ${label} | ${value} |\n`;

export const getStaticDescription = (reportBugTestDetails = {}) => {
  const {
    status,
    buildName,
    buildId,
    ciInfo,
    testDetails,
    testUrl,
    platform,
    browser,
    hostInfo,
    issueType,
    duration,
    isAutoAnalyzed
  } = reportBugTestDetails;
  let staticDesc = getTableRow('**Item**', '**Data**');
  staticDesc += '| ------ | ----------- |\n';
  if (buildName) {
    staticDesc += getTableRow('Build Name', buildName);
  }
  if (buildId) {
    staticDesc += getTableRow('Build Id', buildId);
  }
  if (ciInfo?.name) {
    staticDesc += getTableRow('CI Env', ciInfo.name);
  }
  if (ciInfo?.buildUrl && ciInfo?.buildNumber) {
    staticDesc += getTableRow(
      'CI Build Url',
      `[${ciInfo.buildNumber}|${ciInfo.buildUrl}]`
    );
  }
  if (testDetails) {
    staticDesc += getTableRow('Test Name', testDetails);
  }
  if (testUrl) {
    staticDesc += getTableRow('Test Url', testUrl);
  } else {
    staticDesc += getTableRow('Test Url', 'TBD');
  }
  if (status) {
    staticDesc += getTableRow('Test Status', status);
  }
  if (platform) {
    staticDesc += getTableRow('OS', platform);
  }
  if (browser) {
    staticDesc += getTableRow('Browser', browser);
  }
  if (hostInfo?.hostname) {
    staticDesc += getTableRow('Host name', hostInfo.hostname);
  }
  if (issueType) {
    staticDesc += getTableRow('Defect Type', issueType);
  }
  if (duration) {
    staticDesc += getTableRow('Duration', milliSecondsToTime(duration));
  }

  staticDesc += getTableRow('isAutoAnalyzed', isAutoAnalyzed || false);

  return staticDesc;
};

export const getRetryInfoTable = (retries) => {
  let retriesTable = getTableRow('**Runs**', '**Status**');
  retriesTable += '| ------ | ----------- |\n';
  retries.forEach((item, index) => {
    retriesTable += getTableRow(`Run#${index + 1}`, item.status);
  });
  return retriesTable;
};

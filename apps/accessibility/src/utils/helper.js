import { testTypes } from 'constants';
import { wcagVersions } from 'features/SiteScanner/NewScan/constants';
import { json2csv } from 'json-2-csv';

const BEST_PRACTICE_TAG = 'best-practice';

export const tagToView = (tags) =>
  tags
    .map((tag) => tag.toLowerCase())
    .filter(
      (tag) =>
        (tag.includes('wcag') || tag.includes(BEST_PRACTICE_TAG)) &&
        tag !== 'wcag'
    )
    .filter((tag) => {
      const regExp = /[a-zA-Z]/g;
      return (
        (tag.includes('wcag') && !regExp.test(tag.split('wcag'))) ||
        tag.includes(BEST_PRACTICE_TAG)
      );
    })
    .map((tag) => {
      if (tag.includes('wcag')) {
        const [, number] = tag.split('wcag');
        return {
          label: `WCAG ${number.charAt(0)}.${number.charAt(1)}.${number.slice(
            2,
            number.length
          )}`,
          value: tag
        };
      }
      if (tag.includes(BEST_PRACTICE_TAG)) {
        return {
          label: 'Best Practice',
          value: ''
        };
      }
      return '';
    });

// Do not replace with the extension, customized for dashboard
// Needs review value
export const downloadCsv = (data, name) => {
  const result = [];
  data.forEach((violation) => {
    const { id, impact, description, tags } = violation;
    violation.nodes.forEach((node) => {
      const { url, html, classList, needsReview, failureSummary, timestamp } =
        node;
      result.push({
        'Issue type': id,
        Severity: impact,
        Component: node.componentId,
        'Issue description': description,
        'Affected page': url,
        'Guideline(s)': tagToView(tags)
          .map((tag, index) =>
            index !== tagToView(tags).length - 1 ? `${tag.label}, ` : tag.label
          )
          .join(''),
        'HTML snippet': html,
        'CSS selector': classList,
        'Needs review': needsReview ? 'True' : 'False',
        'Best practice': tags.includes(BEST_PRACTICE_TAG) ? 'True' : 'False',
        'How to fix': failureSummary,
        Timestamp: timestamp
      });
    });
  });
  json2csv(result, (error, csv) => {
    const downloadLink = document.createElement('a');
    const blob = new Blob(['\ufeff', csv]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `${name}.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
};

export const handleFocusElement = (elementId) => {
  const nextFocusElement = document.getElementById(elementId);
  if (nextFocusElement) {
    nextFocusElement.focus();
    nextFocusElement.tabIndex = -1;
  }
};

export const handleClickByEnterOrSpace = (
  event,
  func,
  nextFocusElementId = ''
) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    event.stopPropagation();
    func();
    // should be handle inside component only. Need to clean this up.
    const id = setTimeout(() => {
      if (nextFocusElementId) {
        handleFocusElement(nextFocusElementId);
        clearTimeout(id);
      }
    }, 0);
  }
};

export const updateUrlWithQueryParam = (keyValuePair) => {
  const {
    location: { search }
  } = window;
  const params = new URLSearchParams(search);
  Object.entries(keyValuePair).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
};

/**
 *
 * @param {Array[string]} keys
 * @returns
 */

export const deleteUrlQueryParam = (keys) => {
  const {
    location: { search }
  } = window;
  const params = new URLSearchParams(search);
  keys.forEach((key) => {
    params.delete(key);
  });
  return params.toString();
};

export const formatComponentIdString = (componentId) =>
  `${componentId.split('#')[0].toLowerCase()}${
    componentId.split('#')[1] ? `.${componentId.split('#')[1]}` : ''
  }`;

export const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
    return url;
  } catch (_) {
    return false;
  }
};

export const addZero = (i) => {
  let newMins = i;
  if (i < 10) {
    newMins = `0${newMins}`;
  }
  return newMins;
};

export const getWcagVersionFromVal = (val) =>
  wcagVersions.filter((version) => version.id === val)[0];

export const generateReportUrl = (key) => {
  let reportParam;
  const id = key.split(':')[1];
  if (key.includes(testTypes.workflowScan)) {
    reportParam = `ids=${id}`;
  } else if (key.includes(testTypes.assistiveTest)) {
    reportParam = `ar_ids=${id}`;
  } else if (key.includes(testTypes.websiteScan)) {
    reportParam = `wsr_ids=${id}`;
  }
  return `/reports/report?${reportParam}`;
};

export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};

const roundOff = (value, decimal = 1) => {
  const base = 10 ** decimal;
  return Math.round(value * base) / base;
};
export const formatSize = (bytes) => {
  if (bytes < 1024) {
    return `${roundOff(bytes)} B`;
  }
  if (bytes < 1024 ** 2) {
    return `${roundOff(bytes / 1024)} KB`;
  }
  return `${roundOff(bytes / 1024 ** 2)} MB`;
};

export const formatTime = (time) => {
  if (typeof time !== 'number') {
    return time;
  }
  if (time < 1000) {
    return `${Math.round(time)} ms`;
  }
  if (time < 60000) {
    return `${Math.ceil(time / 10) / 100} s`;
  }
  return `${(Math.ceil(time / 60000) * 100) / 100} m`;
};

export const sortBy = (data, key, isAsc = true) =>
  data.sort((prev, next) => {
    if (prev[key] < next[key]) {
      return isAsc ? -1 : 1;
    }
    if (prev[key] > next[key]) {
      return isAsc ? 1 : -1;
    }
    return 0;
  });

const getTotalTimeOfEntry = ({ startedDateTime, time, timings }) =>
  // eslint-disable-next-line no-underscore-dangle
  new Date(startedDateTime).getTime() + time + (timings._blocked_queueing || 0);

const getUrlInfo = (url) => {
  const urlInfo = new URL(url);
  const pathSplit = urlInfo.pathname.split('/');
  const fileName =
    (pathSplit[pathSplit.length - 1].trim()
      ? pathSplit[pathSplit.length - 1]
      : pathSplit[pathSplit.length - 2]) + urlInfo.search;

  return {
    domain: urlInfo.host,
    filename: fileName || urlInfo.href,
    url: urlInfo.href
  };
};

const getEntryTransferredSize = ({ response }) => {
  const { bodySize, _transferSize } = response;
  if (_transferSize > -1) {
    return _transferSize;
  }

  if (bodySize > -1) {
    return bodySize;
  }
  return -1;
};

const getEntryUncompressedSize = ({ response }) => {
  const {
    bodySize,
    _transferSize,
    content: { size }
  } = response;
  if (size > 0) {
    return size;
  }
  if (_transferSize > -1) {
    return _transferSize;
  }
  if (bodySize > -1) {
    return bodySize;
  }
  return 0;
};

const getContentType = (entry) => {
  // eslint-disable-next-line no-underscore-dangle
  if (entry._resourceType) {
    // eslint-disable-next-line no-underscore-dangle
    return entry._resourceType.toLowerCase();
  }

  const { headers } = entry.response;
  const contentInfo = headers.find(({ name }) =>
    ['content-type', 'Content-Type'].includes(name)
  );
  if (!contentInfo) {
    return '';
  }
  const type = contentInfo.value.split(';')[0].split('/');
  return type.length > 1 ? type[1] : type[0];
};

const cleanNegativeValues = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value <= 0 ? 0 : value])
  );

const getTimings = ({ startedDateTime, timings }, firstEntryTimeStamp) => ({
  ...timings,
  startTime:
    new Date(startedDateTime).getTime() -
    new Date(firstEntryTimeStamp).getTime()
});

const getContent = ({ mimeType, text }) => {
  if (mimeType === 'application/json') {
    let parsedJson;
    try {
      parsedJson = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      parsedJson = text;
    }
    return parsedJson;
  }

  return text;
};

const parseSize = ({ bodySize, _transferSize, headers, content }) => {
  if (content && content.size) {
    return content.size;
  }
  if (_transferSize > -1) {
    return _transferSize;
  }
  if (bodySize > -1) {
    return bodySize;
  }
  const contentInfo = headers.find(({ name }) =>
    ['content-length', 'Content-Length'].includes(name)
  );
  if (!contentInfo) {
    return 0;
  }

  return contentInfo.value;
};

const getHeaders = (entry) => ({
  request: sortBy(entry.request.headers, 'name'),
  response: sortBy(entry.response.headers, 'name'),
  queryString: entry.request.queryString,
  postData: entry.request.postData
});

export const prepareViewerData = (entries) => {
  if (!entries.length) {
    return {
      totalNetworkTime: 0,
      data: [],
      totalRequests: 0,
      totalTransferredSize: 0,
      totalUncompressedSize: 0
    };
  }

  const firstEntryTime = entries[0].startedDateTime;
  let endTime = getTotalTimeOfEntry(entries[entries.length - 1]);
  let totalTransferredSize = 0;
  let totalUncompressedSize = 0;
  const data = entries
    .filter((entry) => entry.response && getUrlInfo(entry.request.url).domain)
    .map((entry, index) => {
      totalTransferredSize += getEntryTransferredSize(entry);
      totalUncompressedSize += getEntryUncompressedSize(entry);
      const lastTimeOfEntry = getTotalTimeOfEntry(entry);
      endTime = endTime < lastTimeOfEntry ? lastTimeOfEntry : endTime;
      return {
        index,
        status: entry.response.status,
        method: entry.request.method,
        size: parseSize(entry.response),
        startedDateTime: new Date(entry.startedDateTime).getTime(),
        type: getContentType(entry),
        timings: cleanNegativeValues(getTimings(entry, firstEntryTime)),
        body: getContent(entry.response.content),
        time: entry.time,
        serverIPAddress: entry.serverIPAddress || ':80',
        headers: getHeaders(entry),
        transferredSize: getEntryTransferredSize(entry),
        uncompressedSize: getEntryUncompressedSize(entry),
        // eslint-disable-next-line no-underscore-dangle
        error: entry.response?._error || null,
        ...getUrlInfo(entry.request.url)
      };
    });

  const totalRequests = data.length;
  const totalNetworkTime = endTime - new Date(firstEntryTime).getTime();
  return {
    totalNetworkTime,
    data,
    totalRequests,
    totalTransferredSize,
    totalUncompressedSize
  };
};

export const calculateFinishTime = (data) => {
  const finishTimes = data.map(({ timings }) =>
    Object.values(timings).reduce(
      (acc, durationInMS) => acc + (durationInMS || 0),
      0
    )
  );
  return finishTimes.length ? Math.max(...finishTimes) : 0;
};

const filterCondition = ({ filter: filterObj, info }) => {
  switch (filterObj.name) {
    case 'error':
      return info.status >= 400 || info.error;
    case 'type':
    default:
      return filterObj.value.includes(info[filterObj.name]);
  }
};

export const filterData = ({ data, errorFilter, filter = {}, search }) => {
  const trimmedSearch = (search || '').trim();

  return !trimmedSearch && !filter.name && !errorFilter
    ? data
    : data.filter((info) => {
        const isSearchMatched = trimmedSearch
          ? info.url?.includes(trimmedSearch)
          : true;
        const isErrorMatched = errorFilter
          ? filterCondition({ filter: { name: 'error' }, info })
          : true;
        const isFilterMatched = filter.name
          ? filterCondition({ filter, info })
          : true;
        return isSearchMatched && isErrorMatched && isFilterMatched;
      });
};

export const getStatusClass = ({ status, error }) => {
  if (status === 0 && !error) {
    return 'pending';
  }
  if (status >= 400 || error) {
    return 'error';
  }
  return 'info';
};

// keeping 800 px as min width of container to show waterfall
export const isWidthAvailableToShowWaterfall = (width = 0) => width > 800;

const findIndexBeforeTimestamp = (data, exactTimestamp) => {
  const indexBefore = data.findIndex(
    ({ startedDateTime }) => startedDateTime > exactTimestamp
  );
  if (indexBefore === -1) {
    return data.length - 1;
  }
  return indexBefore > 1 ? indexBefore - 1 : 0;
};

const findIndexAfterTimestamp = (data, exactTimestamp) => {
  const indexAfter = data.findIndex(
    ({ startedDateTime }) => startedDateTime >= exactTimestamp
  );
  return indexAfter < 0 ? data.size - 1 : indexAfter;
};

export const findRequestIndex = ({ data, timestamp, position }) => {
  if (position === 'before') {
    return findIndexBeforeTimestamp(data, timestamp);
  }
  return findIndexAfterTimestamp(data, timestamp);
};

export const calculateTimings = (pages) =>
  pages.reduce(
    ({ DOMContentLoaded, onLoad }, { pageTimings }) => ({
      DOMContentLoaded: DOMContentLoaded + (pageTimings?.onContentLoad || 0),
      onLoad: onLoad + (pageTimings?.onLoad || 0)
    }),
    { DOMContentLoaded: 0, onLoad: 0 }
  );

export const getSummary = (data) =>
  data.reduce(
    (acc, req) => {
      const accumulator = { ...acc };
      accumulator.totalTransferredSize += req.transferredSize;
      accumulator.totalUncompressedSize += req.uncompressedSize;
      return accumulator;
    },
    {
      totalTransferredSize: 0,
      totalUncompressedSize: 0,
      totalRequests: data.size || data.length
    }
  );

export const safeDecodeURIComponent = (encodedURI) => {
  try {
    return decodeURIComponent(encodedURI);
  } catch {
    return encodedURI;
  }
};

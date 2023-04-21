import React from 'react';

import NetworkFileName from './Components/NetworkTable/NetworkFileName';
import NetworkTimeCell from './Components/NetworkTable/NetworkTimeCell';

export const VIEWER_FIELDS = Object.freeze({
  file: Object.freeze({
    key: 'filename',
    name: 'File name',
    renderComponent: (props) => <NetworkFileName {...props} />,
    columnWidth: 'w-full'
  }),
  status: Object.freeze({
    key: 'status',
    name: 'Status',
    columnWidth: 'w-24'
  }),
  type: Object.freeze({
    key: 'type',
    name: 'Type',
    columnWidth: 'w-28'
  }),
  size: Object.freeze({
    key: 'size',
    name: 'Size',
    columnWidth: 'w-24'
  }),
  time: Object.freeze({
    key: 'time',
    name: 'Time',
    renderComponent: (props) => <NetworkTimeCell {...props} />
  })
});

export const FILTER_BY = {
  'All Request Types': {
    name: null,
    value: null
  },
  XHR: {
    name: 'type',
    value: ['xhr', 'XHR', 'fetch']
  },
  JS: {
    name: 'type',
    value: ['script', 'javascript', 'x-javascript', 'json']
  },
  CSS: {
    name: 'type',
    value: ['stylesheet', 'css']
  },
  Images: {
    name: 'type',
    value: ['image', 'png', 'jpeg', 'svg+xml', 'gif']
  },
  Media: {
    name: 'type',
    value: ['media']
  },
  Font: {
    name: 'type',
    value: ['font', 'woff2']
  },
  HTML: {
    name: 'type',
    value: ['document', 'html']
  },
  WS: {
    name: 'type',
    value: ['websocket']
  },
  Manifest: {
    name: 'type',
    value: ['manifest.json']
  }
};

export const TIMINGS = {
  queueing: {
    dataKey: '_blocked_queueing',
    fill: '#AAAAAA',
    name: 'Queueing'
  },
  blocked: {
    dataKey: 'blocked',
    fill: '#D73737',
    name: 'Stalled'
  },
  dns: {
    dataKey: 'dns',
    fill: '#159588',
    name: 'DNS Lookup'
  },
  ssl: {
    dataKey: 'ssl',
    fill: '#C141CD',
    name: 'SSL'
  },
  connect: {
    dataKey: 'connect',
    fill: '#FD9727',
    name: 'Initial Connection'
  },
  send: {
    dataKey: 'send',
    fill: '#1EAAF1',
    name: 'Request Sent'
  },
  wait: {
    dataKey: 'wait',
    fill: '#B0BEC5',
    name: 'Waiting (TTFB)'
  },
  receive: {
    dataKey: 'receive',
    fill: '#1EC659',
    name: 'Content Downloaded'
  }
};

export const ROW_ID_PREFIX = 'network-viewer-table-row-';

export const GENERAL_HEADERS = Object.freeze({
  url: Object.freeze({
    key: 'url',
    name: 'Request URL'
  }),
  method: Object.freeze({
    key: 'method',
    name: 'Request Method'
  }),
  status: Object.freeze({
    key: 'status',
    name: 'Status Code'
  }),
  serverIPAddress: Object.freeze({
    key: 'serverIPAddress',
    name: 'Remote Address'
  })
});

export const HEADERS_TITLES = Object.freeze({
  general: Object.freeze({
    key: 'general',
    name: 'General'
  }),
  response: Object.freeze({
    key: 'response',
    name: 'Response Headers'
  }),
  request: Object.freeze({
    key: 'request',
    name: 'Request Headers'
  }),
  queryString: Object.freeze({
    key: 'queryString',
    name: 'Query String Parameters'
  }),
  formData: Object.freeze({
    key: 'formaData',
    name: 'Form Data'
  }),
  requestPayload: Object.freeze({
    key: 'requestPayload',
    name: 'Request Payload'
  })
});

export const MAX_COLOR_CONTENT_SIZE = 100000; // 100kB

export const PAYLOAD_CAPTIONS = Object.freeze({
  encode: Object.freeze({
    true: 'URL encoded',
    false: 'decoded'
  }),
  parse: Object.freeze({
    true: 'source',
    false: 'parsed'
  })
});

export const UI_MESSAGES = {
  not_captured_due_to_caps:
    'Currently responses are recorded for limited device configurations',
  not_captured: 'Response data not captured',
  not_available: 'No response data available for this request'
};

export const HAR_LOG_DATA_KEY = {
  key: {}
};

export const APP_AUTOMATE_FRAMEWORKS = ['espresso', 'xcuitest'];

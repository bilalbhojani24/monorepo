const CODE_SNIPPETS_SCRATCH = (userDetails) => ({
  'create-grid': {
    a: {
      code: 'npm install browserstack-node-sdk',
      language: 'npm',
      text: 'Download CLI.'
    },
    b: {
      code: `browserstack-cli ats init --bstack-username ${userDetails.username} --bstack-accesskey ${userDetails.accessKey}`,
      language: 'node',
      text: 'Setup CLI with BrowserStack credentials.'
    },
    c: {
      code: 'browserstack-cli ats create grid',
      language: 'node',
      text: 'Execute grid creation command.'
    }
  }
});

const EVENT_LOGS_STATUS = {
  FINISHED: 'FININSHED',
  FAILED: 'FAILED',
  IN_PROGRESS: 'IN_PROGRESS',
  NOT_STARTED: 'NOT_STARTED'
};

const HEADER_TEXTS_OBJECT = (userDetails) => ({
  intro: `Hey ${userDetails.fullname}, Welcome to Automate TurboScale`,
  scratch: 'Create Automation Grid',
  existing: 'Create Automation Grid'
});

const SETUP_TYPES = {
  scratch: 'scratch',
  existing: 'existing'
};

const STEP_1_RADIO_GROUP_OPTIONS = [
  {
    description:
      'Create Automation Grid from scratch. Choose this option to create a new grid with a new Kubernetes Cluster.',
    disabled: false,
    primaryLabel: "No, I don't have a setup.",
    value: 1
  },
  {
    description:
      'Create Automation Grid in the existing setup. Choose this option to create a grid in your existing Kubernetes Cluster.',
    disabled: false,
    primaryLabel: 'Yes, I have a setup.',
    value: 2
  }
];

export {
  CODE_SNIPPETS_SCRATCH,
  EVENT_LOGS_STATUS,
  HEADER_TEXTS_OBJECT,
  SETUP_TYPES,
  STEP_1_RADIO_GROUP_OPTIONS
};

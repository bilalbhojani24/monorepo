import React from 'react';
import { AzurePipelinesIcon, JenkinsIcon } from 'assets/icons/components';
import MochaIcon from 'assets/icons/Mocha.svg';
import TestNgIcon from 'assets/icons/Testng.svg';
import WebDriverIOIcon from 'assets/icons/Webdriver-IO.svg';
import { getDocUrl } from 'utils/common';

export const INTEGRATIONS_PARAMS = {
  MANAGE_EMAIL_PREFERENCE: 'manage_email_preference'
};

const CI_INTEGRATIONS = [
  {
    name: 'Jenkins',
    dataToken: 'JENKINS',
    cta: {
      name: 'Connect',
      analyticKey: 'jenkins_connect_clicked'
    },
    icon: <JenkinsIcon width="40" height="40" />
  },
  {
    name: 'Azure Pipelines',
    dataToken: 'AZURE_DEVOPS',
    cta: {
      name: 'Connect',
      analyticKey: 'azure_connect_clicked'
    },
    icon: <AzurePipelinesIcon width="40" height="40" />
  }
];

const TESTING_FRAMEWORKS = [
  {
    name: 'TestNG',
    dataToken: 'TESTNG',
    cta: {
      name: 'Documentation',
      link: getDocUrl({ path: 'quick-start/testng', prependO11y: true }),
      analyticKey: 'framework_docs_visited'
    },
    icon: (
      <img className="max-h-12 max-w-full" src={TestNgIcon} alt="TestNg Icon" />
    )
  },
  {
    name: 'Mocha',
    dataToken: 'MOCHA',
    cta: {
      name: 'Documentation',
      link: getDocUrl({ path: 'quick-start/mocha', prependO11y: true }),
      analyticKey: 'framework_docs_visited'
    },
    icon: <img alt="Mocha" className="h-10 w-10 rounded-full" src={MochaIcon} />
  },
  {
    name: 'Webdriver-IO',
    dataToken: 'WEBDRIVER-IO',
    cta: {
      name: 'Documentation',
      link: getDocUrl({ path: 'quick-start/webdriverio', prependO11y: true }),
      analyticKey: 'framework_docs_visited'
    },
    icon: (
      <img
        className="max-h-12 max-w-full"
        src={WebDriverIOIcon}
        alt="WebDriver IO Icon"
      />
    )
  }
];

// const PROJECT_MANAGEMENT_TOOLS = [
//   {
//     name: 'Jira',
//     dataToken: 'JIRA',
//     cta: {
//       name: 'Manage Integration',
//       link: `https://${BrowserStackConfig.main_cookie_domain}/accounts/integrations`,
//       isExternal: true,
//       analyticKey: 'pm_tools_docs_visited'
//     },
//     icon: (
//       <svg>
//         <use xlinkHref="#Jira" />
//       </svg>
//     )
//   }
// ];

// const COMMUNICATION_TOOLS = [
//   {
//     name: 'Email',
//     dataToken: 'EMAIL',
//     cta: {
//       name: 'Configure',
//       link: `${ROUTES.integrations.base}?${INTEGRATIONS_PARAMS.MANAGE_EMAIL_PREFERENCE}=true&source=click`,
//       analyticKey: 'email_preference_configure_clicked'
//     },
//     icon: <MailOutlineIcon className="to-integration-email-icon" />
//   }
// ];

// const SOURCE_CODE_VIEWER = [
//   {
//     name: 'Github',
//     dataToken: 'GITHUB',
//     cta: {
//       name: 'Documentation',
//       link: `${BASE_DOC_URL}/test-observability/integrations/source-code`,
//       isExternal: true,
//       analyticKey: 'scim_docs_visited'
//     },
//     icon: (
//       <svg>
//         <use xlinkHref="#Github" />
//       </svg>
//     )
//   },
//   {
//     name: 'Gitlab',
//     dataToken: 'GITLAB',
//     cta: {
//       name: 'Documentation',
//       link: `${BASE_DOC_URL}/test-observability/integrations/source-code`,
//       isExternal: true,
//       analyticKey: 'scim_docs_visited'
//     },
//     icon: (
//       <svg>
//         <use xlinkHref="#Gitlab" />
//       </svg>
//     )
//   }
// ];

// const APPLICATION_LOGS_READER = [
//   {
//     name: 'Logstash',
//     dataToken: 'LOGSTASH',
//     cta: {
//       name: 'Documentation',
//       link: `${BASE_DOC_URL}/test-observability/integrations/application-logs`,
//       isExternal: true,
//       analyticKey: 'application_logs_docs_visited'
//     },
//     icon: (
//       <svg>
//         <use xlinkHref="#Logstash" />
//       </svg>
//     )
//   },
//   {
//     name: 'Filebeat + Logstash',
//     dataToken: 'FILEBEAT + LOGSTASH',
//     cta: {
//       name: 'Documentation',
//       link: `${BASE_DOC_URL}/test-observability/integrations/application-logs`,
//       isExternal: true,
//       analyticKey: 'application_logs_docs_visited'
//     },
//     icon: (
//       <svg>
//         <use xlinkHref="#filebeat+logstash" />
//       </svg>
//     )
//   },
//   {
//     name: 'Fluentd',
//     dataToken: 'FLUENTD',
//     cta: {
//       name: 'Documentation',
//       link: `${BASE_DOC_URL}/test-observability/integrations/application-logs`,
//       isExternal: true,
//       analyticKey: 'application_logs_docs_visited'
//     },
//     icon: (
//       <svg>
//         <use xlinkHref="#Fluentd" />
//       </svg>
//     )
//   },
//   {
//     name: 'Winston',
//     dataToken: 'WINSTON',
//     cta: {
//       name: 'Documentation',
//       link: `${BASE_DOC_URL}/test-observability/integrations/application-logs`,
//       isExternal: true,
//       analyticKey: 'application_logs_docs_visited'
//     },
//     icon: (
//       <svg>
//         <use xlinkHref="#Winston" />
//       </svg>
//     )
//   }
// ];

export const INTEGRATIONS = [
  {
    name: 'Testing frameworks',
    list: TESTING_FRAMEWORKS
  },
  {
    name: 'CI/CD',
    list: CI_INTEGRATIONS
  }
  // {
  //   name: 'Project management tools',
  //   list: PROJECT_MANAGEMENT_TOOLS
  // },
  // {
  //   name: 'Communication Tools',
  //   list: COMMUNICATION_TOOLS
  // },
  // {
  //   name: 'Source code view',
  //   list: SOURCE_CODE_VIEWER
  // },
  // {
  //   name: 'Application logs recorders',
  //   list: APPLICATION_LOGS_READER
  // }
];

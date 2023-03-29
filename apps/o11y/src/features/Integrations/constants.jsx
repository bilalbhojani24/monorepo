import React from 'react';
import { MdOutlineMailOutline } from '@browserstack/bifrost';
import {
  AzurePipelinesIcon,
  GithubIcon,
  GitLabIcon,
  JenkinsIcon,
  JiraIcon
} from 'assets/icons/components';
import FilebeatLogstash from 'assets/icons/filebeat+logstash.svg';
import Fluentd from 'assets/icons/fluentd.svg';
import Logstash from 'assets/icons/logstash.svg';
import MochaIcon from 'assets/icons/Mocha.svg';
import TestNgIcon from 'assets/icons/Testng.svg';
import WebDriverIOIcon from 'assets/icons/Webdriver-IO.svg';
import Winston from 'assets/icons/winston.svg';
import { DOC_KEY_MAPPING } from 'constants/common';
import { getDocUrl } from 'utils/common';

export const INTEGRATIONS_PARAMS = {
  MANAGE_EMAIL_PREFERENCE: 'manage_email_preference'
};

const CI_INTEGRATIONS = [
  {
    name: 'Jenkins',
    dataToken: 'JENKINS',
    cta: {
      name: 'Configure',
      link: '',
      analyticKey: 'jenkins_connect_clicked'
    },
    icon: <JenkinsIcon width="40" height="40" />
  },
  {
    name: 'Azure Pipelines',
    dataToken: 'AZURE_DEVOPS',
    cta: {
      name: 'Configure',
      link: '',
      analyticKey: 'azure_connect_clicked'
    },
    icon: <AzurePipelinesIcon width="40" height="40" />
  }
];

const TESTING_FRAMEWORKS = [
  {
    name: 'TestNG',
    dataToken: 'TESTNG',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({ path: DOC_KEY_MAPPING.testng, prependO11y: true }),
      analyticKey: 'framework_docs_visited'
    },
    icon: <img className="max-h-10 w-10" src={TestNgIcon} alt="TestNg Icon" />
  },
  {
    name: 'Mocha',
    dataToken: 'MOCHA',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({ path: DOC_KEY_MAPPING.mocha, prependO11y: true }),
      analyticKey: 'framework_docs_visited'
    },
    icon: <img alt="Mocha" className="h-10 w-10 rounded-full" src={MochaIcon} />
  },
  {
    name: 'Webdriver-IO',
    dataToken: 'WEBDRIVER-IO',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({ path: DOC_KEY_MAPPING.wdio, prependO11y: true }),
      analyticKey: 'framework_docs_visited'
    },
    icon: (
      <img
        className="max-h-10 w-10"
        src={WebDriverIOIcon}
        alt="WebDriver IO Icon"
      />
    )
  }
];

const PROJECT_MANAGEMENT_TOOLS = [
  {
    name: 'Jira',
    dataToken: 'JIRA',
    cta: {
      name: 'Configure',
      link: 'accounts/integrations',
      analyticKey: 'pm_tools_docs_visited'
    },
    icon: <JiraIcon width="40" height="40" />
  }
];

const COMMUNICATION_TOOLS = [
  {
    name: 'Email',
    dataToken: 'EMAIL',
    cta: {
      name: 'Configure',
      link: '',
      analyticKey: 'email_preference_configure_clicked'
    },
    icon: <MdOutlineMailOutline className="h-10 w-10 rounded-full" />
  }
];

const SOURCE_CODE_VIEWER = [
  {
    name: 'Github',
    dataToken: 'GITHUB',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({ path: DOC_KEY_MAPPING.source_code, prependO11y: true }),
      analyticKey: 'scim_docs_visited'
    },
    icon: <GithubIcon width="40" height="40" />
  },
  {
    name: 'Gitlab',
    dataToken: 'GITLAB',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({ path: DOC_KEY_MAPPING.source_code, prependO11y: true }),
      analyticKey: 'scim_docs_visited'
    },
    icon: <GitLabIcon width="40" height="40" />
  }
];

const APPLICATION_LOGS_READER = [
  {
    name: 'Logstash',
    dataToken: 'LOGSTASH',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({
        path: DOC_KEY_MAPPING.application_logs,
        prependO11y: true
      }),
      analyticKey: 'application_logs_docs_visited'
    },
    icon: <img className="max-h-10 w-10" src={Logstash} alt="Logstash Icon" />
  },
  {
    name: 'Filebeat + Logstash',
    dataToken: 'FILEBEAT + LOGSTASH',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({
        path: DOC_KEY_MAPPING.application_logs,
        prependO11y: true
      }),
      isExternal: true,
      analyticKey: 'application_logs_docs_visited'
    },
    icon: (
      <img
        className="max-h-10 w-10"
        src={FilebeatLogstash}
        alt="FilebeatLogstash Icon"
      />
    )
  },
  {
    name: 'Fluentd',
    dataToken: 'FLUENTD',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({
        path: DOC_KEY_MAPPING.application_logs,
        prependO11y: true
      }),
      isExternal: true,
      analyticKey: 'application_logs_docs_visited'
    },
    icon: <img className="max-h-10 w-10" src={Fluentd} alt="Fluentd Icon" />
  },
  {
    name: 'Winston',
    dataToken: 'WINSTON',
    type: 'Documentation',
    cta: {
      name: 'View',
      link: getDocUrl({
        path: DOC_KEY_MAPPING.application_logs,
        prependO11y: true
      }),
      isExternal: true,
      analyticKey: 'application_logs_docs_visited'
    },
    icon: <img className="max-h-10 w-10" src={Winston} alt="Winston Icon" />
  }
];

export const INTEGRATIONS = [
  {
    name: 'Testing frameworks',
    value: 'testingFrameworks',
    list: TESTING_FRAMEWORKS
  },
  {
    name: 'CI/CD',
    value: 'cicd',
    list: CI_INTEGRATIONS
  },
  {
    name: 'Project management tools',
    value: 'pmTools',
    list: PROJECT_MANAGEMENT_TOOLS
  },
  {
    name: 'Communication Tools',
    value: 'communicationTools',
    list: COMMUNICATION_TOOLS
  },
  {
    name: 'Source code view',
    value: 'sourceCodeView',
    list: SOURCE_CODE_VIEWER
  },
  {
    name: 'Application logs recorders',
    value: 'applicationLogsRecorders',
    list: APPLICATION_LOGS_READER
  }
];

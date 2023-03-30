import React from 'react';
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
import { MODAL_TYPES } from 'constants/modalTypes';
import { getDocUrl, getEnvConfig } from 'utils/common';

import CIStackItem from './components/CIStackItem';
import DocumentStackListItem from './components/DocumentStackListItem';
import EmailCommunicationItem from './components/EmailCommunicationItem';

export const INTEGRATIONS_PARAMS = {
  MANAGE_EMAIL_PREFERENCE: 'manage_email_preference'
};

export const CI_API_SLUGS = {
  JENKINS: 'JENKINS',
  AZURE_DEVOPS: 'AZURE_DEVOPS'
};

const CI_INTEGRATIONS = [
  {
    name: 'Jenkins',
    component: (
      <CIStackItem
        analyticKey="jenkins_connect_clicked"
        title="Jenkins"
        icon=<JenkinsIcon width="40" height="40" />
        cta="Configure"
        apiSlug={CI_API_SLUGS.JENKINS}
        modalKey={MODAL_TYPES.jenkins_connect_modal}
      />
    )
  },
  {
    name: 'Azure Pipelines',
    component: (
      <CIStackItem
        analyticKey="azure_connect_clicked"
        title="AzurePipelinesIcon"
        icon=<AzurePipelinesIcon width="40" height="40" />
        cta="Configure"
        apiSlug={CI_API_SLUGS.AZURE_DEVOPS}
        modalKey={MODAL_TYPES.azure_connect_modal}
      />
    )
  }
];

const TESTING_FRAMEWORKS = [
  {
    name: 'TestNg',
    component: (
      <DocumentStackListItem
        analyticKey="framework_docs_visited"
        title="TestNg"
        subTitle="Documentation"
        link={getDocUrl({ path: DOC_KEY_MAPPING.testng, prependO11y: true })}
        icon=<img
          className="max-h-10 w-10"
          src={TestNgIcon}
          alt="TestNg Icon"
        />
      />
    )
  },
  {
    name: 'Mocha',
    component: (
      <DocumentStackListItem
        analyticKey="framework_docs_visited"
        title="Mocha"
        subTitle="Documentation"
        link={getDocUrl({ path: DOC_KEY_MAPPING.mocha, prependO11y: true })}
        icon=<img
          alt="Mocha"
          className="h-10 w-10 rounded-full"
          src={MochaIcon}
        />
      />
    )
  },
  {
    name: 'Webdriver-IO',
    component: (
      <DocumentStackListItem
        analyticKey="framework_docs_visited"
        title="Webdriver-IO"
        subTitle="Documentation"
        link={getDocUrl({ path: DOC_KEY_MAPPING.wdio, prependO11y: true })}
        icon=<img
          className="max-h-10 w-10"
          src={WebDriverIOIcon}
          alt="WebDriver IO Icon"
        />
      />
    )
  }
];

const PROJECT_MANAGEMENT_TOOLS = [
  {
    name: 'Jira',
    component: (
      <DocumentStackListItem
        analyticKey="pm_tools_docs_visited"
        title="Jira"
        subTitle=""
        link={`${getEnvConfig().baseUrl}/accounts/integrations`}
        icon=<JiraIcon width="40" height="40" />
        cta="Manage"
      />
    )
  }
];

const COMMUNICATION_TOOLS = [
  {
    name: 'Email',
    component: <EmailCommunicationItem />
  }
];

const SOURCE_CODE_VIEWER = [
  {
    name: 'Github',
    component: (
      <DocumentStackListItem
        analyticKey="scim_docs_visited"
        title="Github"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.source_code,
          prependO11y: true
        })}
        icon=<GithubIcon width="40" height="40" />
      />
    )
  },
  {
    name: 'Gitlab',
    component: (
      <DocumentStackListItem
        analyticKey="scim_docs_visited"
        title="Gitlab"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.source_code,
          prependO11y: true
        })}
        icon=<GitLabIcon width="40" height="40" />
      />
    )
  }
];

const APPLICATION_LOGS_READER = [
  {
    name: 'Logstash',
    component: (
      <DocumentStackListItem
        analyticKey="application_logs_docs_visited"
        title="Logstash"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.application_logs,
          prependO11y: true
        })}
        icon=<img
          className="max-h-10 w-10"
          src={Logstash}
          alt="Logstash Icon"
        />
      />
    )
  },
  {
    name: 'Filebeat + Logstash',
    component: (
      <DocumentStackListItem
        analyticKey="application_logs_docs_visited"
        title="Filebeat + Logstash"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.application_logs,
          prependO11y: true
        })}
        icon=<img
          className="max-h-10 w-10"
          src={FilebeatLogstash}
          alt="FilebeatLogstash Icon"
        />
      />
    )
  },
  {
    name: 'Fluentd',
    component: (
      <DocumentStackListItem
        analyticKey="application_logs_docs_visited"
        title="Fluentd"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.application_logs,
          prependO11y: true
        })}
        icon=<img className="max-h-10 w-10" src={Fluentd} alt="Fluentd Icon" />
      />
    )
  },
  {
    name: 'Winston',
    component: (
      <DocumentStackListItem
        analyticKey="application_logs_docs_visited"
        title="Winston"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.application_logs,
          prependO11y: true
        })}
        icon=<img className="max-h-10 w-10" src={Winston} alt="Winston Icon" />
      />
    )
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

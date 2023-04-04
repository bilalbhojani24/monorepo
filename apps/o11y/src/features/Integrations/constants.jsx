import React from 'react';
import {
  AzurePipelinesIcon,
  FilebeatNLogStashIcon,
  FluentdIcon,
  GithubIcon,
  GitLabIcon,
  JenkinsIcon,
  JiraIcon,
  LogStashIcon,
  MochaIcon,
  TestngIcon,
  WdioIcon,
  WinstonIcon
} from 'assets/icons/components';
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

export const INTEGRATIONS_EXT_LINKS = {
  browserstackPlugin: 'https://plugins.jenkins.io/browserstack-integration/',
  azurePAT:
    'https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate'
};

const CI_INTEGRATIONS = [
  {
    name: 'Jenkins',
    Component: () => (
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
    Component: () => (
      <CIStackItem
        analyticKey="azure_connect_clicked"
        title="Azure Pipelines"
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
    name: 'TestNG',
    Component: () => (
      <DocumentStackListItem
        analyticKey="framework_docs_visited"
        title="TestNG"
        subTitle="Documentation"
        link={getDocUrl({ path: DOC_KEY_MAPPING.testng, prependO11y: true })}
        icon=<TestngIcon width="40" height="40" />
      />
    )
  },
  {
    name: 'Mocha',
    Component: () => (
      <DocumentStackListItem
        analyticKey="framework_docs_visited"
        title="Mocha"
        subTitle="Documentation"
        link={getDocUrl({ path: DOC_KEY_MAPPING.mocha, prependO11y: true })}
        icon=<MochaIcon width="40" height="40" />
      />
    )
  },
  {
    name: 'Webdriver-IO',
    Component: () => (
      <DocumentStackListItem
        analyticKey="framework_docs_visited"
        title="Webdriver-IO"
        subTitle="Documentation"
        link={getDocUrl({ path: DOC_KEY_MAPPING.wdio, prependO11y: true })}
        icon=<WdioIcon width="40" height="40" />
      />
    )
  }
];

const PROJECT_MANAGEMENT_TOOLS = [
  {
    name: 'Jira',
    Component: () => (
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
    Component: () => <EmailCommunicationItem />
  }
];

const SOURCE_CODE_VIEWER = [
  {
    name: 'Github',
    Component: () => (
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
    Component: () => (
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
    Component: () => (
      <DocumentStackListItem
        analyticKey="application_logs_docs_visited"
        title="Logstash"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.application_logs,
          prependO11y: true
        })}
        icon=<LogStashIcon width="40" height="40" />
      />
    )
  },
  {
    name: 'Filebeat + Logstash',
    Component: () => (
      <DocumentStackListItem
        analyticKey="application_logs_docs_visited"
        title="Filebeat + Logstash"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.application_logs,
          prependO11y: true
        })}
        icon=<FilebeatNLogStashIcon width="40" height="40" />
      />
    )
  },
  {
    name: 'Fluentd',
    Component: () => (
      <DocumentStackListItem
        analyticKey="application_logs_docs_visited"
        title="Fluentd"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.application_logs,
          prependO11y: true
        })}
        icon=<FluentdIcon width="40" height="40" />
      />
    )
  },
  {
    name: 'Winston',
    Component: () => (
      <DocumentStackListItem
        analyticKey="application_logs_docs_visited"
        title="Winston"
        subTitle="Documentation"
        link={getDocUrl({
          path: DOC_KEY_MAPPING.application_logs,
          prependO11y: true
        })}
        icon=<WinstonIcon width="40" height="40" />
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

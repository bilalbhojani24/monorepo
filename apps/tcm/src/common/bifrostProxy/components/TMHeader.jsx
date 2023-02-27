/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { Header } from '@browserstack/bifrost';
import AppRoute from 'const/routes';

const TEST_RUNS_LINK =
  'https://www.browserstack.com/docs/test-management/features/test-runs';

const TMHeader = () => (
  <Header
    wrapperClassName="fixed w-full"
    headerID="bstack-header"
    productLink={AppRoute.ROOT}
    productName="Test Management"
    release="Alpha"
    headerElementArray={[
      'team',
      'pricing',
      'help',
      'search',
      'notifications',
      'account'
    ]}
    documentation={{
      title: 'Key Features',
      options: [
        {
          name: 'Test Case Repository',
          link: 'https://www.browserstack.com/docs/test-management/features/test-cases'
        },
        {
          name: 'Test Runs',
          link: TEST_RUNS_LINK
        },
        {
          name: 'Integrate Test Observability',
          link: 'https://www.browserstack.com/docs/test-management/integrations/test-observability'
        },
        {
          name: 'Upload JUnit-XML/BDD-JSON Reports',
          link: TEST_RUNS_LINK
        },
        {
          name: 'Quick Import Data',
          link: 'https://www.browserstack.com/docs/test-management/quick-start/quick-import'
        },
        {
          name: 'Dashboard Analytics',
          link: 'https://www.browserstack.com/docs/test-management/features/dashboard'
        },
        {
          name: '2-way Jira Integration',
          link: 'https://www.browserstack.com/docs/test-management/features/2-way-jira-binding'
        }
      ]
    }}
    references={{
      title: 'Overview',
      options: [
        {
          name: 'Why use Test Management?',
          link: 'https://www.browserstack.com/docs/test-management/'
        },
        {
          name: 'Unify your Testing',
          link: TEST_RUNS_LINK
        }
      ]
    }}
    others={{
      title: 'References',
      options: [
        {
          name: 'Documentation',
          link: 'https://www.browserstack.com/docs/test-management/'
        },
        {
          name: 'Contact Support',
          link: 'https://www.browserstack.com/contact'
        }
      ]
    }}
    documentationLink="https://www.browserstack.com/docs/test-management/"
    supportLink="https://www.browserstack.com/contact"
    // showTestInsights
    // beamerProductId="XxcUulZf52793"
  >
    {/* <HeaderBrand />
    <HeaderProducts wrapperClassName="max-[1360px]:hidden" />
    <div className="float-right ml-auto">
      <HeaderElements />
    </div> */}
  </Header>
);

export default TMHeader;

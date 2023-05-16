/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { Header } from '@browserstack/bifrost';
import { PRODUCTION_HOST } from 'const/immutables';
import AppRoute, { DEV_SIGN_OUT_URL } from 'const/routes';

const TEST_RUNS_LINK =
  'https://www.browserstack.com/docs/test-management/features/test-runs';

const TMHeader = () => (
  <Header
    wrapperClassName="fixed w-full"
    headerID="bstack-header"
    productLink={AppRoute.ROOT}
    productName="Test Management"
    release="Beta"
    headerElementArray={[
      'team',
      'pricing',
      'help',
      'search',
      'notifications',
      'account'
    ]}
    buyPlanText="Get a Demo"
    buyPlanLink="https://www.browserstack.com/contact?&ref=test-management-dashboard-top-header-csf-lead"
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
          name: 'Quick Import Data',
          link: 'https://www.browserstack.com/docs/test-management/quick-start/quick-import'
        },
        {
          name: 'Dashboard Analytics',
          link: 'https://www.browserstack.com/docs/test-management/features/dashboard'
        },
        {
          name: 'Integrate Test Observability',
          link: 'https://www.browserstack.com/docs/test-management/integrations/test-observability'
        },
        {
          name: 'Upload JUnit-XML Reports',
          link: 'https://www.browserstack.com/docs/test-management/integrations/curl-upload#junit-xml'
        },
        {
          name: 'Upload BDD-JSON Reports',
          link: 'https://www.browserstack.com/docs/test-management/integrations/curl-upload#bdd-json'
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
          name: 'Why Test Management?',
          link: 'https://www.browserstack.com/docs/test-management/overview/what-is-test-management'
        },
        {
          name: 'Unify your Testing',
          link: TEST_RUNS_LINK
        }
      ]
    }}
    others={{
      title: 'Automation Runs',
      options: [
        {
          name: 'Manual Test Runs',
          link: 'https://www.browserstack.com/docs/test-management/features/test-runs#manual-test-runs'
        },
        {
          name: 'Automation Test Runs',
          link: 'https://www.browserstack.com/docs/test-management/features/test-runs#automation-test-runs'
        }
      ]
    }}
    onSignoutClick={(e) => {
      if (window.location.hostname !== PRODUCTION_HOST) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = DEV_SIGN_OUT_URL;
      }
    }}
    documentationLink="https://www.browserstack.com/docs/test-management/overview/what-is-test-management"
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

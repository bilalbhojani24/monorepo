import React from 'react';
import { Header } from '@browserstack/bifrost';
import {
  DOC_LINKS_CONSTANTS,
  getSignOutUrl,
  getWebsiteUrlOrigin
} from '@browserstack/mcp-shared';

import { OVERVIEW_LINKS } from '../../../constants/webHeaderConstants';

const AppPerformanceHeader = () => (
  <Header
    wrapperClassName="fixed w-full"
    headerID="app-perf-bstack-header"
    productLink={getWebsiteUrlOrigin()}
    productName="App Performance Testing"
    release="Alpha"
    headerElementArray={['help', 'account']}
    documentation={{
      title: 'Overview',
      options: OVERVIEW_LINKS
    }}
    references={{
      title: 'Key Features',
      options: [
        {
          name: 'Test Case Repository',
          link: 'https://www.browserstack.com/docs/test-management/features/test-cases'
        }
      ]
    }}
    others={{
      title: 'Automation Runs',
      options: [
        {
          name: 'Manual Test Runs',
          link: 'https://www.browserstack.com/docs/test-management/features/test-runs#manual-test-runs'
        }
      ]
    }}
    onSignoutClick={(e) => {
      if (!IS_PROD) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = getSignOutUrl();
      }
    }}
    documentationLink={DOC_LINKS_CONSTANTS.ROOT_DOC_LINK}
    supportLink={DOC_LINKS_CONSTANTS.CONTACT_US}
  />
);

export default AppPerformanceHeader;

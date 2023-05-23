import React from 'react';
import { Header } from '@browserstack/bifrost';
import {
  DOC_LINKS_CONSTANTS,
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
      title: 'References',
      options: [
        {
          name: 'Terms And Conditions',
          link: 'https://www.browserstack.com/docs/app-performance/references/terms-and-conditions'
        }
      ]
    }}
    others={null}
    onSignoutClick={() => {}}
    documentationLink={DOC_LINKS_CONSTANTS.ROOT_DOC_LINK}
    supportLink={DOC_LINKS_CONSTANTS.CONTACT_US}
  />
);

export default AppPerformanceHeader;

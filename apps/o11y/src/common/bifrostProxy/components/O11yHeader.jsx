import React from 'react';
import { Header } from '@browserstack/bifrost';
import { DOC_KEY_MAPPING } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getDocUrl } from 'utils/common';

const O11yHeader = () => (
  <Header
    wrapperClassName="fixed w-full"
    headerID="bstack-header"
    productName="Test Observability"
    productLink={ROUTES.root}
    release="Beta"
    // beamerProductId="XxcUulZf52793"
    documentationLink="https://www.browserstack.com/docs/test-observability/"
    supportLink="https://www.browserstack.com/contact"
    headerElementArray={[
      'team',
      'pricing',
      'help',
      'search',
      // 'notifications',
      'account'
    ]}
    documentation={{
      title: 'Key Features',
      options: [
        {
          name: 'Upload backend application logs',
          link: getDocUrl(DOC_KEY_MAPPING.uploading_logs)
        },
        {
          name: 'Automatic failure analysis',
          link: getDocUrl(DOC_KEY_MAPPING.auto_analyser)
        },
        {
          name: 'Re-run a subset of tests',
          link: getDocUrl(DOC_KEY_MAPPING.re_run)
        },
        {
          name: 'Mute problematic test cases',
          link: getDocUrl(DOC_KEY_MAPPING.mute)
        },
        {
          name: 'View source code',
          link: getDocUrl(DOC_KEY_MAPPING.source_code)
        }
      ]
    }}
    references={{
      title: 'Overview',
      options: [
        {
          name: 'Why use Test Observability?',
          link: getDocUrl(DOC_KEY_MAPPING.introduction)
        }
      ]
    }}
    others={{
      title: 'Getting Started',
      options: [
        {
          name: 'WebdriverIO',
          link: getDocUrl(DOC_KEY_MAPPING.wdio)
        },
        {
          name: 'TestNG',
          link: getDocUrl(DOC_KEY_MAPPING.testng)
        },
        {
          name: 'Mocha',
          link: getDocUrl(DOC_KEY_MAPPING.mocha)
        }
      ]
    }}
  />
);

export default O11yHeader;

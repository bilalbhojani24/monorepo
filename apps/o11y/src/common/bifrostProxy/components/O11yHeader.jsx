/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { Header } from '@browserstack/bifrost';
import { ROUTES } from 'constants/routes';

const O11yHeader = () => (
  <Header
    wrapperClassName="fixed w-full"
    headerID="bstack-header"
    productName="Test Observability"
    productLink={ROUTES.root}
    release="Alpha"
    beamerProductId="XxcUulZf52793"
    supportLink="https://www.browserstack.com/docs/test-observability/"
    headerElementArray={[
      'team',
      'pricing',
      // 'help',
      'search',
      'notifications',
      'account'
    ]}
  />
);

export default O11yHeader;

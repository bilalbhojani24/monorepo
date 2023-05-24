import React from 'react';
import { Header } from '@browserstack/bifrost';

import { ROUTES } from '../../../constants/routes';
import { getEnvConfig } from '../../../utils/getEnvConfig';

const envConfig = getEnvConfig();

const INTGHeader = () => (
  <Header
    wrapperClassName="relative top-unset"
    headerID="bstack-header"
    productName="Integrate"
    productLink={ROUTES.root}
    release="Alpha"
    headerElementArray={['account']}
    showTestInsights={false}
    onSignoutClick={(e) => {
      if (envConfig.signOutUrl) {
        e.preventDefault();
        window.location.href = envConfig.signOutUrl;
      }
    }}
  />
);

export default INTGHeader;

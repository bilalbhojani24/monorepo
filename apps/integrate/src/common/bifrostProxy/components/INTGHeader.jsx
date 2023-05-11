import React from 'react';
import { Header } from '@browserstack/bifrost';

import { ROUTES } from '../../../constants/routes';

const INTGHeader = () => (
  <Header
    wrapperClassName="sticky top-0"
    headerID="bstack-header"
    productName="Integrate"
    productLink={ROUTES.root}
    release="Alpha"
    showTestInsights={false}
  />
);

export default INTGHeader;

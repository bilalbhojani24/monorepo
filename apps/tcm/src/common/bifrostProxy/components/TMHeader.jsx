/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { Header } from '@browserstack/bifrost';
import AppRoute from 'const/routes';

const DEFAULT_LINK = 'https://www.browserstack.com';

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
      title: 'Documentation',
      options: [
        { name: 'lorem', link: DEFAULT_LINK },
        { name: 'ipsum', link: DEFAULT_LINK }
      ]
    }}
    references={{
      title: 'References',
      options: [
        { name: 'lorem', link: DEFAULT_LINK },
        { name: 'ipsum', link: DEFAULT_LINK }
      ]
    }}
    others={{
      title: 'Other',
      options: [
        { name: 'lorem', link: DEFAULT_LINK },
        { name: 'ipsum', link: DEFAULT_LINK }
      ]
    }}
    documentationLink=""
    supportLink=""
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

/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import {
  Header,
  HeaderBrand,
  HeaderElements,
  HeaderProducts
} from '@browserstack/bifrost';
import AppRoute from 'const/routes';

const TMHeader = () => (
  <Header
    wrapperClassName="fixed w-full"
    headerID="bstack-header"
    productLink={AppRoute.ROOT}
    productName="Test Management"
    release="alpha"
  >
    <HeaderBrand />
    <HeaderProducts wrapperClassName="max-[1360px]:hidden" />
    <div className="float-right ml-auto">
      <HeaderElements />
    </div>
  </Header>
);

export default TMHeader;

/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import {
  Header,
  HeaderBrand,
  HeaderElements,
  HeaderProducts
} from '@browserstack/bifrost';
import { TMBadge } from 'common/bifrostProxy';
import AppRoute from 'const/routes';

const TMHeader = () => (
  <Header
    wrapperClassName="fixed w-full"
    headerID="bstack-header"
    productLink={AppRoute.ROOT}
  >
    <HeaderBrand
      productName={
        <div className="flex items-center">
          Test Management
          <TMBadge
            isRounded
            text="Alpha"
            modifier="primary"
            size="basic"
            wrapperClassName="ml-1"
          />
        </div>
      }
    />
    <HeaderProducts wrapperClassName="max-[1360px]:hidden" />
    <div className="float-right ml-auto">
      <HeaderElements />
    </div>
  </Header>
);

export default TMHeader;

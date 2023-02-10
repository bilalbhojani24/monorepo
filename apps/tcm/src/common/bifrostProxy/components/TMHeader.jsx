/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  HeaderBrand,
  HeaderElements,
  HeaderProducts
} from '@browserstack/bifrost';
import AppRoute from 'const/routes';

const TMHeader = () => (
  <div id="bstack-header">
    <Header wrapperClassName="fixed w-full">
      <Link to={AppRoute.ROOT}>
        <HeaderBrand productName="Test Management" />
      </Link>
      <HeaderProducts wrapperClassName="max-[1360px]:hidden" />
      <div className="float-right ml-auto">
        <HeaderElements />
      </div>
    </Header>
  </div>
);

export default TMHeader;

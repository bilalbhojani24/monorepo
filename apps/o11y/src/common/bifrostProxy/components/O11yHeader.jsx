/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  HeaderBrand,
  HeaderElements,
  HeaderProducts
} from '@browserstack/bifrost';
import { O11yBadge } from 'common/bifrostProxy';
import { ROUTES } from 'constants/routes';

const O11yHeader = () => (
  <Header wrapperClassName="fixed w-full" headerID="bstack-header">
    <Link to={ROUTES.root}>
      <HeaderBrand
        productName={
          <div className="flex items-center">
            Test Observability
            <O11yBadge
              isRounded
              text="Alpha"
              modifier="primary"
              size="basic"
              wrapperClassName="ml-1"
            />
          </div>
        }
      />
    </Link>
    <HeaderProducts wrapperClassName="max-[1360px]:hidden" />
    <div className="ml-auto">
      <HeaderElements />
    </div>
  </Header>
);

export default O11yHeader;

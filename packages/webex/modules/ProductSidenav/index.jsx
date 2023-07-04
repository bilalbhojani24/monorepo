import React, { useState } from 'react';
import { useMountEffect } from '@browserstack/hooks';
import {
  cookieUtils as CookieUtils,
  logEvent,
  twClassNames
} from '@browserstack/utils';
import PropTypes from 'prop-types';

import { getPurchasedProducts } from './api/userData';
import SidenavElementContainer from './components/SidenavElementContainer';
import { WEB_PRODUCTS } from './const/productConstant';

const cookieUtils = new CookieUtils();

const getInitialState = (tab) => ({
  expanded: false,
  activeTab: tab,
  purchasedProducts: []
});

const ProductSidenav = ({ activeProduct }) => {
  const defaultTab = WEB_PRODUCTS.includes(activeProduct) ? 'web' : 'app';

  const [state, setState] = useState(getInitialState(defaultTab));
  const { expanded, activeTab, purchasedProducts } = state;

  const setExpanded = (value) =>
    setState((prev) => ({ ...prev, expanded: value }));

  const setActiveTab = (tab) =>
    setState((prev) => ({ ...prev, activeTab: tab }));

  const setPurchasedProducts = (products) =>
    setState((prev) => ({ ...prev, purchasedProducts: [...products] }));

  const headerScalability = cookieUtils.read('header_scalability');

  const fetchPurchasedProducts = async () => {
    const products = await getPurchasedProducts();
    if (products?.products?.length) {
      setPurchasedProducts(products?.products);
    }
  };

  useMountEffect(() => {
    const mainContentDOM = document.getElementById('app-main-content');
    if (headerScalability !== 'true' && mainContentDOM) {
      mainContentDOM.classList.remove('ml-14');
    }
    fetchPurchasedProducts();
  });

  const handleSidenavLeave = () => {
    setExpanded(false);
    setActiveTab(WEB_PRODUCTS.includes(activeProduct) ? 'web' : 'app');
  };

  const handleTabClick = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const handleMouseEnter = () => {
    if (!expanded) {
      logEvent([], 'web_events', 'HoveredOnSideNav', {
        source: 'Homepage_Demo_CTA_Exp4',
        location: 'Left Navigation',
        url: window.location.href,
        team: activeProduct
      });
    }
    setExpanded(true);
  };

  if (headerScalability !== 'true') {
    return null;
  }

  return (
    <>
      <div
        className={twClassNames(
          'top-16 flex flex-col items-start fixed left-0 h-full border-r border-solid border-base-300 bg-white z-10 transition-[width] duration-150 delay-50 ease-in',
          {
            'w-[56px]': !expanded,
            'w-[260px] overflow-y-auto shadow': expanded
          }
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleSidenavLeave}
        onFocus={() => setExpanded(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) handleSidenavLeave();
        }}
      >
        <SidenavElementContainer
          isExpanded={expanded}
          activeProduct={activeProduct}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          purchasedProducts={purchasedProducts}
        />
      </div>
    </>
  );
};

ProductSidenav.propTypes = {
  activeProduct: PropTypes.string
};
ProductSidenav.defaultProps = {
  activeProduct: ''
};

export default ProductSidenav;

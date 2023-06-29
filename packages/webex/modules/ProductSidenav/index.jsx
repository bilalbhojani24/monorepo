import React, { useState } from 'react';
import { useMountEffect } from '@browserstack/hooks';
import {
  cookieUtils as CookieUtils,
  logEvent,
  twClassNames
} from '@browserstack/utils';
import PropTypes from 'prop-types';

import { getPurchasedProducts } from './api/userData';
import SidenavCollapsed from './components/SidenavCollapsed';
import SidenavExpanded from './components/SidenavExpanded';
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
    if (products.products.length) {
      setPurchasedProducts(products.products);
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
    setExpanded(true);
    logEvent([], 'web_events', 'HoveredOnSideNav', {
      source: 'Homepage_Demo_CTA_Exp4',
      location: 'Left Navigation',
      url: window.location.href,
      team: activeProduct
    });
  };

  if (headerScalability !== 'true') {
    return null;
  }

  return (
    <>
      <div
        className={twClassNames(
          'top-16 flex flex-col items-start fixed left-0 h-full border-r border-solid border-base-300 bg-white z-10',
          {
            'w-[56px]': !expanded,
            'w-[260px] overflow-y-auto': expanded
          }
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleSidenavLeave}
        onFocus={() => setExpanded(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) handleSidenavLeave();
        }}
      >
        {expanded ? (
          <SidenavExpanded
            activeProduct={activeProduct}
            activeTab={activeTab}
            onTabClick={handleTabClick}
            purchasedProducts={purchasedProducts}
          />
        ) : (
          <SidenavCollapsed
            activeProduct={activeProduct}
            activeTab={activeTab}
          />
        )}
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

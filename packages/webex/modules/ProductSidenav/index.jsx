import React, { useState } from 'react';
import { useMountEffect } from '@browserstack/hooks';
import { cookieUtils as CookieUtils, twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import SidenavCollapsed from './components/SidenavCollapsed';
import SidenavExpanded from './components/SidenavExpanded';
import { WEB_PRODUCTS } from './const/productConstant';

const cookieUtils = new CookieUtils();

const ProductSidenav = ({ activeProduct }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(
    WEB_PRODUCTS.includes(activeProduct) ? 'web' : 'app'
  );
  const headerScalability = cookieUtils.read('header_scalability');

  useMountEffect(() => {
    const mainContentDOM = document.getElementById('app-main-content');
    if (headerScalability !== 'true' && mainContentDOM) {
      mainContentDOM.classList.remove('ml-14');
      mainContentDOM.classList.remove('ml-[57px]');
    }
  });

  const handleTabClick = (selectedTab) => {
    setActiveTab(selectedTab);
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
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setExpanded(false);
        }}
      >
        {expanded ? (
          <SidenavExpanded
            activeProduct={activeProduct}
            activeTab={activeTab}
            onTabClick={handleTabClick}
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

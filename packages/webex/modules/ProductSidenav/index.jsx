import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import SidenavCollapsed from './components/SidenavCollapsed';
import SidenavExpanded from './components/SidenavExpanded';
import { WEB_PRODUCTS } from './const/productConstant';

const ProductSidenav = ({ activeProduct }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(
    WEB_PRODUCTS.includes(activeProduct) ? 'web' : 'app'
  );

  const handleTabClick = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <>
      <div
        className={twClassNames(
          'flex flex-col items-start fixed left-0 h-full border-r border-solid border-base-300 bg-white z-50',
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

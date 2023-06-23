import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import {
  APP_MANUAL_TESTING,
  APP_TEST_AUTOMATION,
  TEST_MANAGEMENT_AND_OPTIMIZATION,
  WEB_MANUAL_TESTING,
  WEB_TEST_AUTOMATION
} from '../const/productConstant';
import AppIcon from '../icons/AppIcon';
import WebIcon from '../icons/WebIcon';

const SidenavCollapsed = ({ activeProduct, activeTab }) => {
  const productElementContainer = (product) => {
    const isActiveProduct = product.identifier === activeProduct;
    return (
      <a
        href={product.twClassNamesink}
        className={twClassNames('flex items-center py-2 px-5 w-full', {
          'bg-[#F0F6FF] border-l-2 border-solid border-[#0070F0]':
            isActiveProduct,
          'px-[17.5px]': isActiveProduct
        })}
      >
        <span>
          {product.icon({ iconColor: isActiveProduct ? '#0D5FD4' : null })}
        </span>
      </a>
    );
  };

  const productSectionContainer = (productBlockData) => (
    <div className={twClassNames('flex flex-col items-center p-0 w-full')}>
      <div
        className={twClassNames(
          'flex flex-row justify-center items-start pt-3.5 pr-6 pb-1 pl-[26px] w-full'
        )}
      >
        <span className={twClassNames('w-1 h-1 rounded-full bg-base-500')} />
      </div>
      <div className={twClassNames('flex flex-col items-center p-0 w-full')}>
        {productBlockData.products?.map((element) =>
          productElementContainer(element)
        )}
      </div>
    </div>
  );
  return (
    <>
      <div
        className={twClassNames(
          'flex justify-center items-start pt-1.5 px-2 pb-0 w-full'
        )}
      >
        <div
          className={twClassNames(
            'flex items-center p-[3px] bg-base-50 rounded border border-solid border-base-300 w-full'
          )}
        >
          <button
            type="button"
            className={twClassNames(
              'flex justify-center items-center bg-[#15803D] rounded py-[9px] px-[7x] shadow-sm w-full'
            )}
            aria-label={activeTab === 'web' ? 'web products' : 'app products'}
          >
            {activeTab === 'web' ? (
              <WebIcon iconColor="white" />
            ) : (
              <AppIcon iconColor="white" />
            )}
          </button>
        </div>
      </div>
      <div
        className={twClassNames(
          'flex flex-col justify-center items-start p-0 w-full'
        )}
      >
        {activeTab === 'web' ? (
          <>
            {productSectionContainer(WEB_MANUAL_TESTING)}
            {productSectionContainer(WEB_TEST_AUTOMATION)}
          </>
        ) : (
          <>
            {productSectionContainer(APP_MANUAL_TESTING)}
            {productSectionContainer(APP_TEST_AUTOMATION)}
          </>
        )}
        {productSectionContainer(TEST_MANAGEMENT_AND_OPTIMIZATION)}
      </div>
    </>
  );
};

SidenavCollapsed.propTypes = {
  activeProduct: PropTypes.string,
  activeTab: PropTypes.string
};
SidenavCollapsed.defaultProps = {
  activeProduct: '',
  activeTab: ''
};

export default SidenavCollapsed;

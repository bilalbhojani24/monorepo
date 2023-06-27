import React from 'react';
import { logEvent, twClassNames } from '@browserstack/utils';
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

const SidenavExpanded = ({
  activeProduct,
  activeTab,
  onTabClick,
  purchasedProducts
}) => {
  const getProductClick = (product) => () => {
    // TODO: add args here
    logEvent();
  };

  const productElementContainer = (product) => {
    const isActiveProduct = product.identifier === activeProduct;
    return (
      <a
        className={twClassNames(
          'group box-border flex flex-row items-center py-2 pr-5 pl-7 gap-4 w-full',
          {
            'bg-[#F0F6FF] border-l-2 border-solid border-[#0070F0]':
              isActiveProduct
          }
        )}
        href={product.link}
        onClick={getProductClick(product)}
      >
        <span>
          {product.icon({
            iconColor: isActiveProduct ? '#0D5FD4' : null,
            iconClass: 'group-hover:fill-[#0070F0]'
          })}
        </span>
        <p
          className={twClassNames(
            'not-italic font-medium text-xs leading-4 text-base-900 grow group-hover:text-[#0070F0]',
            {
              'text-[#0D5FD4]': isActiveProduct
            }
          )}
        >
          {product.name}
        </p>
        {purchasedProducts.includes(product.productId) && (
          <span className="bg-success-500 h-1.5 w-1.5 rounded-full" />
        )}
      </a>
    );
  };

  const productSectionContainer = (productBlockData) => (
    <>
      <div
        className={twClassNames(
          'box-border flex items-center pt-3.5 pr-5 pb-1 pl-4'
        )}
      >
        <p
          className={twClassNames(
            'not-italic font-medium text-[11px] leading-4 text-base-700'
          )}
        >
          {productBlockData.title}
        </p>
      </div>
      <div className={twClassNames('flex flex-col items-center p-0 w-full')}>
        {productBlockData.products?.map((element) =>
          productElementContainer(element)
        )}
      </div>
    </>
  );

  const getTabClick = (type) => () => {
    onTabClick(type);
    // TODO: add args here
    logEvent();
  };

  return (
    <>
      <div
        className={twClassNames(
          'flex justify-center items-start pt-[6px] px-4 pb-0'
        )}
      >
        <div
          className={twClassNames(
            'box-border flex flex-row items-center p-[3px] w-[228px] h-9 bg-base-50 gap-1 border border-solid border-base-300'
          )}
        >
          <button
            type="button"
            className={twClassNames(
              'flex justify-center items-center w-[109px] h-[30px] rounded',
              {
                'bg-[#15803D]': activeTab === 'web'
              }
            )}
            onClick={getTabClick('web')}
          >
            <span>
              <WebIcon iconColor={activeTab === 'web' ? 'white' : null} />
            </span>
            <p
              className={twClassNames(
                'flex justify-center items-center py-0 px-0.5 not-italic font-medium text-xs leading-4',
                {
                  'text-white': activeTab === 'web',
                  'text-base-900': activeTab !== 'web'
                }
              )}
            >
              Web
            </p>
          </button>
          <button
            type="button"
            className={twClassNames(
              'flex justify-center items-center w-[109px] h-[30px] rounded',
              {
                'bg-[#15803D]': activeTab === 'app'
              }
            )}
            onClick={getTabClick('app')}
          >
            <span>
              <AppIcon iconColor={activeTab === 'app' ? 'white' : null} />
            </span>
            <p
              className={twClassNames(
                'flex justify-center items-center py-0 px-0.5 not-italic font-medium text-xs leading-4',
                {
                  'text-white': activeTab === 'app',
                  'text-base-900': activeTab !== 'app'
                }
              )}
            >
              App
            </p>
          </button>
        </div>
      </div>
      <div className={twClassNames('flex flex-col items-start p-0 w-full')}>
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

SidenavExpanded.propTypes = {
  activeProduct: PropTypes.string,
  activeTab: PropTypes.string,
  onTabClick: PropTypes.func,
  purchasedProducts: PropTypes.arrayOf(PropTypes.string)
};
SidenavExpanded.defaultProps = {
  activeProduct: '',
  activeTab: '',
  onTabClick: () => {},
  purchasedProducts: []
};

export default SidenavExpanded;

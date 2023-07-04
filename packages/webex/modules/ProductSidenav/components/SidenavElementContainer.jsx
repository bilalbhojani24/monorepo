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

const SidenavElementContainer = ({
  isExpanded,
  activeProduct,
  activeTab,
  onTabClick,
  purchasedProducts
}) => {
  const getProductClick = (product) => () => {
    logEvent([], 'web_events', 'ClickedOnSideNav', {
      source: 'Homepage_Demo_CTA_Exp4',
      action: `${activeTab === 'web' ? 'Web' : 'App'} Testing Main Navigation`,
      group: `Product ${activeTab === 'web' ? 'Web' : 'App'} Testing`,
      location: 'Left Navigation',
      url: window.location.href,
      product: activeProduct,
      'signed-in': true,
      'Properties-source': activeProduct,
      Properties_Destination: product.name
    });
  };

  const productElementContainer = (product) => {
    const isActiveProduct = product.identifier === activeProduct;
    return (
      <a
        className={twClassNames(
          'flex flex-row items-center py-2 w-full transition-all duration-100 delay-50 ease-in',
          {
            'bg-[#F0F6FF] border-l-2 border-solid border-[#0070F0]':
              isActiveProduct,
            'px-5': !isExpanded,
            'px-[17.5px]': isActiveProduct && !isExpanded,
            'group box-border pr-5 pl-7': isExpanded,
            'pl-[26px]': isActiveProduct && isExpanded
          }
        )}
        href={product.link}
        onClick={getProductClick(product)}
        key={product.identifier}
      >
        <span>
          {product.icon({
            iconColor: isActiveProduct ? '#0D5FD4' : null,
            iconClass: 'group-hover:fill-[#0070F0]'
          })}
        </span>
        <p
          className={twClassNames(
            'not-italic font-medium text-xs pl-4 leading-4 text-base-900 opacity-0 grow group-hover:text-[#0070F0] whitespace-nowrap transition-opacity duration-100 delay-50 ease-in overflow-hidden',
            {
              'text-[#0D5FD4]': isActiveProduct,
              'opacity-100': isExpanded
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
        className={twClassNames('flex', {
          'box-border items-center pt-3.5 pr-5 pb-1 pl-4': isExpanded,
          'items-start p-0 w-full': !isExpanded
        })}
      >
        <p
          className={twClassNames(
            'not-italic font-medium text-[11px] leading-4 opacity-0 text-base-700 whitespace-nowrap transition-opacity duration-100 delay-50 ease-in',
            {
              'opacity-100': isExpanded
            }
          )}
        >
          {isExpanded && productBlockData.title}
        </p>
        <div
          className={twClassNames(
            'flex flex-row items-start pr-6 pl-[26px] opacity-0 w-full transition-opacity duration-100 delay-50 ease-in',
            {
              'opacity-1 pt-5 pb-2.5': !isExpanded
            }
          )}
        >
          {!isExpanded && (
            <span
              className={twClassNames('w-1 h-1 rounded-full bg-base-500')}
            />
          )}
        </div>
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
    logEvent([], 'web_events', 'ClickedOnSideNav', {
      source: 'Homepage_Demo_CTA_Exp4',
      location: 'Left Navigation',
      action: `${type === 'web' ? 'Web' : 'App'} Testing Main Navigation`,
      group: `Product ${type === 'web' ? 'Web' : 'App'} Testing`,
      url: window.location.href,
      team: activeProduct
    });
  };

  return (
    <>
      <div
        className={twClassNames(
          'flex items-start pt-[6px] pb-0 transition-padding duration-100 delay-50 ease-in',
          {
            'px-4': isExpanded,
            'w-full pl-[7px] pr-2': !isExpanded
          }
        )}
      >
        <div
          className={twClassNames(
            'flex flex-row items-center bg-base-50 border border-solid border-base-300',
            {
              'box-border rounded-[5px] py-[3px] px-0.5 w-[227px] h-9 gap-1':
                isExpanded,
              'p-0.5 rounded': !isExpanded
            }
          )}
        >
          <button
            type="button"
            className={twClassNames(
              'flex justify-center items-center rounded',
              {
                'bg-[#15803D]': activeTab === 'web',
                'w-[109px] h-[30px]': isExpanded,
                'px-[9px] py-[7px] shadow-sm w-full':
                  !isExpanded && activeTab === 'web',
                hidden: activeTab === 'app' && !isExpanded
              }
            )}
            onClick={getTabClick('web')}
            aria-label="web products"
          >
            <WebIcon iconColor={activeTab === 'web' ? 'white' : null} />
            <p
              className={twClassNames(
                'flex justify-center items-center py-0 not-italic font-medium text-xs leading-4',
                {
                  'text-white': activeTab === 'web',
                  'text-base-900': activeTab !== 'web',
                  hidden: !isExpanded,
                  'px-0.5': isExpanded
                }
              )}
            >
              Web
            </p>
          </button>
          <button
            type="button"
            className={twClassNames(
              'flex justify-center items-center rounded',
              {
                'bg-[#15803D]': activeTab === 'app',
                'w-[109px] h-[30px]': isExpanded,
                'px-[9px] py-[7px] shadow-sm w-full':
                  !isExpanded && activeTab === 'app',
                hidden: activeTab === 'web' && !isExpanded
              }
            )}
            onClick={getTabClick('app')}
            aria-label="app products"
          >
            <AppIcon iconColor={activeTab === 'app' ? 'white' : null} />
            <p
              className={twClassNames(
                'flex justify-center items-center py-0 px-0.5 not-italic font-medium text-xs leading-4',
                {
                  'text-white': activeTab === 'app',
                  'text-base-900': activeTab !== 'app',
                  hidden: !isExpanded,
                  'px-0.5': isExpanded
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

SidenavElementContainer.propTypes = {
  isExpanded: PropTypes.bool,
  activeProduct: PropTypes.string,
  activeTab: PropTypes.string,
  onTabClick: PropTypes.func,
  purchasedProducts: PropTypes.arrayOf(PropTypes.string)
};
SidenavElementContainer.defaultProps = {
  isExpanded: false,
  activeProduct: '',
  activeTab: '',
  onTabClick: () => {},
  purchasedProducts: []
};

export default SidenavElementContainer;

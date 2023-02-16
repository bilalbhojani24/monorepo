import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import HeaderProductContainer from '../HeaderProductContainer';
import Hyperlink from '../Hyperlink';
import { ChevronDownIcon } from '../Icon';
import GridViewSolidIcon from '../Icon/HeaderIcons/GridViewSolidIcon';
import ToolTip from '../Tooltip';

import './styles.scss';

const PRODUCT_ARRAY = [
  { name: 'Live', link: 'https://live.browserstack.com/dashboard' },
  { name: 'Automate', link: 'https://automate.browserstack.com' },
  { name: 'App Live', link: 'https://app-live.browserstack.com/dashboard' }
];

const HeaderProducts = ({ wrapperClassName, productCount }) => (
  <div
    className={twClassNames('flex flex-row items-center p-0', wrapperClassName)}
  >
    {Array.from(Array(productCount), (e, index) => (
      <Hyperlink
        wrapperClassName={twClassNames('flex flex-row items-center py-2 px-3')}
        href={PRODUCT_ARRAY[index].link}
        key={index}
      >
        <p
          className={twClassNames(
            'not-italic font-medium text-sm leading-5 text-base-300'
          )}
        >
          {PRODUCT_ARRAY[index].name}
        </p>
      </Hyperlink>
    ))}
    <ToolTip
      arrowClassName="w-4 h-2"
      content={<HeaderProductContainer />}
      theme="light"
      placementSide="bottom"
      size="5xl"
    >
      <div
        id="header-product-element"
        className={twClassNames('flex flex-row items-center p-0')}
      >
        <div
          className={twClassNames(
            'flex flex-row items-center py-2 px-3 gap-1.5'
          )}
        >
          <GridViewSolidIcon
            iconClass="min-[1361px]:hidden"
            aria-hidden="true"
          />
          <div
            className={twClassNames(
              'flex flex-row justify-center items-center p-0 gap-1'
            )}
          >
            <p
              className={twClassNames(
                'not-italic font-medium text-sm leading-5 text-base-300 max-[1360px]:hidden'
              )}
            >
              More
            </p>
            <p
              className={twClassNames(
                'not-italic font-medium text-sm leading-5 text-base-300 min-[1361px]:hidden'
              )}
            >
              Products
            </p>
            <ChevronDownIcon
              className={twClassNames('text-base-400 h-5 w-5')}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </ToolTip>
  </div>
);

HeaderProducts.propTypes = {
  wrapperClassName: PropTypes.string,
  productCount: PropTypes.number
};
HeaderProducts.defaultProps = {
  wrapperClassName: '',
  productCount: 0
};

export default HeaderProducts;

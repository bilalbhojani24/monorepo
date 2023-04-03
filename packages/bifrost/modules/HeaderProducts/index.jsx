import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import HeaderProductContainer from '../HeaderProductContainer';
import Hyperlink from '../Hyperlink';
import { ChevronDownIcon } from '../Icon';
import GridViewSolidIcon from '../Icon/HeaderIcons/GridViewSolidIcon';
import ToolTip from '../Tooltip';

import './styles.scss';

const DEFAULT_PRODUCT_ARRAY = [
  { name: 'Live', link: 'https://live.browserstack.com/dashboard' },
  { name: 'Automate', link: 'https://automate.browserstack.com' },
  { name: 'App Live', link: 'https://app-live.browserstack.com/dashboard' }
];

const HeaderProducts = ({ wrapperClassName, productCount, productArray }) => {
  const finalProductArray =
    productArray.length === 0 ? DEFAULT_PRODUCT_ARRAY : productArray;

  return (
    <div
      className={twClassNames(
        'flex flex-row items-center p-0 [@media(max-width:1023px)]:hidden max-[1023px]:hidden',
        wrapperClassName
      )}
    >
      {Array.from(Array(productCount), (e, index) => (
        <Hyperlink
          isCSR={false}
          wrapperClassName={twClassNames(
            'flex flex-row items-center py-2 px-3'
          )}
          href={finalProductArray[index]?.link}
          key={index}
        >
          <p
            className={twClassNames(
              'not-italic font-medium text-sm leading-5 text-base-300 hover:text-base-100 float-left whitespace-nowrap'
            )}
          >
            {finalProductArray[index]?.name}
          </p>
        </Hyperlink>
      ))}
      <ToolTip
        arrowClassName="w-4 h-2"
        content={<HeaderProductContainer />}
        theme="light"
        placementSide="bottom"
        size="5xl"
        wrapperClassName="py-0"
        triggerOnTouch
        triggerAriaLabel="product popover"
      >
        <div className={twClassNames('group flex flex-row items-center p-0')}>
          <div
            className={twClassNames(
              'flex flex-row items-center py-2 px-3 gap-1.5'
            )}
          >
            <GridViewSolidIcon
              iconClass="[@media(min-width:1361px)]:hidden min-[1361px]:hidden"
              aria-hidden="true"
            />
            <div
              className={twClassNames(
                'flex flex-row justify-center items-center p-0 gap-1'
              )}
            >
              <p
                className={twClassNames(
                  'not-italic font-medium text-sm leading-5 text-base-300 [@media(max-width:1360px)]:hidden max-[1360px]:hidden group-hover:text-base-100'
                )}
              >
                More
              </p>
              <p
                className={twClassNames(
                  'not-italic font-medium text-sm leading-5 text-base-300 [@media(min-width:1361px)]:hidden min-[1361px]:hidden group-hover:text-base-100'
                )}
              >
                Products
              </p>
              <ChevronDownIcon
                className={twClassNames(
                  'text-base-400 h-5 w-5 group-hover:text-base-100'
                )}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </ToolTip>
    </div>
  );
};

HeaderProducts.propTypes = {
  wrapperClassName: PropTypes.string,
  productCount: PropTypes.number,
  productArray: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, link: PropTypes.string })
  )
};
HeaderProducts.defaultProps = {
  wrapperClassName: '',
  productCount: 0,
  productArray: []
};

export default HeaderProducts;

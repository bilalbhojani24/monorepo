import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import Button from '../Button';
import { ChevronDownIcon, MdGridView } from '../Icon';

import './styles.scss';

const HeaderProducts = ({ wrapperClassName }) => (
  <div
    className={twClassNames(
      'flex flex-row items-center p-0 gap-4',
      wrapperClassName
    )}
  >
    <div
      className={twClassNames(
        'flex flex-row items-start p-0 max-[1360px]:hidden'
      )}
    >
      <Button variant="minimal">
        <span
          className={twClassNames(
            'flex flex-row justify-center items-center p-0 text-base-300'
          )}
        >
          Automate
        </span>
      </Button>
    </div>
    <div
      className={twClassNames(
        'flex flex-row items-start p-0 max-[1360px]:hidden'
      )}
    >
      <Button variant="minimal">
        <span
          className={twClassNames(
            'flex flex-row justify-center items-center p-0 text-base-300'
          )}
        >
          Test Observability
        </span>
      </Button>
    </div>

    <div className={twClassNames('flex flex-row items-start p-0')}>
      <Button variant="minimal">
        <span
          className={twClassNames(
            'flex flex-row gap-1.5 justify-center items-center p-0 text-base-300'
          )}
        >
          <MdGridView
            className={twClassNames('text-base-400 h-5 w-5')}
            aria-hidden="true"
          />
          All Products
          <ChevronDownIcon
            className={twClassNames('text-base-400 h-5 w-5')}
            aria-hidden="true"
          />
        </span>
      </Button>
    </div>
  </div>
);

HeaderProducts.propTypes = {
  wrapperClassName: PropTypes.string
};
HeaderProducts.defaultProps = {
  wrapperClassName: ''
};

export default HeaderProducts;

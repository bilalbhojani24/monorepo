import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Hyperlink from '../Hyperlink';
import BrandLogo from '../Icon/BrandLogo';
import BrandLogoWithName from '../Icon/BrandLogoWithName';

import './styles.scss';

const HeaderBrand = ({ productName, productLink, release }) => (
  <div id="header-brand">
    <Hyperlink
      href={productLink}
      wrapperClassName={twClassNames(
        'flex flex-row items-center pl-8 gap-2 w-fit'
      )}
    >
      <BrandLogo iconClass="min-[1230px]:hidden -mt-0.5" />
      <BrandLogoWithName iconClass="max-[1229px]:hidden -mt-0.5" />
      <p className="float-left whitespace-nowrap font-sans text-lg font-normal not-italic leading-6 text-white">
        {productName}
      </p>
      {release && (
        <span
          className={twClassNames(
            'items-center font-medium text-xs rounded-full bg-brand-100 px-2.5 py-0.5 bg-[#4338CA] text-white'
          )}
        >
          {release}
        </span>
      )}
    </Hyperlink>
  </div>
);

HeaderBrand.propTypes = {
  productName: PropTypes.string,
  productLink: PropTypes.string,
  release: PropTypes.string
};
HeaderBrand.defaultProps = {
  productName: '',
  productLink: '',
  release: ''
};

export default HeaderBrand;

import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Hyperlink from '../Hyperlink';
import BrandLogo from '../Icon/BrandLogo';
import BrandLogoWithName from '../Icon/BrandLogoWithName';

import './styles.scss';

const HeaderBrand = ({ productName, productLink, release }) => (
  <Hyperlink
    id="header-brand"
    wrapperClassName={twClassNames(
      'flex flex-row items-center pl-8 gap-2 w-fit'
    )}
    href={productLink}
  >
    <BrandLogo iconClass="min-[1230px]:hidden" />
    <BrandLogoWithName iconClass="max-[1229px]:hidden" />
    <p className="font-sans text-lg font-medium not-italic leading-6 text-white">
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

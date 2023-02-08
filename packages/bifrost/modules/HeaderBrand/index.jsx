import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import BrandLogo from '../Icon/BrandLogo';
import BrandLogoWithName from '../Icon/BrandLogoWithName';

import './styles.scss';

const HeaderBrand = ({ productName }) => (
  <div
    className={twClassNames(
      'flex flex-row items-center pl-8 gap-2 cursor-pointer w-fit'
    )}
  >
    <BrandLogo iconClass="min-[1130px]:hidden" />
    <BrandLogoWithName iconClass="max-[1129px]:hidden" />
    <p className="font-sans text-lg font-medium not-italic leading-6 text-white">
      {productName}
    </p>
  </div>
);

HeaderBrand.propTypes = {
  productName: PropTypes.string
};
HeaderBrand.defaultProps = {
  productName: ''
};

export default HeaderBrand;
